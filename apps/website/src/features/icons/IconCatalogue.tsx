import './platform.scss';

import { PauseIcon, PlayIcon, SearchIcon, StudioToolsIcon } from '@virgo-design/icons';
import { iconCategories, type IconCategory } from '@virgo-design/icons/metadata';
import { iconComponents } from '@virgo-design/icons/registry';
import { Button, Input, Tooltip } from '@virgo-design/ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';

import { iconAnimationIdeaKey, searchWebsiteIcons } from './search';

export function IconCatalogue() {
  const { t } = useTranslation();
  const [playing, setPlaying] = useState(true);
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const category = iconCategories.find((category) => category === params.get('category'));
  const animation = params.get('animation');
  const animated = animation === 'true' ? true : animation === 'false' ? false : undefined;
  const setQuery = (query: string) => {
    const next = new URLSearchParams(params);
    if (query) next.set('q', query);
    else next.delete('q');
    setParams(next, { replace: true });
  };
  const setCategory = (category: IconCategory | undefined) => {
    const next = new URLSearchParams(params);
    if (category) next.set('category', category);
    else next.delete('category');
    setParams(next, { replace: true });
  };
  const setAnimation = (value: boolean) => {
    const next = new URLSearchParams(params);
    if (animated === value) next.delete('animation');
    else next.set('animation', String(value));
    setParams(next, { replace: true });
  };
  const results = searchWebsiteIcons(query, category, animated);
  return (
    <section className="icon-platform" aria-label={t('icons.catalogue')}>
      <div className="icon-platform-toolbar">
        <Input
          aria-label={t('icons.search')}
          placeholder={t('icons.search')}
          leadingIcon={<SearchIcon size={20} />}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Link className="icon-platform-link" to="/foundations/icons/studio">
          <StudioToolsIcon size={20} />
          {t('icons.studio')}
        </Link>
      </div>
      <div className="icon-platform-filters" role="group" aria-label={t('icons.categories')}>
        <Button
          variant={!category ? 'primary' : 'outline'}
          aria-pressed={!category}
          onClick={() => setCategory(undefined)}
        >
          {t('icons.all')}
        </Button>
        {iconCategories.map((item) => (
          <Button
            key={item}
            variant={category === item ? 'primary' : 'outline'}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {t(`icons.categoryNames.${item}`)}
          </Button>
        ))}
      </div>
      <div className="icon-animation-filters" role="group" aria-label={t('icons.animationFilter')}>
        <span className="icon-animation-filter-label">{t('icons.animationFilter')}</span>
        <Button
          variant={animated === true ? 'primary' : 'outline'}
          aria-pressed={animated === true}
          onClick={() => setAnimation(true)}
        >
          {t('icons.animated')}
        </Button>
        <Button
          variant={animated === false ? 'primary' : 'outline'}
          aria-pressed={animated === false}
          onClick={() => setAnimation(false)}
        >
          {t('icons.nonAnimated')}
        </Button>
      </div>
      {animated === true ? (
        <div className="icon-animation-note">
          <span>{t('icons.animationNote')}</span>
          <Tooltip>
            <Tooltip.Trigger
              render={(props) => (
                <Button
                  {...props}
                  iconOnly
                  size="medium"
                  variant="text"
                  shape="circle"
                  aria-label={t(playing ? 'icons.pauseAnimations' : 'icons.playAnimations')}
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                </Button>
              )}
            />
            <Tooltip.Content size="small" arrow={false}>
              {t(playing ? 'icons.pauseAnimations' : 'icons.playAnimations')}
            </Tooltip.Content>
          </Tooltip>
        </div>
      ) : null}
      <p role="status">{t('icons.results', { count: results.length })}</p>
      {results.length ? (
        <div className="icon-platform-grid">
          {results.map((icon) => {
            const Icon = iconComponents[icon.id];
            return (
              <Link
                key={icon.id}
                className="icon-platform-card"
                to={`/foundations/icons/${icon.id}`}
              >
                <Icon
                  size={24}
                  {...(icon.animated && animated === true && playing
                    ? { animated: 'always' as const }
                    : {})}
                />
                <span>{icon.id}</span>
                <small>{t(`icons.categoryNames.${icon.category}`)}</small>
                {animated === true ? (
                  <p className="icon-animation-idea">{t(iconAnimationIdeaKey(icon.id))}</p>
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : (
        <p>{t('icons.noResults')}</p>
      )}
    </section>
  );
}
