import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createElement, version } from 'react';
import { renderToString } from 'react-dom/server';
import { Button } from '@virgo-design/ui';
import { Button as PrimitiveButton } from '@virgo-design/primitives';
import { UserIcon } from '@virgo-design/icons';
import { Sparkline } from '@virgo-design/charts/sparkline';
import { createThemeRuntime } from '@virgo-design/themes';
import {
  getDefaultThemeTokens,
  validateThemeContract,
  THEME_CONTRACT_VERSION,
} from '@virgo-design/tokens';

const entries = JSON.parse(await readFile(new URL('./entries.json', import.meta.url), 'utf8'));
for (const name of entries)
  assert(Object.keys(await import(name)).length > 0, `Empty public entry: ${name}`);
assert.equal(createThemeRuntime().getTheme(), 'virgo');
assert(
  validateThemeContract({
    contractVersion: THEME_CONTRACT_VERSION,
    tokens: getDefaultThemeTokens(),
  }).valid,
);
const html = renderToString(
  createElement(
    'main',
    null,
    createElement(Button, { leadingIcon: createElement(UserIcon) }, 'Published UI'),
    createElement(PrimitiveButton, null, 'Published primitive'),
    createElement(Sparkline, {
      data: [{ day: 'Mon', value: 1 }],
      xKey: 'day',
      dataKey: 'value',
      title: 'Published chart',
      animated: false,
      interactive: false,
    }),
  ),
);
assert(
  html.includes('Published UI') && html.includes('Published primitive') && html.includes('<svg'),
);
console.log(
  `Imported ${entries.length} public JS entries and rendered React ${version} components without browser globals.`,
);
