let prepare: (() => Promise<void>) | undefined;

/** Bootstrap may provide transport readiness without coupling HTTP to Mock. */
export function setHttpPreparation(preparation?: () => Promise<void>): void {
  prepare = preparation;
}

export async function prepareHttpRequest(): Promise<void> {
  await prepare?.();
}
