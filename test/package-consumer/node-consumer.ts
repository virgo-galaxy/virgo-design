import { UserIcon } from '@virgo-design/icons';
import { createThemeRuntime } from '@virgo-design/themes';
import { tokenVars } from '@virgo-design/tokens';
import { Button } from '@virgo-design/ui';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

renderToString(createElement(Button, { children: createElement(UserIcon) }));
createThemeRuntime().getTheme();
const color: string = tokenVars['--vd-text-primary'];
void color;
