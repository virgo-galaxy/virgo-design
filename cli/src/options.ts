import { cancel, intro, isCancel } from '@clack/prompts';

import { projectName, type Template } from './generate.js';
import { defaultPort, parsePort } from './port.js';
import { directoryPrompt, goBack, portPrompt, select } from './prompts.js';

const defaultDirectory = './virgo-pro';
const frameworkLabels = { vite: 'Vite + React', next: 'Next.js App Router' };
const styleLabels = {
  'scss-modules': 'SCSS Modules',
  tailwind: 'Tailwind CSS',
  'vanilla-extract': 'vanilla-extract',
};

function cancelled(value: unknown): value is symbol {
  if (!isCancel(value)) return false;
  cancel('Project creation cancelled.');
  return true;
}

export async function resolveOptions({
  target,
  template,
  port,
  templates,
  interactive,
}: {
  target?: string | undefined;
  template?: string | undefined;
  port?: string | undefined;
  templates: Template[];
  interactive: boolean;
}): Promise<{ target: string; template: string; port: number } | undefined> {
  const selectedPort = port === undefined ? undefined : parsePort(port.trim());
  if (template && !templates.some((entry) => entry.id === template)) {
    throw new Error(
      `Unknown template: ${template}. Available: ${templates.map((entry) => entry.id).join(', ')}`,
    );
  }
  if (target) projectName(target);
  if (target && template && (!interactive || selectedPort !== undefined)) {
    return { target, template, port: selectedPort ?? defaultPort };
  }
  if (!interactive) {
    throw new Error(
      'Specify a project directory and --template in a non-interactive terminal. Use --help to list templates.',
    );
  }
  intro('Virgo Design Pro');
  const steps = [
    ...(!target ? (['directory'] as const) : []),
    ...(!template ? (['framework', 'styling'] as const) : []),
    ...(selectedPort === undefined ? (['port'] as const) : []),
  ];
  const frameworks = [...new Set(templates.map((entry) => entry.framework))];
  let framework: Template['framework'] | undefined;
  let style: Template['style'] = 'tailwind';
  let developmentPort = selectedPort ?? defaultPort;

  for (let index = 0; index < steps.length; index++) {
    const canGoBack = index > 0;
    switch (steps[index]) {
      case 'directory': {
        const directory = await directoryPrompt({
          message: 'Project directory',
          defaultValue: defaultDirectory,
          ...(target === undefined ? {} : { initialValue: target }),
          validate(value) {
            if (value && !value.trim()) return 'Enter a project directory.';
            try {
              projectName(value?.trim() || defaultDirectory);
            } catch (error) {
              return error instanceof Error ? error.message : String(error);
            }
          },
        });
        if (directory === goBack || cancelled(directory) || directory === undefined) return;
        target = directory.trim() || defaultDirectory;
        break;
      }
      case 'framework': {
        const choice = await select<Template['framework']>({
          message: 'Framework',
          options: frameworks.map((value) => ({ value, label: frameworkLabels[value] })),
          ...(framework === undefined ? {} : { initialValue: framework }),
          canGoBack,
        });
        if (choice === goBack) {
          index -= 2;
          break;
        }
        if (cancelled(choice) || choice === undefined) return;
        framework = choice;
        break;
      }
      case 'styling': {
        const candidates = templates.filter((entry) => entry.framework === framework);
        const choice: Awaited<ReturnType<typeof select<Template['style']>>> = await select({
          message: 'Styling',
          initialValue: style,
          options: candidates.map((entry) => ({
            value: entry.style,
            label: styleLabels[entry.style],
          })),
          canGoBack,
        });
        if (choice === goBack) {
          index -= 2;
          break;
        }
        if (cancelled(choice) || choice === undefined) return;
        const selected = candidates.find((entry) => entry.style === choice);
        if (!selected) throw new Error('No template matches this framework and styling selection.');
        style = choice;
        template = selected.id;
        break;
      }
      case 'port': {
        const input = await portPrompt(
          String(defaultPort),
          (value) => {
            try {
              parsePort(value?.trim() || String(defaultPort));
            } catch (error) {
              return error instanceof Error ? error.message : String(error);
            }
          },
          canGoBack,
        );
        if (input === goBack) {
          index -= 2;
          break;
        }
        if (cancelled(input)) return;
        developmentPort = parsePort(input?.trim() || String(defaultPort));
        break;
      }
    }
  }
  if (!target || !template) throw new Error('Project directory and template are required.');
  return { target, template, port: developmentPort };
}
