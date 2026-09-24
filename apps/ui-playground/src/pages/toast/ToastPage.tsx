import './ToastPage.scss';

import { Button, Toast, type ToastIntent, type ToastPlacement } from '@virgo-design/ui';
import { useRef, useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const intents = [
  'default',
  'success',
  'warning',
  'error',
  'info',
] as const satisfies readonly ToastIntent[];
const placements = [
  'top-start',
  'top-center',
  'top-end',
  'bottom-start',
  'bottom-center',
  'bottom-end',
] as const satisfies readonly ToastPlacement[];

export function ToastPage() {
  const [toasts, setToasts] = useState<
    Array<{ id: number; intent: ToastIntent; action?: boolean }>
  >([]);
  const [placement, setPlacement] = useState<ToastPlacement>('bottom-end');
  const nextId = useRef(1);

  const addToast = (intent: ToastIntent, action = false) => {
    const id = nextId.current;
    nextId.current += 1;
    setToasts((current) => [...current, { id, intent, action }]);
  };

  return (
    <Toast.Provider>
      <div className="review-board toast-review">
        <section className="toast-intro" id="overview">
          <div className="eyebrow-row">
            <span>Component 18</span>
            <span className="version-badge">STABLE · V1.0.0</span>
          </div>
          <h1>Toast</h1>
          <p>
            Brief feedback that announces itself without interrupting the current task or moving
            focus.
          </p>
        </section>

        <ReviewSection
          id="toast-status"
          index="01"
          title="Status variants"
          description="Each intent uses semantic status tokens and an icon from Virgo Icons."
        >
          <div className="toast-controls">
            {intents.map((intent) => (
              <Button key={intent} variant="outline" onClick={() => addToast(intent)}>
                Show {intent}
              </Button>
            ))}
          </div>
        </ReviewSection>

        <ReviewSection
          id="toast-stack"
          index="02"
          title="Action and stacking"
          description="Create several notifications. Hover or focus a toast to pause only its remaining duration."
        >
          <div className="toast-controls">
            <Button onClick={() => addToast('success', true)}>Archive with Undo</Button>
            <Button
              variant="secondary"
              onClick={() => {
                addToast('info');
                addToast('warning');
              }}
            >
              Add two toasts
            </Button>
          </div>
        </ReviewSection>

        <ReviewSection
          id="toast-placement"
          index="03"
          title="Viewport placement"
          description="Placement belongs to the visual viewport while announcement and timing stay in the primitive."
        >
          <div className="toast-controls">
            {placements.map((value) => (
              <Button
                key={value}
                size="small"
                variant={placement === value ? 'primary' : 'outline'}
                onClick={() => setPlacement(value)}
              >
                {value}
              </Button>
            ))}
          </div>
        </ReviewSection>

        <footer className="review-footer">
          <span>Virgo Design UI · Toast V1.0.0</span>
          <span>Live region · Presence · Classic</span>
        </footer>
      </div>

      {toasts.map(({ id, intent, action }) => (
        <Toast.Root key={id} intent={intent} duration={5000}>
          <Toast.Title>
            {intent === 'default'
              ? 'Notification'
              : `${intent[0]!.toUpperCase()}${intent.slice(1)}`}
          </Toast.Title>
          <Toast.Description>
            Toast #{id} is using the shared notification viewport.
          </Toast.Description>
          {action ? <Toast.Action>Undo</Toast.Action> : null}
          <Toast.Close />
        </Toast.Root>
      ))}
      <Toast.Viewport placement={placement} />
    </Toast.Provider>
  );
}
