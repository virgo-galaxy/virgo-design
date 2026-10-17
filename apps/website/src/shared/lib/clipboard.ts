export const copyTextToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  textarea.style.pointerEvents = 'none';

  document.body.appendChild(textarea);
  let copied: boolean;

  try {
    textarea.select();
    copied = document.execCommand('copy');
  } finally {
    textarea.remove();
  }

  if (!copied) {
    throw new Error('Unable to copy text to clipboard');
  }
};
