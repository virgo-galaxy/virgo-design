import { readFileSync } from 'node:fs';

import { describe, expect, it } from 'vitest';

import { themeBootstrapPlugin } from './theme-bootstrap-plugin';

describe('consumer first-paint integration', () => {
  it.each(['apps/website/index.html', 'apps/pro/vite-react-scss-modules/index.html'])(
    '%s runs bootstrap after charset and before app modules',
    (filename) => {
      const input = readFileSync(filename, 'utf8');
      const output = themeBootstrapPlugin({}).transformIndexHtml.handler(input);
      const charset = output.indexOf('<meta charset='),
        bootstrap = output.indexOf('<script data-virgo-bootstrap>'),
        application = output.indexOf('<script type="module"');
      expect(charset).toBeLessThan(bootstrap);
      expect(bootstrap).toBeLessThan(application);
      expect(output.match(/data-virgo-bootstrap/g) ?? []).toHaveLength(1);
    },
  );
});
