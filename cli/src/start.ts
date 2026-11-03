import { spawn } from 'node:child_process';

export async function startProject(directory: string) {
  for (const script of ['install', 'dev']) {
    const completed = await runPnpm(script, directory);
    if (!completed) return;
  }
}

function runPnpm(script: string, cwd: string): Promise<boolean> {
  const entry = process.env.npm_execpath;
  const windows = process.platform === 'win32';
  const [command, ...args] =
    entry && /[\\/]pnpm\.[cm]?js$/i.test(entry)
      ? [process.execPath, entry, script]
      : windows
        ? ['cmd.exe', '/d', '/c', 'pnpm', script]
        : ['pnpm', script];

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit' });
    const interrupt = () => child.kill('SIGINT');
    process.on('SIGINT', interrupt);
    child.once('error', (error) => {
      process.off('SIGINT', interrupt);
      reject(error);
    });
    child.once('exit', (code, signal) => {
      process.off('SIGINT', interrupt);
      if (signal === 'SIGINT' || code === 130) resolve(false);
      else if (code === 0) resolve(true);
      else reject(new Error(`pnpm ${script} failed (${signal ?? `exit code ${code}`}).`));
    });
  });
}
