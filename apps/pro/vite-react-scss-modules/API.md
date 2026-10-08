# Pro API and Mock

Pro primarily demonstrates Virgo Design's components and complete application patterns.
The task/project workflow supplies coherent context; it should remain simple rather than
grow into a full business-management product. Reuse meaningful components throughout the
main workflow, and consolidate duplicate business entry points instead of adding pages just
to increase component coverage. Result and exception showcase routes are Admin-only;
business accounts still receive ordinary validation, submission and access-denied feedback.

The request boundary is always:

```text
Page / Feature → src/api → src/lib/http → Axios → network → MSW or Gateway
```

`src/api` owns relative endpoints, request DTOs, response DTOs and typed API functions.
`src/lib/http` owns the Axios instance, base URL, timeout, response envelope validation,
unwrapping and normalized errors. `src/mock` owns only the fake HTTP backend and fixtures.
Only application bootstrap imports Mock. Pages never import fixtures or inspect mock mode.

## Focused application routes

The main navigation is Workplace, Analytics, Tasks, Projects and Profile. Tasks contains two
route-backed tabs below the shared four-metric overview and above the search area: Task table and Task cards. The table retains its existing
full filters and management tools; cards uses a compact search/status/project filter area and scoped
pagination. Switching replaces the entire filter/content area and carries only the shared filters. Task creation and editing share
one validated form; task progress is changed from the details page, separately from information editing.

- `/work/task-cards`: card tab within Tasks, linked to the same details and role-scoped API.
- `/work/tasks/new`: create a planned or todo task (Admin/project managers).
- `/work/tasks/:id`: scoped details, progress actions, project/module/people context and activity timeline.
- `/work/tasks/:id/edit`: information editing for Admin or the manager of that project.
- `/work/projects/:projectId`: project details, modules and related task links.
- `/work/projects/:projectId/handoff`: the existing three-step project handoff, available to Admin/managers.

Task links carry a validated `returnTo` destination. List filters, column search/filter, sorting and
pagination are encoded in the URL; they survive refresh and return navigation. Unsaved
forms block route changes and protect against browser refresh. Failed saves retain the draft.
Old `?view=cards` task bookmarks redirect to the task card tab.
The old data list/basic form/detail/step form URLs redirect to the consolidated pages; they no
longer create duplicate sidebar groups. No new organizational hierarchy is introduced.

## Configuration

Development uses the checked-in `.env.development`:

```dotenv
VITE_API_BASE_URL=/api/v1
VITE_API_MOCKING=true
```

To use a real Gateway, override these values in `.env.local` (restart Vite afterwards):

```dotenv
VITE_API_BASE_URL=/api/v1
VITE_API_MOCKING=false
```

`/api/v1` must be served by your same-origin Gateway/reverse proxy. An absolute Gateway
URL is also supported; that service must allow the frontend origin via CORS.
Production defaults to Mock disabled. Enabling Mock requires the exact string `true`.
The API prefix is resolved once by `src/lib/http/client.ts`; handlers match the same
configured URL and API functions always use business-relative paths.

Axios sends `Accept: application/json` and uses a 5000 ms default timeout. After login,
protected requests carry `Authorization: Bearer <accessToken>`. Consumers can pass
an AbortSignal to read operations.

In browser Mock mode, bootstrap installs an HTTP preparation hook that reconfirms
the current client's activation with the registered MSW worker before each request.
Browser worker restarts can discard MSW's in-memory active-client set while leaving
the registration intact. Concurrent requests share the confirmation; it times out
after 2 seconds and a later retry can try again. This does not reset demo data or
automatically repeat mutations. Real Gateway mode has no preparation hook.

## Protocol and errors

Success responses use `{ code: 0, msg: "success", data: T }`. `http.get<T>()`,
`post<T>()`, `put<T>()`, `patch<T>()` and `delete<T>()` return `T` directly.

Runtime guards check the envelope and error metadata. Failure responses use a nonzero
code and `ApiErrorData`: `detail`, optional `fields`, optional `source`, and `timestamp`.
The transport validates the envelope, not the full business DTO schema.

