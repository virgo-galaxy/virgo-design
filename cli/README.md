# Virgo Create

Generate a standalone Virgo Design application with Vite + React or Next.js App Router.
Use Node.js 24.14 or newer in the Node.js 24 release line and pnpm 11.9 or newer in the pnpm 11 release line.

## Create a project

Run the interactive generator from the directory where you want to create your project.

```sh
pnpm create @virgo-design
```

Choose a project directory, tier, framework, styling and development port. The defaults for the
directory and port are `./virgo-app` and `6300`. Use Enter to accept a default, Tab to fill it for
editing, Esc to go back, or Ctrl+C to cancel. You can let the CLI install dependencies and start
the dev server, or run the commands it prints.

To generate a project in one command, provide a directory and template ID. In a non-interactive
terminal the CLI uses these arguments without prompting. In an interactive terminal, you can
provide some arguments and answer the remaining prompts.

```sh
pnpm create @virgo-design ./virgo-app --template starter-next-tailwind --port 6310
cd virgo-app
pnpm install
pnpm dev
```

The destination must be new or empty. The directory name becomes the package name.

### Other ways to run

Run the npm package directly with pnpm:

```sh
pnpm dlx @virgo-design/create@latest
```

For repeated use, install once and run `create-virgo` directly:

```sh
npm install -g @virgo-design/create
create-virgo
create-virgo ./virgo-app --template starter-next-tailwind --port 6310
```

## Templates

- **Minimal** starts with a Hello Virgo page and an interactive counter.
- **Starter** starts with the Virgo application shell, a Workplace page, and language and appearance controls.
- **Pro** includes the complete reference application and its demo data.

Each tier supports all six variants. Prefix the variant ID with `minimal-`, `starter-`, or
`pro-` to select the tier, such as `pro-next-tailwind`.

| Variant ID                   | Framework          | Styling         |
| ---------------------------- | ------------------ | --------------- |
| `vite-react-tailwind`        | Vite + React       | Tailwind CSS    |
| `vite-react-scss-modules`    | Vite + React       | SCSS Modules    |
| `vite-react-vanilla-extract` | Vite + React       | vanilla-extract |
| `next-tailwind`              | Next.js App Router | Tailwind CSS    |
| `next-scss-modules`          | Next.js App Router | SCSS Modules    |
| `next-vanilla-extract`       | Next.js App Router | vanilla-extract |

List all template IDs with `pnpm create @virgo-design --help` or `create-virgo --help` after installation.
Use `--list` to print only the IDs, one per line.

## Develop in the repository

```sh
pnpm build:cli
pnpm create:pro
pnpm --filter @virgo-design/create test
pnpm check:cli --variant next-tailwind --startup
```

Edit Pro templates in `apps/pro`, Minimal templates in `cli/source/minimal`, and Starter templates
in `cli/source/starter`. The build writes bundled templates under `cli/templates` and uses the
published Virgo versions from `cli/config/library-versions.json`.

`pnpm check:cli` installs the CLI archive outside the workspace and verifies the generated projects.
Use `--template` to select one template, `--tier` for one tier, or `--variant` for a variant across
all three tiers. Use `--startup` to also check the production server.

## License

[MIT](LICENSE).
