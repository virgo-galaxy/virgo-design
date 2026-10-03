# Pro API and Mock

The request boundary is always:

```text
Page / Feature → src/api → src/lib/http → Axios → network → MSW or Gateway
```

`src/api` owns relative endpoints, request DTOs, response DTOs and typed API functions.
`src/lib/http` owns the Axios instance, base URL, timeout, response envelope validation,
unwrapping and normalized errors. `src/mock` owns only the fake HTTP backend and fixtures.
Only application bootstrap imports Mock. Pages never import fixtures or inspect mock mode.

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

Axios sends `Accept: application/json` and uses a 5000 ms default timeout. It does not
introduce speculative authentication headers or session persistence. Consumers can
pass an AbortSignal to read operations.

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

| Method | Relative endpoint     | Behavior                                              |
| ------ | --------------------- | ----------------------------------------------------- |
| GET    | `/tasks/metadata`     | Project choices, members and reference date           |
| GET    | `/tasks`              | Search, filters, sort, pagination and register totals |
| POST   | `/tasks`              | Create a task; backend owns ID and creation time      |
| GET    | `/tasks/:id`          | Task detail                                           |
| PATCH  | `/tasks/:id`          | Partial edits or status change                        |
| GET    | `/projects`           | Project portfolio and milestones                      |
| GET    | `/analytics/overview` | Historical delivery and activity                      |
| GET    | `/workplace/overview` | Current register overview and recent tasks            |
| GET    | `/profile`            | Current profile                                       |
| PATCH  | `/profile`            | Profile and preferences                               |
| GET    | `/workflows/latest`   | Initial result/recovery receipts                      |
| POST   | `/workflows/handoffs` | Submit the existing handoff flow                      |

Task query fields include `search`, `status`, `priority`, `project`, `assignee`, `scope`,
`createdFrom`, `createdTo`, `due`, `minimumHours`, `sortBy`, `sortDirection`, `page` and
`pageSize`. Page numbers start at 1. The Mock backend caps a page at 100 records.
List responses expose `items`, matching `total`, corrected `page`, `pageSize` and
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
Task and profile mutations change in-memory backend state; reloading the browser resets
that state. The task fixture includes 256 records across four projects, with varied
ownership, status, priority, estimates and due dates (26 pages at 10 records per page).
Historical trend fixtures remain distinct from current task register totals.
This is development/test simulation, not persistence or an alternate API client.

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
