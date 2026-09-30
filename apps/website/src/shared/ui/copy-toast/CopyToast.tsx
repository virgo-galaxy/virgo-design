import type { CopyToastState } from '@/shared/hooks/use-copy-toast';
import { FeedbackToast } from '@/shared/ui/feedback-toast/FeedbackToast';

interface CopyToastProps {
  toast: CopyToastState | null;
}

export function CopyToast({ toast }: CopyToastProps) {
  if (!toast || typeof document === 'undefined') {
    return null;
  }

  return <FeedbackToast key={toast.id} message={toast.message} duration={0} />;
}
