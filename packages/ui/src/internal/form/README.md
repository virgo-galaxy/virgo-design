# Control size presets

`control-size.token(size, metric)` and `control-size.variables(prefix, size)` are the shared geometry presets for buttons and form controls. All values reference existing Foundation Tokens, so consumers importing the existing Token stylesheet receive complete geometry without adding a new CSS entrypoint.

| Size   | Height | Font size | Radius | Horizontal padding | Icon size |
| ------ | ------ | --------- | ------ | ------------------ | --------- |
| mini   | 24     | 11        | 6      | 8                  | 12        |
| small  | 28     | 13        | 6      | 8                  | 16        |
| medium | 36     | 14        | 8      | 12                 | 20        |
| large  | 44     | 16        | 10     | 16                 | 20        |

Sizes are in pixels. Components expose their existing supported sizes. Composed controls propagate the chosen size, including portalled menus and picker fields. Button label weight and input body weight remain appropriate to their roles.

Container density and intrinsic shapes (table rows, textareas, cards, overlays, avatars, switches) retain their own geometry. Their embedded buttons and form controls use these presets. Custom-property declarations must interpolate Sass calls, for example `--button-height: #{control-size.token(medium, height)}`.