HTTP status describes the HTTP request result (for example, `400` malformed request,
`404` missing resource, `422` rejected field values). `BaseResponse.code` describes a
stable API/business condition; it is never derived from the HTTP status. Messages and
translated labels can change without changing these codes. Consumers branch on `code`
for business handling and use `status` for HTTP handling and diagnostics.

The shared contract in `src/api/error-codes.ts` defines:

| Code  | Contract name             | Meaning                         | Current HTTP status |
| ----- | ------------------------- | ------------------------------- | ------------------- |
| 10001 | INVALID_REQUEST           | Malformed JSON/request body     | 400                 |
| 10002 | INVALID_QUERY             | Invalid query parameters        | 400                 |
| 20001 | TASK_NOT_FOUND            | Task does not exist             | 404                 |
| 20002 | TASK_VALIDATION_FAILED    | Invalid task fields             | 422                 |
| 30001 | PROFILE_VALIDATION_FAILED | Invalid profile fields          | 422                 |
| 40001 | HANDOFF_VALIDATION_FAILED | Invalid handoff fields          | 422                 |
| 40002 | HANDOFF_SCOPE_INVALID     | Tasks outside the handoff scope | 422                 |

For example, a missing task returns HTTP `404` with
`{ code: 20001, msg: "Task not found", data: ApiErrorData }`. The Mock failure helper
requires explicit, separate `status` and `code` arguments. Success remains `code: 0`
and `msg: "success"`, including HTTP `201` when creating a task. A valid nonzero code
is a business failure even when delivered with HTTP `200`; the client also supports
that response without conflating the two values. A non-envelope HTTP failure has
`HttpError.code === null`, while `HttpError.status` retains the HTTP status.

`HttpError` preserves `code`, `msg`, HTTP `status`, error `data`, `requestId` and
`traceparent`. Its `kind` distinguishes:

- `api`: a valid nonzero API error, including one returned with HTTP 200.
- `protocol`: malformed successful responses, success messages or API error data.
- `http`: non-envelope HTTP failures, such as a proxy HTML 502 response.
- `timeout`: Axios timeout.
- `network`: request failure without an HTTP response.
- `cancelled`: an explicitly aborted request; superseded reads do not update the UI.

## Endpoints

Task status and priority are stable domain codes in JSON requests, responses and query
parameters, independent of locale or display copy:

| Field    | Wire values                                 |
| -------- | ------------------------------------------- |
| status   | backlog, todo, in_progress, in_review, done |
| priority | low, medium, high, urgent                   |

`TASK_STATUS_CODES` / `TASK_PRIORITY_CODES` are the shared contract source. For example,
`PATCH /tasks/VD-138` sends `{ "status": "in_progress" }`, and a review query uses
`GET /tasks?status=in_review&priority=high`. Display strings such as `"In Progress"` or
`"进行中"` are not valid wire values; Mock rejects them in writes and queries.
The presentation layer maps codes to localized labels and visual intents. UI CSV
exports use the same localized labels without changing the underlying DTO values.

| Method | Relative endpoint         | Behavior                                              |
| ------ | ------------------------- | ----------------------------------------------------- |
| GET    | `/tasks/metadata`         | Project choices, members and reference date           |
| GET    | `/tasks`                  | Search, filters, sort, pagination and register totals |
| POST   | `/tasks`                  | Create a task; backend owns ID and creation time      |
| GET    | `/tasks/:id`              | Task detail                                           |
| GET    | `/tasks/:id/history`      | Scoped task activity and workflow transitions         |
| PATCH  | `/tasks/:id`              | Partial edits or status change                        |
| POST   | `/demo/reset`             | Reset Mock data/settings and end the session          |
| GET    | `/projects`               | Project portfolio and milestones                      |
| GET    | `/analytics/overview`     | Historical delivery and activity                      |
| GET    | `/workplace/overview`     | Current register overview and recent tasks            |
| GET    | `/notifications`          | Current person’s inbox and unread count               |
| PATCH  | `/notifications/:id/read` | Mark an owned notification read                       |
| POST   | `/notifications/read-all` | Mark this person’s inbox read                         |
| GET    | `/profile`                | Current profile                                       |
| PATCH  | `/profile`                | Profile and preferences                               |
| GET    | `/workflows/latest`       | Initial result/recovery receipts                      |
| POST   | `/workflows/handoffs`     | Submit the existing handoff flow                      |

