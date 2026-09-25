import './SkeletonPage.scss';

import { Skeleton } from '@virgo-design/ui';

import { ReviewSection } from '../../components/ReviewSection';

export function SkeletonPage() {
  return (
    <div className="review-board skeleton-review">
      <section className="skeleton-intro" id="overview">
        <div className="eyebrow-row">
          <span>Component 31</span>
          <span className="version-badge">STABLE · V1.0.0</span>
        </div>
        <h1>Skeleton</h1>
        <p>Visual content placeholders that preserve layout while real content loads.</p>
      </section>

      <ReviewSection
        id="skeleton-variants"
        index="01"
        title="Text, rectangle, and circle"
        description="A small set of shapes covers text lines, media blocks, and avatar placeholders."
      >
        <div className="skeleton-stack">
          <Skeleton variant="text" style={{ width: '80%' }} />
          <Skeleton variant="text" style={{ width: '56%' }} />
          <Skeleton style={{ width: 240, height: 96 }} />
          <Skeleton variant="circle" />
        </div>
      </ReviewSection>

      <ReviewSection
        id="skeleton-card"
        index="02"
        title="Card placeholder"
        description="Native dimensions and normal layout composition keep the API predictable."
      >
        <div className="skeleton-card" aria-label="Loading card" aria-busy="true">
          <Skeleton style={{ height: 144 }} />
          <div className="skeleton-card-copy">
            <Skeleton variant="text" style={{ width: '72%' }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" style={{ width: '84%' }} />
          </div>
        </div>
      </ReviewSection>

      <ReviewSection
        id="skeleton-motion"
        index="03"
        title="Motion control"
        description="Pulse is enabled by default, can be disabled, and stops for reduced-motion preferences."
      >
        <div className="skeleton-motion-row">
          <div>
            <span>Animated</span>
            <Skeleton style={{ width: 160 }} />
          </div>
          <div>
            <span>Static</span>
            <Skeleton animated={false} style={{ width: 160 }} />
          </div>
        </div>
      </ReviewSection>

      <footer className="review-footer">
        <span>Virgo Design UI · Skeleton V1.0.0</span>
        <span>Visual placeholder · Native sizing · Reduced motion</span>
      </footer>
    </div>
  );
}
