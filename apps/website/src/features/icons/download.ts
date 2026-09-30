export function downloadIconSvg(id: string, source: string): void {
  const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }));
  try {
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${id}.svg`;
    document.body.append(anchor);
    try {
      anchor.click();
    } finally {
      anchor.remove();
    }
  } finally {
    // Leave the URL alive until the browser has queued the download.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
}
