import { cancel, CANCEL_SYMBOL, intro } from '@clack/prompts';
import { beforeEach, expect, it, vi } from 'vitest';

import type { Template } from './generate.js';
import { resolveOptions } from './options.js';
import { directoryPrompt, goBack, portPrompt, select } from './prompts.js';

vi.mock('@clack/prompts', () => ({
  CANCEL_SYMBOL: Symbol('cancel'),
  cancel: vi.fn(),
  intro: vi.fn(),
  isCancel: (value: unknown) => typeof value === 'symbol',
}));
vi.mock('./prompts.js', () => ({
  directoryPrompt: vi.fn(),
  goBack: Symbol('go back'),
  portPrompt: vi.fn(),
  select: vi.fn(),
}));

const templates: Template[] = [
  { id: 'vite-react-scss-modules', framework: 'vite', style: 'scss-modules' },
  { id: 'vite-react-tailwind', framework: 'vite', style: 'tailwind' },
  { id: 'vite-react-vanilla-extract', framework: 'vite', style: 'vanilla-extract' },
  { id: 'next-scss-modules', framework: 'next', style: 'scss-modules' },
  { id: 'next-tailwind', framework: 'next', style: 'tailwind' },
  { id: 'next-vanilla-extract', framework: 'next', style: 'vanilla-extract' },
];

beforeEach(() => vi.resetAllMocks());

it('returns from the port to the previous styling choice and uses the updated template', async () => {
  vi.mocked(select)
    .mockResolvedValueOnce('pro')
    .mockResolvedValueOnce('next')
    .mockResolvedValueOnce('tailwind')
    .mockResolvedValueOnce('vanilla-extract')
    .mockResolvedValueOnce('no');
  vi.mocked(portPrompt).mockResolvedValueOnce(goBack).mockResolvedValueOnce('6310');
  expect(await resolveOptions({ target: '../my-pro', templates, interactive: true })).toEqual({
    target: '../my-pro',
    template: 'next-vanilla-extract',
    port: 6310,
  });
  expect(select).toHaveBeenNthCalledWith(
    4,
    expect.objectContaining({
      message: 'Styling',
      initialValue: 'tailwind',
      canGoBack: true,
    }),
  );
  expect(directoryPrompt).not.toHaveBeenCalled();
});

it('keeps the project path when returning to the directory prompt', async () => {
  vi.mocked(directoryPrompt)
    .mockResolvedValueOnce('../first-pro')
    .mockResolvedValueOnce('../second-pro');
  vi.mocked(select)
    .mockResolvedValueOnce(goBack)
    .mockResolvedValueOnce('pro')
    .mockResolvedValueOnce('vite')
    .mockResolvedValueOnce('tailwind')
    .mockResolvedValueOnce('no');
  expect(await resolveOptions({ templates, interactive: true, port: '6300' })).toEqual({
    target: '../second-pro',
    template: 'vite-react-tailwind',
    port: 6300,
  });
  expect(directoryPrompt).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({ initialValue: '../first-pro' }),
  );
});

it.each(templates)('selects $id from its framework and styling', async (template) => {
  vi.mocked(directoryPrompt).mockResolvedValueOnce('../my-pro');
  vi.mocked(portPrompt).mockResolvedValueOnce('');
  vi.mocked(select)
    .mockResolvedValueOnce('pro')
    .mockResolvedValueOnce(template.framework)
    .mockResolvedValueOnce(template.style)
    .mockResolvedValueOnce('no');
  expect(await resolveOptions({ templates, interactive: true })).toEqual({
    target: '../my-pro',
    template: template.id,
    port: 6300,
  });
  expect(vi.mocked(select).mock.calls[2]?.[0].options).toHaveLength(3);
});

it('uses complete flags without opening prompts, including outside a terminal', async () => {
  expect(
    await resolveOptions({
      templates,
      interactive: false,
      target: '../my-pro',
      template: 'next-vanilla-extract',
    }),
  ).toEqual({ target: '../my-pro', template: 'next-vanilla-extract', port: 6300 });
  expect(intro).not.toHaveBeenCalled();
  expect(select).not.toHaveBeenCalled();
  expect(directoryPrompt).not.toHaveBeenCalled();
});

