export type LocaleOf<Schema> = Schema extends string
  ? string
  : Schema extends object
    ? { readonly [Key in keyof Schema]: LocaleOf<Schema[Key]> }
    : Schema;
