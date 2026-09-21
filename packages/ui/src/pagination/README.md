# Pagination

```tsx
import { Pagination } from '@virgo-design/ui';

<Pagination total={85} showAll align="right" />;
```

`total` is the number of records, not the number of pages. Pages are one-based.
The default page is 1 and the default page size is 10. Use `defaultPage` and
`defaultPageSize` for uncontrolled state, or `page`, `pageSize`, and
`onChange(page, pageSize)` to own the state. Each user change emits once; clicking
the current page emits nothing. A page-size change returns to page 1.

| Prop                         | Default             | Purpose                                                                                                                |
| ---------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `align`                      | `left`              | `left`, `center`, or `right` within the available width.                                                               |
| `showTotal`                  | `false`             | `true` for total count, or `(total, [start, end]) => ReactNode` for custom range text.                                 |
| `showSizeChanger`            | `false`             | Shows Virgo Dropdown with checked page-size items.                                                                     |
| `pageSizeOptions`            | `[10, 20, 50, 100]` | Positive integer choices; the active size is always included.                                                          |
| `showQuickJumper`            | `false`             | Enter commits a valid page; Escape clears the input.                                                                   |
| `showAll`                    | `false`             | Enables all three optional controls; an explicit individual flag overrides it. This does not expand every page number. |
| `previousLabel`, `nextLabel` | Chevron icons       | Optional visible content such as Previous / Next.                                                                      |
| `disabled`                   | `false`             | Disables every interactive control.                                                                                    |
| `labels`                     | English copy        | Localizes visible text and accessible names.                                                                           |

Long lists retain the first and last pages and a bounded window around the current
page. Ellipsis buttons jump five pages. Total changes clamp the displayed page;
they do not fire user-change callbacks. Empty results display page 1, range
`[0, 0]`, and disabled controls. Non-finite/negative totals normalize to zero;
invalid page sizes use 10. Quick jump rejects blank, fractional, nonnumeric and
out-of-range input rather than silently navigating somewhere else.

The unstyled primitive exposes `Pagination` with a render-function child and
`Pagination.Item`. It owns state, range calculations, boundary checks, and native
button behavior. The UI layer composes those with Virgo Dropdown, Input, tokens and
icons. The root forwards native navigation props and an HTMLElement ref.