it('only asks for missing options', async () => {
  vi.mocked(directoryPrompt).mockResolvedValueOnce('../my-pro');
  vi.mocked(select).mockResolvedValueOnce('no');
  expect(
    await resolveOptions({ templates, interactive: true, template: 'next-tailwind', port: '6310' }),
  ).toEqual({ target: '../my-pro', template: 'next-tailwind', port: 6310 });
  expect(select).toHaveBeenCalledOnce();
  vi.mocked(select)
    .mockResolvedValueOnce('pro')
    .mockResolvedValueOnce('vite')
    .mockResolvedValueOnce('scss-modules')
    .mockResolvedValueOnce('no');
  vi.mocked(portPrompt).mockResolvedValueOnce('6311');
  expect(await resolveOptions({ templates, interactive: true, target: '../another-pro' })).toEqual({
    target: '../another-pro',
    template: 'vite-react-scss-modules',
    port: 6311,
  });
  expect(directoryPrompt).toHaveBeenCalledOnce();
  expect(portPrompt).toHaveBeenCalledOnce();
});

it('accepts the default directory and validates typed names', async () => {
  vi.mocked(directoryPrompt).mockResolvedValueOnce('./virgo-app');
  await resolveOptions({
    templates,
    interactive: true,
    template: 'vite-react-tailwind',
    port: '6300',
  });
  const validate = vi.mocked(directoryPrompt).mock.calls[0]?.[0].validate;
  expect(vi.mocked(directoryPrompt).mock.calls[0]?.[0].defaultValue).toBe('./virgo-app');
  if (typeof validate !== 'function') throw new Error('Directory validation was not configured.');
  expect(await validate('')).toBeUndefined();
  expect(await validate('../my-pro')).toBeUndefined();
  expect(await validate('   ')).toBe('Enter a project directory.');
  expect(await validate('Bad Name')).toContain('project directory name');
});

it('can cancel at the port prompt without generating a project', async () => {
  vi.mocked(portPrompt).mockResolvedValueOnce(CANCEL_SYMBOL);
  expect(
    await resolveOptions({
      templates,
      interactive: true,
      target: '../my-pro',
      template: 'next-tailwind',
    }),
  ).toBeUndefined();
  expect(cancel).toHaveBeenCalledOnce();
});

it.each(['0', '65536', '1.5', '1e3', 'abc', ''])(
  'rejects invalid explicit port %j',
  async (port) => {
    await expect(
      resolveOptions({
        templates,
        interactive: false,
        target: '../my-pro',
        template: 'next-tailwind',
        port,
      }),
    ).rejects.toThrow('between 1 and 65535');
  },
);

it.each([0, 1, 2])('cancels prompt %i without returning generation options', async (stage) => {
  vi.mocked(directoryPrompt).mockResolvedValueOnce(stage === 0 ? CANCEL_SYMBOL : '../my-pro');
  vi.mocked(select)
    .mockResolvedValueOnce(stage === 1 ? CANCEL_SYMBOL : 'pro')
    .mockResolvedValueOnce(CANCEL_SYMBOL);
  expect(await resolveOptions({ templates, interactive: true })).toBeUndefined();
  expect(cancel).toHaveBeenCalledOnce();
  expect(select).toHaveBeenCalledTimes(stage);
});

it('rejects missing non-interactive options and invalid explicit values before prompting', async () => {
  await expect(resolveOptions({ templates, interactive: false })).rejects.toThrow(
    'non-interactive',
  );
  await expect(
    resolveOptions({ templates, interactive: true, template: '../../unknown' }),
  ).rejects.toThrow('Unknown template');
  await expect(
    resolveOptions({ templates, interactive: true, target: '../Bad Name' }),
  ).rejects.toThrow('project directory name');
  expect(intro).not.toHaveBeenCalled();
});

it.each(['minimal', 'starter'] as const)(
  'previews %s without asking to start or returning a generation request',
  async (tier) => {
    vi.mocked(select)
      .mockResolvedValueOnce(tier)
      .mockResolvedValueOnce('vite')
      .mockResolvedValueOnce('tailwind');
    vi.mocked(portPrompt).mockResolvedValueOnce('6300');
    expect(await resolveOptions({ templates, interactive: true, target: './virgo-app' })).toEqual({
      kind: 'preview',
      tier,
    });
    expect(select).toHaveBeenCalledTimes(3);
  },
);

it('requires an explicit Yes to install and start', async () => {
  vi.mocked(select).mockResolvedValueOnce('yes');
  expect(
    await resolveOptions({
      templates,
      interactive: true,
      target: './virgo-app',
      template: 'next-tailwind',
      port: '6300',
    }),
  ).toEqual({ target: './virgo-app', template: 'next-tailwind', port: 6300, autoStart: true });
  expect(select).toHaveBeenCalledWith(expect.objectContaining({ initialValue: 'no' }));
});
