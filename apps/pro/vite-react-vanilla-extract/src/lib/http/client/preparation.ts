let prepare: (() => Promise<void>) | undefined;

export function setHttpPreparation(preparation?: () => Promise<void>): void {
  prepare = preparation;
}

export async function prepareHttpRequest(): Promise<void> {
  await prepare?.();
}
