import { Surface } from '@virgo-design/ui';
import type { HTMLAttributes } from 'react';

export function ReferenceSpecimenRoot({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Surface
      {...props}
      className={['hero-specimen', className].filter(Boolean).join(' ')}
      tone="elevated"
      border="default"
      radius={16}
      elevation={2}
      data-reference-specimen=""
    />
  );
}

export function ReferenceSpecimenToolbar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={['specimen-toolbar', className].filter(Boolean).join(' ')} />;
}

export function ReferenceSpecimenStage({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={['hero-stage', className].filter(Boolean).join(' ')} />;
}

export function ReferenceSpecimenCaption({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={['specimen-caption', className].filter(Boolean).join(' ')} />;
}
