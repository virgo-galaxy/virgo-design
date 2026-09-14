import { documentBodyTypography } from './body.js';
import { documentCaptionTypography } from './caption.js';
import { documentHeadingTypography } from './heading.js';
import { documentTitleTypography } from './title.js';

export const documentTypography = {
  title: documentTitleTypography,
  heading: documentHeadingTypography,
  body: documentBodyTypography,
  caption: documentCaptionTypography,
} as const;
