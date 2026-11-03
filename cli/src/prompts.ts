import { styleText } from 'node:util';

import { type CANCEL_SYMBOL, Prompt, SelectPrompt } from '@clack/core';
import {
  S_BAR,
  S_BAR_END,
  S_RADIO_ACTIVE,
  S_RADIO_INACTIVE,
  SELECT_INSTRUCTIONS,
  symbol,
  symbolBar,
} from '@clack/prompts';

export const goBack = Symbol('go back');

async function withBack<Value>(
  prompt: Prompt<Value>,
  enabled: boolean,
  onBack: () => void,
): Promise<Value | typeof goBack | typeof CANCEL_SYMBOL | undefined> {
  let back = false;
  if (enabled)
    prompt.on('key', (_character, key) => {
      back = key.name === 'escape';
      if (back) onBack();
    });
  const result = await prompt.prompt();
  return back ? goBack : result;
}

export function select<Value extends string>({
  message,
  options,
  initialValue,
  canGoBack = false,
}: {
  message: string;
  options: { value: Value; label: string }[];
  initialValue?: Value;
  canGoBack?: boolean;
}) {
  let back = false;
  const prompt = new SelectPrompt({
    options,
    ...(initialValue === undefined ? {} : { initialValue }),
    render() {
      const heading = `${S_BAR}\n${symbol(this.state)}  ${message}`;
      if (back && this.state === 'cancel') return `${S_BAR}\n${S_BAR}  ↶ Back`;
      const bar = symbolBar(this.state);
      const label = this.options[this.cursor]?.label ?? '';
      if (this.state === 'submit') return `${heading}\n${bar}  ${styleText('green', '✓')} ${label}`;
      if (this.state === 'cancel') return `${heading}\n${bar}  ${styleText('dim', label)}`;
      const choices = this.options.map((option, index) =>
        index === this.cursor
          ? `${bar}  ${styleText('green', S_RADIO_ACTIVE)} ${option.label}`
          : `${bar}  ${styleText('dim', `${S_RADIO_INACTIVE} ${option.label}`)}`,
      );
      return [
        heading,
        ...choices,
        `${bar}  ${styleText('dim', [...SELECT_INSTRUCTIONS, ...(canGoBack ? ['Esc to go back'] : [])].join(' · '))}`,
        S_BAR_END,
        '',
      ].join('\n');
    },
  });
  return withBack(prompt, canGoBack, () => {
    back = true;
  });
}

export function directoryPrompt(options: Omit<InputOptions, 'canGoBack' | 'checkOnSubmit'>) {
  return inputPrompt({ ...options, checkOnSubmit: true });
}

export function portPrompt(
  defaultValue: string,
  validate: (value?: string) => string | undefined,
  canGoBack = false,
  initialValue?: string,
) {
  return inputPrompt({
    message: 'Development port',
    defaultValue,
    validate,
    canGoBack,
    ...(initialValue === undefined ? {} : { initialValue }),
  });
}

interface InputOptions {
  message: string;
  defaultValue: string;
  initialValue?: string;
  validate: (value?: string) => string | undefined;
  canGoBack?: boolean;
  checkOnSubmit?: boolean;
}

function inputPrompt({
  message,
  defaultValue,
  initialValue = '',
  validate,
  canGoBack = false,
  checkOnSubmit = false,
}: InputOptions) {
  let cursor = [...initialValue].length;
  let back = false;
  const prompt = new Prompt<string>(
    {
      validate,
      render() {
        const heading = `${S_BAR}\n${symbol(this.state)}  ${message}`;
        if (back && this.state === 'cancel') return `${S_BAR}\n${S_BAR}  ↶ Back`;
        const bar = symbolBar(this.state);
        if (this.state === 'submit' || this.state === 'cancel') {
          const check =
            this.state === 'submit' && checkOnSubmit ? `${styleText('green', '✓')} ` : '';
          return `${heading}\n${bar}  ${check}${styleText('dim', this.value ?? '')}`;
        }
        const characters = [...this.userInput];
        const character = characters[cursor];
        const input = this.userInput
          ? characters.slice(0, cursor).join('') +
            (character ? styleText('inverse', character) : '█') +
            characters.slice(cursor + 1).join('')
          : styleText('dim', defaultValue);
        const hint =
          this.state === 'error'
            ? styleText('yellow', this.error)
            : styleText(
                'dim',
                `Tab to fill default${canGoBack ? ' · Esc to go back' : ''} · Enter to confirm`,
              );
        return `${heading}\n${bar}  ${input}\n${bar}  ${hint}\n${S_BAR_END}\n`;
      },
    },
    false,
  );
  prompt.userInput = initialValue;
  prompt.value = initialValue;
  prompt.on('key', (character, key) => {
    const value = [...prompt.userInput];
    if (key.name === 'tab') {
      if (value.length === 0) {
        value.push(...defaultValue);
        cursor = value.length;
      }
    } else if (key.name === 'left') cursor = Math.max(0, cursor - 1);
    else if (key.name === 'right') cursor = Math.min(value.length, cursor + 1);
    else if (key.name === 'home' || (key.ctrl && key.name === 'a')) cursor = 0;
    else if (key.name === 'end' || (key.ctrl && key.name === 'e')) cursor = value.length;
    else if (key.name === 'backspace' || character === '\x7f') {
      if (cursor > 0) {
        value.splice(--cursor, 1);
      }
    } else if (key.name === 'delete') value.splice(cursor, 1);
    else if (key.ctrl && key.name === 'u') {
      value.length = 0;
      cursor = 0;
    } else if (character && !key.ctrl && !key.meta && /^[^\p{Cc}]+$/u.test(character)) {
      const inserted = [...character];
      value.splice(cursor, 0, ...inserted);
      cursor += inserted.length;
    }
    prompt.userInput = value.join('');
    prompt.value = prompt.userInput;
  });
  prompt.on('finalize', () => {
    if (prompt.state === 'submit' && !prompt.value?.trim()) prompt.value = defaultValue;
  });
  return withBack(prompt, canGoBack, () => {
    back = true;
  });
}
