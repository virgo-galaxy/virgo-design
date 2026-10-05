import './platform.scss';

import { ArrowReturnIcon, type IconAnimation } from '@virgo-design/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getIconSvg, iconComponents, iconManifest } from './catalogue';
import { IconCodePanel } from './IconCodePanel';
import { IconsExplorer } from './IconsExplorer';

export function IconDetail({ id }: { id: string }) {
  const { t } = useTranslation();
  const [previewAnimation, setPreviewAnimation] = useState<{
    id: string;
    value: IconAnimation | undefined;
  }>();
  const icon = iconManifest.find((item) => item.id === id);
  if (!icon)
    return (
      <section className="icon-platform">
        <p>{t('icons.notFound')}</p>
        <Link className="icon-platform-link" to="/foundations/icons">
          <ArrowReturnIcon size={20} />
          {t('icons.back')}
        </Link>
      </section>
    );
  const related = iconManifest
    .filter(
      (item) =>
        item.family !== icon.family &&
        item.variant === 'outline' &&
        (item.category === icon.category ||
          item.tags.some((tag) => (icon.tags as readonly string[]).includes(tag))),
    )
    .sort((a, b) => Number(b.category === icon.category) - Number(a.category === icon.category))
    .slice(0, 6)
    .sort((a, b) => a.id.localeCompare(b.id, 'en', { sensitivity: 'base', numeric: true }));
  return (
    <section className="icon-platform" key={icon.id}>
      <Link className="icon-platform-link" to="/foundations/icons">
        <ArrowReturnIcon size={20} />
        {t('icons.back')}
      </Link>
      <h2>{icon.id}</h2>
      <div className="icon-platform-grid" role="group" aria-label={t('icons.variant')}>
        {iconManifest
          .filter((item) => item.family === icon.family)
          .sort((a, b) => Number(a.variant === 'filled') - Number(b.variant === 'filled'))
          .map((item) => {
            const VariantIcon = iconComponents[item.id];
            return (
              <Link
                className="icon-platform-card"
                aria-label={`${item.componentName} ${t(`icons.variantNames.${item.variant}`)}`}
                key={item.id}
                to={`/foundations/icons/${item.id}`}
                aria-current={item.id === id ? 'page' : undefined}
              >
                <VariantIcon size={24} />
                <span>{item.componentName}</span>
                <small>{t(`icons.variantNames.${item.variant}`)}</small>
              </Link>
            );
          })}
      </div>
      <dl className="icon-platform-metadata">
        <div>
          <dt>{t('icons.family')}</dt>
          <dd>{icon.family}</dd>
        </div>
        <div>
          <dt>{t('icons.variant')}</dt>
          <dd>{t(`icons.variantNames.${icon.variant}`)}</dd>
        </div>
        <div>
          <dt>{t('icons.component')}</dt>
          <dd>
            <code>{icon.componentName}</code>
          </dd>
        </div>
        <div>
          <dt>{t('icons.category')}</dt>
          <dd>
            <Link to={`/foundations/icons?category=${icon.category}`}>
              {t(`icons.categoryNames.${icon.category}`)}
            </Link>
          </dd>
        </div>
        <div>
          <dt>{t('icons.aliases')}</dt>
          <dd>
            {icon.aliases.length
              ? icon.aliases.map((alias) => (
                  <Link
                    className="icon-platform-term"
                    key={alias}
                    to={`/foundations/icons?q=${encodeURIComponent(alias)}`}
                  >
                    {alias}
                  </Link>
                ))
              : '—'}
          </dd>
        </div>
        <div>
          <dt>{t('icons.tags')}</dt>
          <dd>
            {icon.tags.map((tag) => (
              <Link
                className="icon-platform-term"
                key={tag}
                to={`/foundations/icons?q=${encodeURIComponent(tag)}`}
              >
                {tag}
              </Link>
            ))}
          </dd>
        </div>
        <div>
          <dt>{t('icons.status')}</dt>
          <dd>{t(`icons.statusNames.${icon.status}`)}</dd>
        </div>
        <div>
          <dt>{t('icons.animationFilter')}</dt>
          <dd>{t(icon.animated ? 'icons.animated' : 'icons.nonAnimated')}</dd>
        </div>
      </dl>
      <h3 className="icon-platform-section-title">{t('icons.previewSection')}</h3>
      <IconsExplorer
        iconId={icon.id}
        onAnimationChange={(value) => setPreviewAnimation({ id, value })}
      />
      <h3 className="icon-platform-section-title">{t('icons.codeSection')}</h3>
      <IconCodePanel
        name={icon.componentName}
        reactSource={
          icon.id === 'virgo-design-color'
            ? `import { VirgoDesignLogo } from '@virgo-design/icons/brands';\n\nexport default function Example() {\n  return <VirgoDesignLogo size={24} />;\n}`
            : undefined
        }
        svg={getIconSvg(
          icon.id,
          previewAnimation?.id === icon.id ? previewAnimation.value : undefined,
        )}
        animated={previewAnimation?.id === id ? previewAnimation.value : undefined}
      />
      <h3 className="icon-platform-section-title">{t('icons.related')}</h3>
      <div className="icon-related-grid">
        {related.map((item) => {
          const RelatedIcon = iconComponents[item.id];
          return (
            <Link className="icon-related-card" key={item.id} to={`/foundations/icons/${item.id}`}>
              <span className="icon-related-glyph">
                <RelatedIcon size={24} />
              </span>
              <span>{item.id}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
