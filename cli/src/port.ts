export const defaultPort = 6300;

export function parsePort(value: string): number {
  const port = Number(value);
  if (!/^\d+$/.test(value) || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Enter a port number between 1 and 65535.');
  }
  return port;
}
