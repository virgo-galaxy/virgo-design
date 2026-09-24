import { useCallback, useRef } from 'react';

export type MenuEntry = { node: HTMLButtonElement; text: () => string };
export function useMenuCollection() {
  const entries = useRef(new Map<string, MenuEntry>());
  const register = useCallback((id: string, entry: MenuEntry) => {
    entries.current.set(id, entry);
    return () => {
      entries.current.delete(id);
    };
  }, []);
  const ordered = useCallback(
    () =>
      [...entries.current.values()]
        .filter(
          ({ node }) => node.isConnected && !node.hidden && !node.closest('[hidden], [inert]'),
        )
        .sort((a, b) =>
          a.node.compareDocumentPosition(b.node) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
        ),
    [],
  );
  return { register, ordered };
}
export type MenuCollection = ReturnType<typeof useMenuCollection>;
export type FocusIntent = 'first' | 'last' | 'none';
export function focusEntry(
  collection: MenuCollection,
  intent: FocusIntent,
  fallback: HTMLElement | null,
) {
  if (intent === 'none') return;
  const entries = collection.ordered();
  (intent === 'last' ? entries.at(-1)?.node : entries[0]?.node)?.focus({ preventScroll: true });
  if (!entries.length) fallback?.focus({ preventScroll: true });
}
export function moveEntry(collection: MenuCollection, key: string) {
  const entries = collection.ordered();
  const index = entries.findIndex(({ node }) => node === node.ownerDocument.activeElement);
  const next =
    key === 'Home'
      ? 0
      : key === 'End'
        ? entries.length - 1
        : key === 'ArrowDown'
          ? index + 1
          : index < 0
            ? entries.length - 1
            : index - 1;
  entries[(next + entries.length) % entries.length]?.node.focus({ preventScroll: true });
}
export function searchEntry(collection: MenuCollection, query: string) {
  const entries = collection.ordered();
  const index = entries.findIndex(({ node }) => node === node.ownerDocument.activeElement);
  const ordered = [...entries.slice(index + 1), ...entries.slice(0, index + 1)];
  ordered
    .find((item) => item.text().trim().toLocaleLowerCase().startsWith(query))
    ?.node.focus({ preventScroll: true });
}
