import './ProgressPage.scss';

import { Progress, type ProgressIntent, type ProgressSize } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

const sizes = ['sm', 'md', 'lg'] as const satisfies readonly ProgressSize[];
const intents = [
  'default',
  'success',
  'warning',
  'error',
] as const satisfies readonly ProgressIntent[];

export function ProgressPage() {
  return (
    <div className="review-board progress-review">
      <section className="progress-intro" id="overview">
        <div className="eyebrow-row">
          <span>Component 25</span>
          <span className="version-badge">STABLE · V1.0.0</span>
        </div>
        <h1>Progress</h1>
        <p>Determinate progress for tasks with a known completion amount.</p>
      </section>

      <ReviewSection
        id="progress-values"
        index="01"
        title="Values and boundaries"
        description="Values are normalized against max and remain honest at empty and complete boundaries."
      >
        <div className="progress-stack">
          {[0, 25, 80, 100].map((value) => (
            <Progress key={value} value={value} label={`${value} of 100`} showValue />
          ))}
          <Progress value={3} max={4} label="Three of four" showValue />
        </div>
      </ReviewSection>

      <ReviewSection
        id="progress-sizes"
        index="02"
        title="Sizes"
        description="Size changes track thickness without changing the semantic value."
      >
        <div className="progress-stack">
          {sizes.map((size) => (
            <Progress key={size} value={60} size={size} label={size.toUpperCase()} />
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="progress-intents"
        index="03"
        title="Semantic intents"
        description="Intent uses Virgo semantic status colors for meaningful task outcomes."
      >
        <div className="progress-stack">
          {intents.map((intent) => (
            <Progress key={intent} value={70} intent={intent} label={intent} showValue />
          ))}
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Progress V1.0.0</span>
        <span>Determinate · Clamped · Accessible</span>
      </footer>
    </div>
  );
}
