import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './Dialog';

export const Dialog = Object.assign(DialogRoot, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose,
});

export type {
  DialogCloseProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogOverlayProps,
  DialogPortalProps,
  DialogProps,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
} from './Dialog.types';
