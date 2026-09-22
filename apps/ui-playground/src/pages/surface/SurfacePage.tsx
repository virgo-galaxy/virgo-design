import './SurfacePage.scss';

import {
  Button,
  Layout,
  Surface,
  type SurfaceBackground,
  type SurfaceBorder,
  type SurfaceElevation,
  type SurfaceMaterial,
  type SurfaceRadius,
  type SurfaceTone,
} from '@virgo-design/ui';
import { useState } from 'react';

import { ReviewSection } from '../../components/ReviewSection';

const tones = [
  'default',
  'secondary',
  'strong',
  'elevated',
] as const satisfies readonly SurfaceTone[];
const materials = ['solid', 'translucent', 'glass'] as const satisfies readonly SurfaceMaterial[];
const elevations = [0, 1, 2, 3, 4, 5] as const satisfies readonly SurfaceElevation[];
const borders = ['none', 'subtle', 'default', 'strong'] as const satisfies readonly SurfaceBorder[];
const radii = [0, 6, 12, 24, 'full'] as const satisfies readonly SurfaceRadius[];
const backgrounds: ReadonlyArray<{ name: string; background?: SurfaceBackground }> = [
  { name: 'Semantic default' },
  { name: 'Color', background: { type: 'color', value: '#243852' } },
  {
    name: 'Gradient',
    background: {
      type: 'gradient',
      value: 'linear-gradient(125deg, #263c60, #5e448e 55%, #8b506d)',
    },
  },
  {
    name: 'Image',
    background: { type: 'image', src: '/surface-landscape.svg', fit: 'cover', position: 'center' },
  },
];

