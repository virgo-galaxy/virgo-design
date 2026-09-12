export type ColorScaleStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type ColorScale = Readonly<Record<ColorScaleStep, string>>;

export interface GenerateColorScaleOptions {
  /**
   * Controls the overall chroma of generated colors.
   *
   * 1 keeps the default chroma.
   * Values below 1 make the scale more muted.
   * Values above 1 make it more vivid.
   *
   * @default 1
   */
  chroma?: number;
}
