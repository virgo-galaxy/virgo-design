// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { initialProfile } from '@/mock/fixtures/profile';
import { projects } from '@/mock/fixtures/projects';
import { initialTaskState } from '@/mock/fixtures/tasks';
import { sampleSuccess } from '@/mock/fixtures/workflows';

import { getPageLabel } from '../app/navigation-labels';
import { emptyDataQuery, queryError } from '../data/data-query';
import { validateProfile } from '../data/pro-workflows';
import { taskDraft, taskPriorities, taskStatuses } from '../data/tasks';
import { formatDueDate } from '../data/workplace';
import { getTaskPriorityLabel, getTaskStatusLabel } from '../pages/tasks/task-presentation';
import { getLocaleFontFamily, normalizeAppLocale, resolveAppLocale } from './locale';
import {
  getLocalePreference,
  i18nInstance,
  localeStorageKey,
  setAppLocale,
  setAppLocalePreference,
} from './runtime';
import { useAppLocale, useAppLocalePreference } from './use-app-locale';

afterEach(async () => {
  cleanup();
  vi.restoreAllMocks();
  await setAppLocale('en-US');
  window.localStorage.clear();
});

function LocalePreview() {
  const { t } = useTranslation();
  const locale = useAppLocale();
  return (
    <>
      <button onClick={() => void setAppLocale(locale === 'en-US' ? 'zh-CN' : 'en-US')}>
        {t('settings.language')}
      </button>
      <h1>{getPageLabel(t, 'tasks')}</h1>
      <p>{getTaskStatusLabel(t, 'in_progress')}</p>
      <p>{formatDueDate('2026-10-01', locale)}</p>
    </>
  );
}
function PreferencePreview() {
  return <output>{useAppLocalePreference()}</output>;
}

describe('pro locale runtime', () => {
  it('detects the first supported browser language and falls back to English', () => {
    expect(resolveAppLocale('auto', ['fr-FR', 'zh-TW', 'en-US'])).toBe('zh-CN');
    expect(resolveAppLocale('auto', ['en-GB', 'zh-CN'])).toBe('en-US');
    expect(resolveAppLocale('auto', ['ja-JP'])).toBe('en-US');
    expect(resolveAppLocale('en-US', ['zh-CN'])).toBe('en-US');
  });
  it('tracks automatic preference even when its resolved language is unchanged', async () => {
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['en-US']);
    await setAppLocale('en-US');
    render(<PreferencePreview />);
    await act(async () => {
      await setAppLocalePreference('auto');
    });
    expect(screen.getByRole('status').textContent).toBe('auto');
    expect(i18nInstance.resolvedLanguage).toBe('en-US');
    expect(window.localStorage.getItem(localeStorageKey)).toBe('auto');
    vi.spyOn(window.navigator, 'languages', 'get').mockReturnValue(['zh-CN']);
    await act(async () => {
      window.dispatchEvent(new Event('languagechange'));
    });
    expect(i18nInstance.resolvedLanguage).toBe('zh-CN');
    await act(async () => {
      await setAppLocale('en-US');
    });
    await act(async () => {
      window.dispatchEvent(new Event('languagechange'));
    });
    expect(i18nInstance.resolvedLanguage).toBe('en-US');
    expect(getLocalePreference()).toBe('en-US');
  });
  it('updates mounted consumers, document language, font and persisted preference together', async () => {
    await setAppLocale('en-US');
    render(
      <I18nextProvider i18n={i18nInstance}>
        <LocalePreview />
      </I18nextProvider>,
    );
    expect(screen.getByRole('heading').textContent).toBe('Tasks');
    expect(screen.getByText('In Progress')).toBeTruthy();
    await act(async () => fireEvent.click(screen.getByRole('button', { name: 'Language' })));
    expect(screen.getByRole('heading').textContent).toBe('任务');
    expect(screen.getByText('进行中')).toBeTruthy();
    expect(screen.getByText('10月1日')).toBeTruthy();
    expect(document.documentElement.lang).toBe('zh-CN');
    expect(document.documentElement.style.getPropertyValue('--app-font-family')).toBe(
      getLocaleFontFamily('zh-CN'),
    );
    expect(window.localStorage.getItem(localeStorageKey)).toBe('zh-CN');
    await act(async () => fireEvent.click(screen.getByRole('button', { name: '语言' })));
    expect(screen.getByRole('heading').textContent).toBe('Tasks');
  });

  it('keeps domain values and validation codes stable while displaying translated feedback', async () => {
    const draft = taskDraft(initialTaskState.tasks[0]!);
    expect(draft).toMatchObject({ status: 'todo', priority: 'urgent' });
    const english = i18nInstance.getFixedT('en-US');
    expect(taskStatuses.map((code) => getTaskStatusLabel(english, code))).toEqual([
      'Backlog',
      'Todo',
      'In Progress',
      'In Review',
      'Done',
    ]);
    expect(taskPriorities.map((code) => getTaskPriorityLabel(english, code))).toEqual([
      'Low',
      'Medium',
      'High',
      'Urgent',
    ]);
    const errors = validateProfile({ ...initialProfile, name: '' }, projects);
    const error = queryError({ ...emptyDataQuery, minimumHours: '-1' });
    expect(errors.name).toBe('nameInvalid');
    expect(error).toBe('invalidEstimate');
    if (!error) throw new Error('Expected a validation error');
    await setAppLocale('zh-CN');
    expect(taskStatuses.map((code) => getTaskStatusLabel(i18nInstance.t, code))).toEqual([
      '待规划',
      '待办',
      '进行中',
      '待评审',
      '已完成',
    ]);
    expect(taskPriorities.map((code) => getTaskPriorityLabel(i18nInstance.t, code))).toEqual([
      '低',
      '中',
      '高',
      '紧急',
    ]);
    expect(i18nInstance.t(`profile.validation.${errors.name!}`)).toContain('显示名称');
    expect(i18nInstance.t(`data.validation.${error}`)).toContain('整数');
    expect(i18nInstance.t(`results.receipts.${sampleSuccess.message}.title`)).toBe(
      '工作请求已受理',
    );
    expect(taskDraft(initialTaskState.tasks[0]!)).toEqual(draft);
  });

  it('switches even when browser storage is unavailable and falls back to English for unknown locales', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });
    await expect(setAppLocale('zh-CN')).resolves.toBeDefined();
    expect(i18nInstance.resolvedLanguage).toBe('zh-CN');
    expect(normalizeAppLocale('fr')).toBe('en-US');
    expect(normalizeAppLocale(undefined)).toBe('en-US');
    expect(i18nInstance.t('tasks.matchedCount', { count: 0 })).toBe('匹配到 0 个任务');
  });
});
