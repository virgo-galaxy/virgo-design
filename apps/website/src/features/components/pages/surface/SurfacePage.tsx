import './SurfacePage.scss';

import { Button, Layout, Surface } from '@virgo-design/ui';
import { useState } from 'react';

import landscapeImage from '@/assets/examples/surface/landscape.svg';
import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { surfaceExamples } from '@/examples/components/surface/examples';

export function SurfacePage() {
  const [actions, setActions] = useState(0);
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board" id="surface-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <div className="eyebrow-row">
              <span>Component 02</span>
              <span className="version-badge">STABLE · V1.0.0</span>
            </div>
            <h1>Surface</h1>
            <p>
              Layout defines the space. Surface gives that space a visual skin. Semantic color,
              material, and depth form one shared language for headers, panels, and floating
              content.
            </p>
            <dl className="component-facts">
              <div>
                <dt>Tones</dt>
                <dd>04</dd>
              </div>
              <div>
                <dt>Materials</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>Elevation</dt>
                <dd>0–5</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen surface-hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>glass · elevated</code>
            </div>
            <div
              className="surface-backdrop surface-hero-stage"
              style={{ backgroundImage: `url("${landscapeImage}")` }}
            >
              <Layout>
                <Layout.Header>
                  <Surface
                    material="glass"
                    tone="elevated"
                    radius={16}
                    elevation={2}
                    className="surface-demo-content"
                  >
                    <span className="surface-demo-eyebrow">A shared material language</span>
                    <strong className="surface-demo-title">Space, dressed.</strong>
                    <p>A glass header, built on an ordinary structural region.</p>
                    <Button size="small" onClick={() => setActions((count) => count + 1)}>
                      Try the content
                    </Button>
                    <span className="surface-demo-feedback" aria-live="polite">
                      {actions === 0
                        ? 'Content stays interactive'
                        : `${actions} successful interactions`}
                    </span>
                  </Surface>
                </Layout.Header>
              </Layout>
            </div>
            <div className="specimen-caption">
              <span>Theme-aware tint</span>
              <span>Native content</span>
              <span>CSS material</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'surface-semantic'}
          index={'01'}
          title={'Semantic Surface'}
          description={
            'Four container tones use the existing semantic surface tokens. The default surface adds no padding, size, border, or radius; specimen spacing belongs to this page.'
          }
        >
          <ComponentExample example={surfaceExamples.surfaceTones} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'surface-material'}
          index={'02'}
          title={'Material'}
          description={
            'The same landscape sits behind each surface: solid retains its semantic fill, translucent lets the scene through, and glass diffuses it. Switch Light / Dark above to compare the tint.'
          }
        >
          <ComponentExample example={surfaceExamples.surfaceMaterials} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'surface-background'}
          index={'03'}
          title={'Background'}
          description={
            'Decorative color, gradient, and offline image examples are independently copyable. Use an img with alt text for meaningful images, and choose readable foregrounds for custom backgrounds.'
          }
        >
          <ComponentExample example={surfaceExamples.surfaceColorBackground} />
          <ComponentExample example={surfaceExamples.surfaceImageBackground} />
          <ComponentExample example={surfaceExamples.surfaceImageMaterial} />
          <ComponentExample example={surfaceExamples.surfaceImageContain} />
        </ArticleSection>
        <ArticleSection
          id={'surface-depth'}
          index={'04'}
          title={'Depth & Shape'}
          description={
            'Existing Elevation 0–5, semantic borders, and radius tokens work independently of the material. No new Foundation scale is introduced.'
          }
        >
          <ComponentExample example={surfaceExamples.surfaceElevation} />
          <ComponentExample example={surfaceExamples.surfaceBorders} />
          <ComponentExample example={surfaceExamples.surfaceRadius} />
        </ArticleSection>
        <ArticleSection
          id={'surface-composition'}
          index={'05'}
          title={'Composition'}
          description={
            'Layout owns the header, side, and content regions. Surface supplies their appearance. Nested surfaces retain their own material, and visible overflow leaves room for badges, shadows, and floating content.'
          }
        >
          <ComponentExample example={surfaceExamples.surfaceLayoutComposition} />
          <ComponentExample example={surfaceExamples.surfaceOverflow} />
        </ArticleSection>
        <footer className="review-footer surface-review-footer">
          <span>Virgo Design / Surface V1.0.0</span>
          <span>Semantic Tone · Material · Background · Depth · Composition</span>
        </footer>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
