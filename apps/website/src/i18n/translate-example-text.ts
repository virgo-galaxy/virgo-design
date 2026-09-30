import type { TFunction } from 'i18next';

import { enUS, zhCN } from './registry';

type Message = { key: string; text: string; pattern?: RegExp; variables: string[] };
const messagesByGroup = new Map<string, Message[]>();

// Resolve dynamic sample data at render time so changing language also updates existing feedback.
export function translateExampleText(t: TFunction, group: string, text: string): string {
  let messages = messagesByGroup.get(group);
  if (!messages) {
    messages = [enUS, zhCN].flatMap((locale) => {
      const resource = (
        locale.examples as Record<
          string,
          { copy?: Record<string, string>; details?: Record<string, string> }
        >
      )[group];
      return Object.entries(resource ?? {}).flatMap(([section, entries]) =>
        Object.entries(entries).map(([name, value]) => {
          const variables: string[] = [];
          const parts = value.split(/(\{\{\w+\}\})/g);
          const expression = parts
            .map((part) => {
              if (part.startsWith('{{')) {
                variables.push(part.slice(2, -2));
                return '(.+?)';
              }
              return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            })
            .join('');
          return {
            key: `examples.${group}.${section}.${name}`,
            text: value,
            variables,
            ...(variables.length ? { pattern: new RegExp('^' + expression + '$', 'i') } : {}),
          };
        }),
      );
    });
    messagesByGroup.set(group, messages);
  }
  const exact = messages.find((message) => message.text.toLowerCase() === text.toLowerCase());
  if (exact) return t(exact.key as never, { defaultValue: text });
  for (const message of messages) {
    const match = message.pattern?.exec(text);
    if (match)
      return t(message.key as never, {
        defaultValue: text,
        ...Object.fromEntries(
          message.variables.map((name, index) => [
            name,
            translateExampleText(t, group, match[index + 1]!),
          ]),
        ),
      });
  }
  return text;
}
