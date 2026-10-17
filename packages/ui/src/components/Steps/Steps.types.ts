import type { HTMLAttributes } from 'react';

import type { ButtonProps } from '../Button';

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  /** Direction of the ordered steps. @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
}

export interface StepsItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Consumer-owned progress state. @default 'upcoming' */
  status?: 'upcoming' | 'current' | 'complete';
}

export type StepsTriggerProps = ButtonProps;
export type StepsIndicatorProps = HTMLAttributes<HTMLSpanElement>;
export type StepsTitleProps = HTMLAttributes<HTMLSpanElement>;
export type StepsDescriptionProps = HTMLAttributes<HTMLSpanElement>;
