import { cancel, intro, isCancel, select, text } from '@clack/prompts';

import { projectName, type Template } from './generate.js';

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
  templates,
  interactive,
}: {
  target?: string | undefined;
  template?: string | undefined;
  templates: Template[];
  interactive: boolean;
}): Promise<{ target: string; template: string } | undefined> {
  if (template && !templates.some((entry) => entry.id === template)) {
    throw new Error(
      `Unknown template: ${template}. Available: ${templates.map((entry) => entry.id).join(', ')}`,
    );
  }
  if (target) projectName(target);
  if (target && template) return { target, template };
  if (!interactive) {
    throw new Error(
      'Specify a project directory and --template in a non-interactive terminal. Use --help to list templates.',
    );
  }
  intro('Virgo Design Pro');
  if (!target) {
    const directory = await text({
      message: 'Project directory',
      placeholder: './my-pro',
      defaultValue: './my-pro',
      validate(value) {
        if (value && !value.trim()) return 'Enter a project directory.';
        try {
          projectName(value?.trim() || './my-pro');
        } catch (error) {
          return error instanceof Error ? error.message : String(error);
        }
      },
    });
    if (cancelled(directory)) return;
    target = directory.trim();
  }
  if (!template) {
    const frameworks = [...new Set(templates.map((entry) => entry.framework))];
    const framework = await select({
      message: 'Framework',
      options: frameworks.map((value) => ({ value, label: frameworkLabels[value] })),
    });
    if (cancelled(framework)) return;
    const candidates = templates.filter((entry) => entry.framework === framework);
    const style = await select({
      message: 'Styling',
      initialValue: 'tailwind',
      options: candidates.map((entry) => ({
        value: entry.style,
        label: styleLabels[entry.style],
        hint: `port ${entry.port}`,
      })),
    });
    if (cancelled(style)) return;
    const selected = candidates.find((entry) => entry.style === style);
    if (!selected) throw new Error('No template matches this framework and styling selection.');
    template = selected.id;
  }
  return { target, template };
}
