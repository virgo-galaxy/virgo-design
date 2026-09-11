import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes, ReactElement, Ref } from 'react';
export interface ButtonState {
  disabled: boolean;
}
export type ButtonRenderProps = HTMLAttributes<HTMLElement> & {
  ref?: Ref<HTMLElement>;
};
export type ButtonRender =
  ReactElement | ((props: ButtonRenderProps, state: ButtonState) => ReactElement);
export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'className' | 'style'
> {
  /**
   * Whether the button should remain focusable when disabled.
   *
   * @default false
   */
  focusableWhenDisabled?: boolean;
  /**
   * Whether the rendered element is a native <button>.
   *
   * Set this to false when `render` replaces the root element
   * with a non-button element.
   *
   * @default true
   */
  nativeButton?: boolean;
  /**
   * Replaces or composes the root element.
   */
  render?: ButtonRender;
  /**
   * CSS class name or state-based class name resolver.
   */
  className?: string | ((state: ButtonState) => string | undefined);
  /**
   * Inline style or state-based style resolver.
   */
  style?: CSSProperties | ((state: ButtonState) => CSSProperties | undefined);
}
//# sourceMappingURL=Button.types.d.ts.map
