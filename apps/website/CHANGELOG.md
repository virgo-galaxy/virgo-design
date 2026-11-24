# Virgo Design website

## Unreleased

- Use NSH 0.1.1's `observeElement()` to start highlighting 128 px before
  a code block enters the viewport.

- Highlight TypeScript, TSX, CSS, SCSS and SVG examples with `@virgo-nsh/highlighter@0.1.0`
  in Components, Primitives, Charts, Colors, Fonts, Tokens, Themes and Icons.
  The Colors Tailwind export uses the CSS model. Icons loads the XML model when
  an SVG example is selected. The homepage, Fonts and Themes use the Bash model
  for their command examples. The website loads models on demand. Syntax colors
  follow the code block's appearance, and copy actions use the original source.
