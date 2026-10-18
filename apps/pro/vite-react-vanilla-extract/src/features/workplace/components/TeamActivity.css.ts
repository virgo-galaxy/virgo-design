import { style } from '@vanilla-extract/css';
import { vanillaExtractContract as tokens } from '@virgo-design/tokens/vanilla-extract';

export const activityDate = style({
  marginBlockEnd: tokens['--vd-spacing-16'],
});

export const activityTitle = style({
  fontSize: tokens['--vd-font-size-12'],
});

export const activityDescription = style({
  fontSize: tokens['--vd-font-size-12'],
});

export const activityTime = style({
  fontSize: tokens['--vd-font-size-10'],
  fontFamily: tokens['--vd-font-family-mono'],
});
