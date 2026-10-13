import {
  getInitialThemeScript,
  type InitialThemeScriptOptions,
} from '../packages/themes/src/bootstrap.ts';

/** Shared Vite integration; the bootstrap implementation remains in Themes. */
export function themeBootstrapPlugin(options: InitialThemeScriptOptions) {
  return {
    name: 'virgo-initial-theme',
    transformIndexHtml: {
      order: 'pre' as const,
      handler(html: string) {
        const script = `<script data-virgo-bootstrap>${getInitialThemeScript(options)}</script>`;
        // Keep the encoding declaration first; bootstrap still precedes CSS and app modules.
        const charset = /<meta\s+charset\s*=\s*[^>]+>/i;
        return charset.test(html)
          ? html.replace(charset, (meta) => `${meta}\n${script}`)
          : html.replace('<head>', `<head>\n${script}`);
      },
    },
  };
}
