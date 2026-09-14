import { fontSize, fontWeight, lineHeight } from '@virgo-design/tokens';

export interface TypographyRecipe {
  size: string;
  weight: number;
  lineHeight: number;
}

const recipe = (
  size: keyof typeof fontSize,
  weight: keyof typeof fontWeight,
  height: keyof typeof lineHeight,
): TypographyRecipe => ({
  size: fontSize[size],
  weight: fontWeight[weight],
  lineHeight: lineHeight[height],
});

export const documentTypographyRecipes = {
  title: {
    large: recipe(64, 700, 1),
    medium: recipe(56, 700, 1),
  },
  heading: {
    1: recipe(48, 600, 1),
    2: recipe(40, 600, 1),
    3: recipe(32, 600, 2),
    4: recipe(28, 600, 2),
    5: recipe(24, 600, 2),
    6: recipe(20, 600, 2),
  },
  body: {
    large: recipe(16, 400, 4),
    default: recipe(14, 400, 4),
    small: recipe(13, 400, 4),
  },
  caption: recipe(12, 400, 3),
} as const;

export const uiTypographyRecipes = {
  display: {
    large: recipe(40, 700, 1),
    medium: recipe(32, 700, 1),
    small: recipe(28, 600, 2),
  },
  title: {
    large: recipe(24, 600, 2),
    medium: recipe(20, 600, 2),
    small: recipe(16, 600, 2),
  },
  body: {
    large: recipe(16, 400, 3),
    default: recipe(14, 400, 3),
    small: recipe(13, 400, 3),
  },
  label: {
    default: recipe(14, 500, 2),
    small: recipe(13, 500, 2),
  },
  caption: recipe(12, 400, 3),
} as const;
