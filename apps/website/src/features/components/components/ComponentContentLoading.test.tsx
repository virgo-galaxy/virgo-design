import '@/i18n/runtime';

import { act, render, screen } from '@testing-library/react';
import { lazy, type ReactNode, Suspense } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import { setAppLocale } from '@/i18n/runtime';

import { ComponentContentLoading } from './ComponentContentLoading';

afterEach(async () => {
  await setAppLocale('en-US');
});

describe('Component content loading', () => {
  it.each([
    ['en-US', 'Loading page…'],
    ['zh-CN', '页面加载中…'],
  ] as const)(
    'announces pending content in %s without rendering loading copy',
    async (locale, label) => {
      await setAppLocale(locale);
      let resolve!: (module: { default: () => ReactNode }) => void;
      const Content = lazy(
        () =>
          new Promise<{ default: () => ReactNode }>((done) => {
            resolve = done;
          }),
      );
      const { container } = render(
        <Suspense fallback={<ComponentContentLoading />}>
          <Content />
        </Suspense>,
      );
      const status = screen.getByRole('status');
      expect(status).toHaveAccessibleName(label);
      expect(status).toBeEmptyDOMElement();
      expect(status).toHaveAttribute('data-motion', 'spin');
      expect(screen.queryByRole('button')).toBeNull();
      await act(async () => {
        resolve({ default: () => <h1>Ready</h1> });
      });
      expect(screen.getByRole('heading', { name: 'Ready' })).toBeInTheDocument();
      expect(container.querySelector('[data-component-content-loading]')).toBeNull();
      expect(screen.queryByRole('status')).toBeNull();
    },
  );
});