Task query fields include `search`, `status`, `priority`, `project`, `assignee`, `scope`,
`module`, `createdFrom`, `createdTo`, `due`, `minimumHours`, `sortBy`, `sortDirection`, `pageNum` and
`pageSize`. Page numbers start at 1. The Mock backend caps a page at 100 records.
List responses expose `items`, matching `total`, corrected `pageNum`, `pageSize` and
unfiltered task `overview`. Export queries retrieve all matching pages through the API.

## Bootstrap and page state

`AppBootstrap` awaits `enableMocking()` before mounting API consumers. Mock startup is
lazy and idempotent. Bootstrap loads independent initial resources concurrently;
failures show Result with Retry and loading shows Skeleton.

The application provider holds the HTTP-loaded shared register, catalogs and profile.
It applies only saved server responses after create/update requests. Task list queries
run on the backend. Query changes abort obsolete requests; late results are ignored.
Existing table empty states remain available. Editors show pending/error feedback,
retain drafts on failure and show success only after the server responds. Dashboard
overviews refresh when mounted and after task writes.

MSW v2 handlers return the same protocol as the Gateway, including request/trace headers.
The seed now represents one Virgo Studio workspace with 24 people, four software projects
and six modules per project. The 240 tasks are distributed across Online Store (68),
Booking System (54), Support Desk (60) and Inventory System (58). Two project managers
manage two projects each. Product, design, frontend, backend, QA and operations people
participate in defined projects; Admin remains the separate demonstration configuration account.

`ProjectDto` exposes `memberIds` and `modules: { id, name }[]`. A task's required `module`
is a stable module ID belonging to its `project` (the established project-name relationship
key). Create/edit validation rejects modules and people outside the chosen project.
Lists, forms, details, column filters and CSV exports share these relationships. Display labels,
seed task titles/descriptions and bilingual member names follow the active locale; IDs and
API values remain stable. User-entered content is preserved. Both English and Chinese seed
text can be searched. Delivery charts, project totals and current overviews derive from the
same mutable task register, including saved completion timestamps.

The Mock backend persists tasks, ID allocation, profile, workflow receipts, task activity/Token records and per-person notifications in
`localStorage` under `virgo-pro.demo-data.v1` with a version-2 validated snapshot. Version-1 snapshots migrate seed dates and add history without discarding user edits. Existing
global/table settings retain their own versioned local keys. Login sessions, Mock token
records and agent mode use `sessionStorage`; signing out does not erase shared business data. Invalid or unsupported
snapshots restore the seed, and unavailable storage falls back to an in-memory demo.

`POST /demo/reset` is Mock-only and appears in the Admin account menu as **Reset demo data**.
It clears Pro-owned `virgo-pro.` / `virgo-pro:` keys in local/session storage, restores all seed
data in memory, clears the member cache, resets locale/settings and signs out. Settings hooks
stop pending/pagehide writes during reset, so old preferences cannot reappear. Reset
revokes all demo tokens and returns to the login page with the 240-task catalog restored.
Other applications' storage is left intact.

## Demo login and role views

The login page offers Admin plus the 24 business accounts. Accounts use the stable member ID
(e.g. `admin`, `ava`, `leo`, `hana`); all share the demonstrative password `virgo123`.
`GET /auth/demo-accounts` exposes the sample identities/password only in the Mock gateway.
`POST /auth/login` accepts `{ account, password }` and returns `{ authenticated: true,
user, accessToken, expiresAt }`. Each login creates a random opaque token valid for eight hours;
there is no JWT signing or fixed ENV token. `GET /auth/session` resolves the current bearer
identity; `POST /auth/logout` revokes its token. The HTTP layer clears an expired session
and returns to login on a protected 401 response. A denied operation returns 403.

