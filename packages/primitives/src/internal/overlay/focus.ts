export function returnFocus(
  trigger: HTMLElement | null,
  content: HTMLElement | null,
  force = false,
) {
  const doc = trigger?.ownerDocument;
  if (
    trigger?.isConnected &&
    doc &&
    (force || content?.contains(doc.activeElement) || doc.activeElement === doc.body)
  )
    trigger.focus({ preventScroll: true });
}

export function getTabbables(content: HTMLElement) {
  return Array.from(
    content.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex], [contenteditable="true"]',
    ),
  ).filter((node) => {
    if (
      node.tabIndex < 0 ||
      node.matches(':disabled, input[type="hidden"]') ||
      node.closest('[hidden], [inert]') ||
      getComputedStyle(node).visibility === 'hidden'
    )
      return false;
    for (let ancestor: HTMLElement | null = node; ancestor; ancestor = ancestor.parentElement) {
      if (getComputedStyle(ancestor).display === 'none') return false;
      if (ancestor === content) break;
    }
    return true;
  });
}

export function focusFirst(content: HTMLElement | null) {
  if (!content) return;
  (getTabbables(content)[0] ?? content).focus({ preventScroll: true });
}
