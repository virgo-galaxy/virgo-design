import i18n from 'i18next';
import { useState } from 'react';
import { initReactI18next } from 'react-i18next';

import { readPreference, writePreference } from '@/preferences/storage';

type LocalePreference = 'auto' | 'en-US' | 'zh-CN';
const localeKey = 'virgo-starter:locale';

function readLocale(): LocalePreference {
  const value = readPreference(localeKey);
  return value === 'en-US' || value === 'zh-CN' ? value : 'auto';
}

function resolveLocale(preference: LocalePreference) {
  if (preference !== 'auto') return preference;
  return typeof window !== 'undefined' && navigator.language.toLowerCase().startsWith('zh')
    ? 'zh-CN'
    : 'en-US';
}

export function initializeLocale(preference = readLocale()) {
  return i18n.use(initReactI18next).init({
    lng: resolveLocale(preference),
    initAsync: false,
    fallbackLng: 'en-US',
    interpolation: { escapeValue: false },
    resources: {
      'en-US': {
        translation: {
          app: {
            dashboard: 'Dashboard',
            workplace: 'Workplace',
            workspace: 'Workspace',
            skipToContent: 'Skip to content',
            globalActions: 'Global actions',
            virgoDesignProHome: 'Virgo Starter home',
            restoreNavigation: 'Restore navigation',
            virgoDesign: 'Virgo Design',
            virgoDesignPro: 'Virgo Starter',
            pro: 'Starter',
            pageBreadcrumb: 'Page breadcrumb',
          },
          sidebar: {
            mainNavigation: 'Main navigation',
            expand: 'Expand sidebar',
            collapse: 'Collapse sidebar',
            closeNavigation: 'Close navigation',
          },
          languageControl: {
            label: 'Language',
            auto: 'Automatically detect',
            chinese: '简体中文',
            english: 'English',
          },
          appearanceControl: {
            label: 'Appearance',
            system: 'Follow system',
            light: 'Light',
            dark: 'Dark',
          },
          workplaceDescription: 'The home of your workspace.',
          notFound: 'Page not found',
          routeError: 'Something went wrong',
          back: 'Back to Workplace',
        },
      },
      'zh-CN': {
        translation: {
          app: {
            dashboard: '仪表盘',
            workplace: '工作台',
            workspace: '工作区',
            skipToContent: '跳转到内容',
            globalActions: '全局操作',
            virgoDesignProHome: 'Virgo Starter 首页',
            restoreNavigation: '恢复导航',
            virgoDesign: 'Virgo Design',
            virgoDesignPro: 'Virgo Starter',
            pro: 'Starter',
            pageBreadcrumb: '页面面包屑',
          },
          sidebar: {
            mainNavigation: '主导航',
            expand: '展开侧栏',
            collapse: '收起侧栏',
            closeNavigation: '关闭导航',
          },
          languageControl: {
            label: '语言',
            auto: '自动检测',
            chinese: '简体中文',
            english: 'English',
          },
          appearanceControl: {
            label: '外观',
            system: '跟随系统',
            light: '浅色',
            dark: '深色',
          },
          workplaceDescription: '你的工作区首页。',
          notFound: '找不到页面',
          routeError: '页面加载失败',
          back: '返回工作台',
        },
      },
    },
  });
}

export function restoreLocale() {
  void i18n.changeLanguage(resolveLocale(readLocale()));
}

export function useAppLocalePreference() {
  const [preference, setPreference] = useState(readLocale);

  function update(next: LocalePreference) {
    setPreference(next);
    writePreference(localeKey, next);
    void i18n.changeLanguage(resolveLocale(next));
  }

  return [preference, update] as const;
}
