export const templateTiers = ['minimal', 'starter', 'pro'] as const;
export const templateFrameworks = ['vite-react', 'next'] as const;
export const templateStyles = ['tailwind', 'scss-modules', 'vanilla-extract'] as const;

export type TemplateTier = (typeof templateTiers)[number];
export type TemplateFramework = (typeof templateFrameworks)[number];
export type TemplateStyle = (typeof templateStyles)[number];

export function createProjectCommand(
  tier: TemplateTier,
  framework: TemplateFramework,
  styling: TemplateStyle,
) {
  return `pnpm create @virgo-design ./virgo-app --template ${tier}-${framework}-${styling}`;
}

export const repositoryUrl = 'https://github.com/virgo-galaxy/virgo-design';
