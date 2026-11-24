import { type ComponentPropsWithoutRef, useEffect, useRef } from 'react';

import type { SourceLanguage } from './source-highlighter';

interface HighlightedCodeBlockProps extends Omit<
  ComponentPropsWithoutRef<'pre'>,
  'children' | 'dangerouslySetInnerHTML'
> {
  source: string;
  language: SourceLanguage;
  active?: boolean;
}

export function HighlightedCodeBlock({
  source,
  language,
  active = true,
  className,
  ...props
}: HighlightedCodeBlockProps) {
  const block = useRef<HTMLPreElement>(null);
  useEffect(() => {
    const element = block.current;
    if (!active || !element || typeof Worker === 'undefined') return;

    let stop: (() => void) | undefined;
    let current = true;
    void import('./source-highlighter').then(
      ({ sourceHighlighter }) => {
        if (current) {
          stop = sourceHighlighter.observeElement(element, { language, rootMargin: '128px' });
        }
      },
      () => {
        // Keep the original source visible if the runtime is unavailable.
      },
    );

    return () => {
      current = false;
      stop?.();
    };
  }, [active, language, source]);

  return (
    <pre
      {...props}
      ref={block}
      className={className ? `nsh ${className}` : 'nsh'}
      data-language={language}
    >
      {/* Each source gets its own code node so NSH can own its token markup. */}
      <code key={`${language}:${source}`} data-language={language}>
        {source}
      </code>
    </pre>
  );
}
