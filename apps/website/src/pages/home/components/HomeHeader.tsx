import { GithubIcon, LanguageIcon, MoonFilledIcon, SunFilledIcon } from '@virgo-design/icons';
import { Button, Dropdown, Layout, NavigationMenu } from '@virgo-design/ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { VirgoBrand } from '@/components/brand/VirgoBrand/VirgoBrand';
import { setAppLocale, useAppLocale } from '@/i18n';
import { ROUTE_PATHS } from '@/shared/routes/route-config';
import { useAppearance } from '@/shared/theme/use-appearance';

import { repositoryUrl } from '../model';

import styles from '../home-header.module.scss';

export function HomeHeader() {
  const { t } = useTranslation();
  const locale = useAppLocale();
  const { appearance, setAppearance } = useAppearance();
  const links = [
    { path: ROUTE_PATHS.root, label: 'home.header.home' },
    { path: ROUTE_PATHS.colors, label: 'home.header.design' },
    { path: ROUTE_PATHS.components, label: 'home.header.development' },
  ] as const;

  return (
    <Layout.Header
      className={styles.header!}
      position="fixed"
      height="var(--home-header-height)"
      contentAlign="center"
      paddingInline="clamp(20px, 3.5vw, 64px)"
      logo={<VirgoBrand className={styles.brand} />}
      actions={
        <div className={styles.actions}>
          <Dropdown size="small" trigger="click">
            <Dropdown.Trigger
              iconOnly
              variant="text"
              className={styles.language}
              aria-label={t('home.header.language')}
            >
              <LanguageIcon aria-hidden="true" />
            </Dropdown.Trigger>
            <Dropdown.Content
              arrow={false}
              placement="bottomRight"
              aria-label={t('home.header.language')}
            >
              <Dropdown.Item
                checked={locale === 'zh-CN'}
                onSelect={() => void setAppLocale('zh-CN')}
              >
                简体中文
              </Dropdown.Item>
              <Dropdown.Item
                checked={locale === 'en-US'}
                onSelect={() => void setAppLocale('en-US')}
              >
                English
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <Button
            className={styles.appearance}
            size="small"
            iconOnly
            variant="text"
            aria-label={t(
              appearance === 'light'
                ? 'app.controls.switchToDarkMode'
                : 'app.controls.switchToLightMode',
            )}
            onClick={() => setAppearance(appearance === 'light' ? 'dark' : 'light')}
          >
            {appearance === 'light' ? (
              <MoonFilledIcon aria-hidden="true" />
            ) : (
              <SunFilledIcon aria-hidden="true" />
            )}
          </Button>
          <a
            className={styles.github}
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <GithubIcon size={21} aria-hidden="true" />
          </a>
        </div>
      }
    >
      <NavigationMenu.Root
        className={styles.navigation}
        value={ROUTE_PATHS.root}
        aria-label={t('home.header.navigation')}
      >
        <NavigationMenu.List>
          {links.map((item) => (
            <NavigationMenu.Item key={item.path} value={item.path}>
              <NavigationMenu.Link render={(props) => <Link {...props} to={item.path} />}>
                {t(item.label)}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </Layout.Header>
  );
}
