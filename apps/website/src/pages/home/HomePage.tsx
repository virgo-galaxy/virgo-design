import { useGSAP } from '@gsap/react';
import { ExternalLinkIcon } from '@virgo-design/icons';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { VirgoBrand } from '@/components/brand/VirgoBrand/VirgoBrand';
import { ROUTE_PATHS } from '@/shared/routes/route-config';
import { useAppearance } from '@/shared/theme/use-appearance';

import { CommandCopy } from './components/CommandCopy';
import { HomeHeader } from './components/HomeHeader';
import { OverviewDemo } from './components/OverviewDemo';
import { TemplatePicker } from './components/TemplatePicker';
import { ThemeShowcase } from './components/ThemeShowcase';
import { WorkspaceDemo } from './components/WorkspaceDemo';
import { repositoryUrl, type TemplateTier } from './model';

import styles from './home-page.module.scss';

gsap.registerPlugin(useGSAP);

export function HomePage() {
  const { t } = useTranslation();
  const { appearance } = useAppearance();
  const [tier, setTier] = useState<TemplateTier>('starter');
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-home-enter]',
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
          },
        );
      });
      return () => media.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={styles.page} data-theme={appearance}>
      <a className={styles.skipLink} href="#website-main">
        {t('app.navigation.skipToContent')}
      </a>
      <HomeHeader />
      <main id="website-main" tabIndex={-1} className={styles.main}>
        <section className={styles.hero} aria-labelledby="home-hero-title">
          <div className={styles.heroCopy}>
            <h1 id="home-hero-title" data-home-enter="">
              <span>{t('home.hero.firstLine')}</span> <span>{t('home.hero.secondLine')}</span>
            </h1>
            <p className={styles.heroDescription} data-home-enter="">
              {t('home.hero.description')}
            </p>
            <div className={styles.heroActions} data-home-enter="">
              <a className={styles.primaryLink} href="#create-project">
                {t('home.hero.start')}
              </a>
              <a href="#create-project" className={styles.proLink} onClick={() => setTier('pro')}>
                {t('home.hero.pro')}
                <ExternalLinkIcon size={16} aria-hidden="true" />
              </a>
            </div>
            <div className={styles.heroCommand} data-home-enter="">
              <CommandCopy command="pnpm create @virgo-design" />
            </div>
            <p className={styles.license} data-home-enter="">
              {t('home.hero.license')}
            </p>
          </div>
          <div
            className={styles.heroStage}
            aria-label={t('home.hero.demo')}
            role="region"
            data-home-enter=""
          >
            <WorkspaceDemo />
            <div className={styles.heroOverview}>
              <OverviewDemo />
            </div>
          </div>
        </section>
        <ThemeShowcase />
        <section
          id="create-project"
          className={styles.templates}
          aria-labelledby="home-templates-title"
        >
          <header className={styles.sectionHeader}>
            <h2 id="home-templates-title">{t('home.templates.title')}</h2>
            <p>{t('home.templates.description')}</p>
          </header>
          <TemplatePicker tier={tier} onTierChange={setTier} />
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.closing}>
          <h2>{t('home.footer.title')}</h2>
          <Link className={styles.primaryLink} to={ROUTE_PATHS.components}>
            {t('home.footer.docs')}
            <ExternalLinkIcon size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className={styles.footerBar}>
          <VirgoBrand />
          <nav aria-label={t('home.footer.links')}>
            <a href={repositoryUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link to={ROUTE_PATHS.components}>{t('home.footer.documentation')}</Link>
            <a href={`${repositoryUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
              MIT License
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
