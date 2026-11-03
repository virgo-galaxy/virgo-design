import { cancel, intro, isCancel } from '@clack/prompts';

import { projectName, type Template } from './generate.js';
import { defaultPort, parsePort } from './port.js';
import { directoryPrompt, goBack, portPrompt, select } from './prompts.js';

export const defaultDirectory = './virgo-app';
export const tiers = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'starter', label: 'Starter' },
  { value: 'pro', label: 'Pro' },
] as const;
type Tier = (typeof tiers)[number]['value'];
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
}): Promise<
  | { kind: 'preview'; tier: Exclude<Tier, 'pro'> }
  | { target: string; template: string; port: number; autoStart?: true }
  | undefined
> {
  const selectedPort = port === undefined ? undefined : parsePort(port.trim());
  if (template && !templates.some((entry) => entry.id === template)) {
    throw new Error(
      `Unknown template: ${template}. Available: ${templates.map((entry) => entry.id).join(', ')}`,
    );
  }
  if (target) projectName(target);
  if (target && template && !interactive) {
    return { target, template, port: selectedPort ?? defaultPort };
  }
  if (!interactive) {
    throw new Error(
      'Specify a project directory and --template in a non-interactive terminal. Use --help to list templates.',
    );
  }
  intro('Virgo Create');
  const steps = [
    ...(!target ? (['directory'] as const) : []),
    ...(!template ? (['tier', 'framework', 'styling'] as const) : []),
    ...(selectedPort === undefined ? (['port'] as const) : []),
    'start' as const,
  ];
  let tier: Tier = 'pro';
  const proTemplates = templates.filter((entry) => entry.tier === 'pro');
  const starterTemplates = templates.filter((entry) => entry.tier === 'starter');
  const availableTemplates = () =>
    tier === 'starter' && starterTemplates.length ? starterTemplates : proTemplates;
  let framework: Template['framework'] | undefined;
  let style: Template['style'] = 'tailwind';
  let developmentPort = selectedPort ?? defaultPort;
  let portInput: string | undefined;

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
        const frameworks = [...new Set(availableTemplates().map((entry) => entry.framework))];
        const choice = await select<Template['framework']>({
          message: 'Framework',
          options: frameworks.map((value) => ({ value, label: frameworkLabels[value] })),
          ...(framework && frameworks.includes(framework) ? { initialValue: framework } : {}),
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
      case 'tier': {
        const choice: Awaited<ReturnType<typeof select<Tier>>> = await select({
          message: 'Template',
          options: [...tiers],
          initialValue: tier,
          canGoBack,
        });
        if (choice === goBack) {
          index -= 2;
          break;
        }
        if (cancelled(choice) || choice === undefined) return;
        tier = choice;
        break;
      }
      case 'styling': {
        const candidates = availableTemplates().filter((entry) => entry.framework === framework);
        const choice: Awaited<ReturnType<typeof select<Template['style']>>> = await select({
          message: 'Styling',
          initialValue: candidates.some((entry) => entry.style === style)
            ? style
            : (candidates[0]?.style ?? 'tailwind'),
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
          portInput,
        );
        if (input === goBack) {
          index -= 2;
          break;
        }
        if (cancelled(input)) return;
        developmentPort = parsePort(input?.trim() || String(defaultPort));
        portInput = input;
        break;
      }
      case 'start': {
        if (tier === 'starter' && !starterTemplates.length) return { kind: 'preview', tier };
        const selectedTemplate =
          tier === 'minimal'
            ? templates.find(
                (entry) =>
                  entry.tier === 'minimal' &&
                  entry.framework === framework &&
                  entry.style === style,
              )?.id
            : template;
        if (!selectedTemplate && tier === 'minimal') return { kind: 'preview', tier };
        const choice = await select({
          message: 'Install dependencies and start the dev server?',
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          initialValue: 'no',
          canGoBack,
        });
        if (choice === goBack) {
          index -= 2;
          break;
        }
        if (cancelled(choice) || choice === undefined) return;
        if (!target || !selectedTemplate)
          throw new Error('Project directory and template are required.');
        return {
          target,
          template: selectedTemplate,
          port: developmentPort,
          ...(choice === 'yes' ? { autoStart: true } : {}),
        };
      }
    }
  }
  throw new Error('Project setup did not finish.');
}
