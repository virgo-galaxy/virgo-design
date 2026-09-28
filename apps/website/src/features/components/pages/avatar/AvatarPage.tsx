import './AvatarPage.scss';

import { Avatar, Badge } from '@virgo-design/ui';

import avatarImage from '@/assets/examples/avatar/icon.png';
import { ArticleSection } from '@/components/docs/ArticleSection';
import {
  ComponentExample,
  ComponentExampleRuntimeControl,
  ComponentExampleRuntimeProvider,
} from '@/components/docs/ComponentExample';
import { avatarExamples } from '@/examples/components/avatar/examples';

import { ComponentPageMetadata } from '../../components/ComponentPageMetadata';

export function AvatarPage() {
  return (
    <ComponentExampleRuntimeProvider>
      <div className="review-board avatar-review">
        <section className="overview" id="overview" data-review-section="overview">
          <div className="overview-copy">
            <ComponentPageMetadata />
            <h1>Avatar</h1>
            <p>Identity images with token-based sizing, resilient fallback, and simple grouping.</p>
            <dl className="component-facts">
              <div>
                <dt>Sources</dt>
                <dd>Image</dd>
              </div>
              <div>
                <dt>Fallback</dt>
                <dd>Text</dd>
              </div>
              <div>
                <dt>Composition</dt>
                <dd>Group</dd>
              </div>
            </dl>
          </div>
          <div className="hero-specimen">
            <div className="specimen-toolbar">
              <span>Reference specimen</span>
              <code>image · fallback · group</code>
            </div>
            <div className="hero-stage">
              <div className="avatar-stage avatar-hero-stage">
                <Badge dot intent="success" aria-label="Online">
                  <Avatar src={avatarImage} alt="Virgo Design" size="lg" />
                </Badge>
                <Avatar fallback="PK" aria-label="Pokeya" size="lg" />
                <Avatar.Group aria-label="Project members">
                  <Avatar fallback="VD" />
                  <Avatar fallback="UI" />
                  <Avatar fallback="DS" />
                </Avatar.Group>
              </div>
            </div>
            <div className="specimen-caption">
              <span>Image</span>
              <span>Fallback</span>
              <span>Presence and group</span>
              <ComponentExampleRuntimeControl />
            </div>
          </div>
        </section>
        <ArticleSection
          id={'avatar-content'}
          index={'01'}
          title={'Image and fallback'}
          description={'Fallback content appears when the source is absent or cannot load.'}
        >
          <ComponentExample example={avatarExamples.avatarImageFallback} showCaption={false} />
        </ArticleSection>
        <ArticleSection
          id={'avatar-sizes'}
          index={'02'}
          title={'Sizes and shapes'}
          description={'Three stable sizes support circular profile and square entity silhouettes.'}
        >
          <ComponentExample example={avatarExamples.avatarSizes} />
          <ComponentExample example={avatarExamples.avatarShapes} />
        </ArticleSection>
        <ArticleSection
          id={'avatar-composition'}
          index={'03'}
          title={'Badge and group composition'}
          description={
            'Presence stays a Badge concern; groups remain a lightweight visual collection.'
          }
        >
          <ComponentExample example={avatarExamples.avatarPresence} />
          <ComponentExample example={avatarExamples.avatarGroup} />
        </ArticleSection>
      </div>
    </ComponentExampleRuntimeProvider>
  );
}
