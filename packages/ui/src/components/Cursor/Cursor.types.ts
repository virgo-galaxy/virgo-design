import type { CursorProviderProps as PrimitiveCursorProviderProps } from '@virgo-design/primitives';
import type { SVGProps } from 'react';

export type {
  CursorFollowerProps,
  CursorFollowOptions,
  CursorPointer,
  CursorSnapshot,
} from '@virgo-design/primitives';

export type CursorSize = 'sm' | 'md' | 'lg';
export interface CursorProviderProps extends PrimitiveCursorProviderProps {
  /** Default Virgo visual: sm=16px, md=20px, lg=24px. Custom visuals own their dimensions. @default 'md' */
  size?: CursorSize;
}

export interface CursorVisualProps extends Omit<SVGProps<SVGSVGElement>, 'stroke' | 'strokeWidth'> {
  /** sm=16px, md=20px, lg=24px. @default 'md' */
  size?: CursorSize;
}