Admin sees all data and owns global/table settings and demo reset. Ava manages Online Store
and Support Desk; Leo manages Booking System and Inventory System. Managers see their
managed projects' tasks; other business members see their own assigned tasks, with participating
projects available for context. Lists, totals, charts, profiles and metadata use the same request
identity. Account switches clear view/member caches and leave the shared task register intact.

The five `/result/*` and `/exception/*` showcase routes are excluded from business accounts'
navigation. Direct access redirects to the workplace without loading the showcase content.
Admin retains these demonstrations. Task creation opens the created task details;
step-form outcomes display inline rather than navigate to restricted result demonstrations.
Actual denied business actions can still show an access-denied state to any affected account.

Managers can create/assign tasks, move planned work to todo, and approve reviewed work or
return it to progress. A member can start their own todo task and submit in-progress work for
review. Members only change their own task progress; title, description, schedule, estimate, priority, project/module and assignment edits are forbidden. They cannot skip directly to done. A manager can also start and submit tasks assigned to themselves.
The Mock gateway also enforces these rules; hiding a button is not the only guard. Admin has
full task controls for demo inspection. Profile/settings writes are Admin-only.

This remains a local demonstration with client-held Mock tokens, not a production authentication
service. MSW is still the sole fake HTTP
gateway; pages never bypass the typed API to read fixtures or storage.

## Workflow notifications and historical reporting

Successful task mutations append a timestamped activity receipt attributed to the acting person.
`GET /tasks/:id/history` checks the same task visibility as details and returns actor, kind, timestamp
and (for live transitions) before/after status. Shared task history excludes private Token amounts
and AI assistance receipts. Task metadata, due-date filters and reporting snapshots share one
reference date: the seed snapshot, advanced by the latest recorded operation.
Starting or submitting a task notifies its project manager; assignment, approval, and return
notify the assigned person. Self-notifications are suppressed. Inbox reads are private and
idempotent; read state survives logout, refresh and account switches. Notifications retain their
historical task label when a task is deleted/reassigned and indicate when that task is no longer
available to the recipient. Task writes refresh inboxes and reports through an application event;
focus and storage events also refresh the relevant views.

`GET /workplace/overview` includes raw `tokenRecords`, aggregated daily `tokenUsage`,
`reportingYears` and `reportingScope`. Admin receives workspace records, project managers
receive managed-project records, and members receive only records attributed to themselves.
Record ownership survives later reassignment/deletion. Reads, retries, inbox reads, rejected
writes and unchanged edits generate no additional usage. Activity feeds and delivery pulse
refresh from the same shared register after task changes.

Token amounts represent simulated AI assistance receipts, not real model calls or billing.
Seeded assistance sessions are linked to actual task IDs, projects, modules and people;
successful task actions add a demonstrative receipt. The calendar exposes each day's receipts
and input/output totals. The heatmap aggregates those exact records and shares compact year
buttons with the calendar. Projects start at staggered dates in June/September 2025 and
January/April 2026; completed work and assistance records span the project's actual history.
Both 2025 and 2026 are available, while future days remain blank.

`public/mockServiceWorker.js` is generated by the official
[MSW CLI](https://mswjs.io/guides/integrations/browser). Regenerate it from this app directory:

```sh
pnpm exec msw init public --save
```

Worker startup is awaited as required by the
[MSW start API](https://mswjs.io/api/setup-worker/start). No custom worker code is maintained.

## Verification

```sh
pnpm --filter @virgo-design/pro-vite-react-scss-modules typecheck
pnpm --filter @virgo-design/pro-vite-react-scss-modules test
pnpm --filter @virgo-design/pro-vite-react-scss-modules build
pnpm test
```

Tests exercise protocol guards, real Axios requests through MSW, stateful task/profile
operations, query behavior, tracing metadata, errors, cancellation, real network timeout,
Mock-disabled HTTP traffic, UI error/retry, draft retention and stale-response protection.
The repository runner isolates Pro's aliases and language setup from Website.
