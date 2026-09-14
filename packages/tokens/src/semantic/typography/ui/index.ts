import { uiBodyTypography } from './body.js';
import { uiDisplayTypography } from './display.js';
import { uiLabelTypography } from './label.js';
import { uiMetaTypography } from './meta.js';
import { uiTitleTypography } from './title.js';

export const uiTypography = {
  display: uiDisplayTypography,
  title: uiTitleTypography,
  body: uiBodyTypography,
  label: uiLabelTypography,
  meta: uiMetaTypography,
} as const;