export function SurfacePage() {
  const [actions, setActions] = useState(0);
  const [showOverflow, setShowOverflow] = useState(false);

  return (
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
            material, and depth form one shared language for headers, panels, and floating content.
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
          <div className="surface-backdrop surface-hero-stage">
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
          </div>
        </div>
      </section>

      <ReviewSection
        id="surface-semantic"
        index="01"
        title="Semantic Surface"
        description="Four container tones use the existing semantic surface tokens. The default surface adds no padding, size, border, or radius; specimen spacing belongs to this page."
      >
        <div className="surface-demo-grid">
          {tones.map((tone) => (
            <article className="surface-demo-card" key={tone}>
              <div className="surface-demo-heading">
                <strong>{tone}</strong>
                <code>tone</code>
              </div>
              <div className="surface-tone-stage">
                <Surface tone={tone} className="surface-demo-content">
                  <strong>Semantic {tone}</strong>
                  <p>Content and color follow the active theme.</p>
                </Surface>
              </div>
              <code className="surface-demo-code">--vd-surface-{tone}</code>
            </article>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="surface-material"
        index="02"
        title="Material"
        description="The same landscape sits behind each surface: solid retains its semantic fill, translucent lets the scene through, and glass diffuses it. Switch Light / Dark above to compare the tint."
      >
        <div className="surface-demo-grid surface-demo-grid--three">
          {materials.map((material) => (
            <article className="surface-demo-card" key={material}>
              <div className="surface-demo-heading">
                <strong>{material}</strong>
                <code>material</code>
              </div>
              <div className="surface-backdrop surface-material-stage">
                <span className="surface-scene-type" aria-hidden="true">
                  V / 01
                </span>
                <Surface
                  material={material}
                  radius={12}
                  className="surface-demo-content surface-material-sample"
                >
                  <strong>
                    {material === 'glass'
                      ? 'Light, softly filtered.'
                      : material === 'translucent'
                        ? 'A hint of the scene.'
                        : 'A grounded surface.'}
                  </strong>
                  <p>Same space. Different material.</p>
                  <Button
                    size="small"
                    variant="outline"
                    onClick={() => setActions((count) => count + 1)}
                  >
                    Interact
                  </Button>
                </Surface>
              </div>
            </article>
          ))}
        </div>
        <p className="surface-review-note">
          Glass has a subtle border by default. Without backdrop-filter support it retains a
          readable tinted fallback. Blur never applies to the content itself.
        </p>
      </ReviewSection>

      <ReviewSection
        id="surface-background"
        index="03"
        title="Background"
        description="Custom backgrounds sit below material and content. This landscape is a repository-owned SVG and works offline; the public API also accepts remote image URLs."
      >
        <div className="surface-demo-grid">
          {backgrounds.map(({ name, background }) => (
            <article className="surface-demo-card" key={name}>
              <div className="surface-demo-heading">
                <strong>{name}</strong>
                <code>background</code>
              </div>
              <Surface
                {...(background ? { background } : {})}
                radius={12}
                className={`surface-background-sample surface-demo-content${background ? ' surface-custom-foreground' : ''}`}
              >
                <span className="surface-demo-eyebrow">Decorative foundation</span>
                <strong>{name}</strong>
                <p>Normal accessible content above the scene.</p>
              </Surface>
            </article>
          ))}
        </div>
        <div className="surface-image-material-row">
          <Surface
            background={{ type: 'image', src: '/surface-landscape.svg' }}
            material="glass"
            border="strong"
            radius={12}
            className="surface-demo-content"
          >
            <strong>Image + glass</strong>
            <p>
              A custom image under the material layer: the scene is softened while this text stays
              crisp.
            </p>
          </Surface>
          <Surface
            background={{
              type: 'image',
              src: '/surface-landscape.svg',
              fit: 'contain',
              position: 'right center',
            }}
            tone="secondary"
            radius={12}
            className="surface-demo-content surface-contain-sample"
          >
            <span className="surface-contain-caption">Contain · right center · no repeat</span>
          </Surface>
        </div>
        <p className="surface-review-note">
          Background images are decorative and have no alt text. If an image carries meaning, use a
          real <code>&lt;img alt="…" /&gt;</code>. Custom backgrounds require an appropriate
          foreground color.
        </p>
      </ReviewSection>

      <ReviewSection
        id="surface-depth"
        index="04"
        title="Depth & Shape"
        description="Existing Elevation 0–5, semantic borders, and radius tokens work independently of the material. No new Foundation scale is introduced."
      >
        <div className="surface-depth-grid">
          {elevations.map((elevation) => (
            <Surface
              key={elevation}
              tone="elevated"
              elevation={elevation}
              radius={12}
              border="subtle"
              className="surface-depth-sample"
            >
              <span>Elevation</span>
              <strong>{elevation}</strong>
            </Surface>
          ))}
        </div>
        <div className="surface-border-grid">
          {borders.map((border) => (
            <Surface
              key={border}
              border={border}
              radius={8}
              tone="secondary"
              className="surface-token-sample"
            >
              <span>Border</span>
              <strong>{border}</strong>
            </Surface>
          ))}
        </div>
        <div className="surface-radius-grid">
          {radii.map((radius) => (
            <Surface key={radius} border="default" radius={radius} className="surface-token-sample">
              <span>Radius</span>
              <strong>{radius}</strong>
            </Surface>
          ))}
        </div>
      </ReviewSection>

      <ReviewSection
        id="surface-composition"
        index="05"
        title="Composition"
        description="Layout owns the header, side, and content regions. Surface supplies their appearance. Nested surfaces retain their own material, and visible overflow leaves room for badges, shadows, and floating content."
      >
        <div className="surface-composition-stage surface-backdrop">
          <Layout className="surface-composition-layout">
            <Layout.Header>
              <Surface material="glass" radius={12} className="surface-composition-header">
                <strong>Workspace</strong>
                <span>Layout.Header + Surface</span>
              </Surface>
            </Layout.Header>
            <Layout direction="horizontal" className="surface-composition-body">
              <Layout.Sider width="var(--surface-composition-sider-width, clamp(100px, 24%, 180px))">
                <Surface material="translucent" radius={12} className="surface-composition-sider">
                  <strong>Library</strong>
                  <span>Projects</span>
                  <span>Materials</span>
                  <span>Archive</span>
                </Surface>
              </Layout.Sider>
              <Layout.Content>
                <Surface tone="elevated" radius={12} elevation={2} className="surface-demo-content">
                  <span className="surface-demo-eyebrow">Layout.Content + Surface</span>
                  <strong className="surface-demo-title">One system. Many spaces.</strong>
                  <p>Structure stays in Layout; the skin can change independently.</p>
                  <Surface
                    tone="secondary"
                    radius={8}
                    border="subtle"
                    className="surface-nested-sample"
                  >
                    <strong>Nested surface</strong>
                    <p>Local depth and tone, with normal document flow.</p>
                  </Surface>
                </Surface>
              </Layout.Content>
            </Layout>
          </Layout>
        </div>
        <details className="surface-composition-example">
          <summary>View composition example</summary>
          <pre className="surface-composition-code">
            <code>
              {
                '<Layout.Header>\n  <Surface material="glass" radius={12}>\n    Header content\n  </Surface>\n</Layout.Header>'
              }
            </code>
          </pre>
        </details>
        <div className="surface-overflow-heading">
          <h3>Content overflow</h3>
          <p>
            The badge extends past the rounded edge. Open the floating content to check the same
            behavior below the surface.
          </p>
        </div>
        <div className="surface-overflow-stage" data-expanded={showOverflow}>
          <Surface
            material="glass"
            radius={24}
            border="strong"
            className="surface-overflow-sample surface-demo-content"
          >
            <span className="surface-overflow-badge">Outside the radius</span>
            <strong>Rounded surface. Open edges.</strong>
            <p>Background and material follow the radius; content can extend beyond it.</p>
            <Button
              size="small"
              variant="secondary"
              aria-expanded={showOverflow}
              aria-controls="surface-overflow-content"
              onClick={() => setShowOverflow((visible) => !visible)}
            >
              {showOverflow ? 'Hide floating content' : 'Show floating content'}
            </Button>
            {showOverflow ? (
              <Surface
                id="surface-overflow-content"
                tone="elevated"
                elevation={3}
                radius={8}
                border="default"
                className="surface-overflow-content"
              >
                <strong>Beyond the container</strong>
                <p>Still visible, readable, and interactive.</p>
                <Button size="mini" onClick={() => setShowOverflow(false)}>
                  Dismiss
                </Button>
              </Surface>
            ) : null}
          </Surface>
        </div>
      </ReviewSection>

      <footer className="review-footer surface-review-footer">
        <span>Virgo Design / Surface V1.0.0</span>
        <span>Semantic Tone · Material · Background · Depth · Composition</span>
      </footer>
    </div>
  );
}
