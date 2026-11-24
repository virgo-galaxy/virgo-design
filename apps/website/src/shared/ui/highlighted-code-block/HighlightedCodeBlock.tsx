import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';

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
  const [highlighted, setHighlighted] = useState<{
    source: string;
    language: SourceLanguage;
    markup: string;
  }>();
  const markup =
    highlighted?.source === source && highlighted.language === language
      ? highlighted.markup
      : undefined;

  useEffect(() => {
    if (!active || markup !== undefined || typeof Worker === 'undefined') return;

    let current = true;
    const highlight = () => {
      void import('./source-highlighter')
        .then(({ sourceHighlighter }) =>
          current ? sourceHighlighter.highlight(source, { language }) : undefined,
        )
        .then(
          (result) => {
            if (current && result) setHighlighted({ source, language, markup: result.value });
          },
          () => {
            // Keep the original source visible if the model or runtime is unavailable.
          },
        );
    };

    const observer =
      typeof IntersectionObserver === 'undefined'
        ? undefined
        : new IntersectionObserver(
            (entries, viewportObserver) => {
              if (current && entries.some((entry) => entry.isIntersecting)) {
                viewportObserver.disconnect();
                highlight();
              }
            },
            { rootMargin: '128px' },
          );

    if (observer && block.current) observer.observe(block.current);
    else highlight();

    return () => {
      current = false;
      observer?.disconnect();
    };
  }, [active, language, markup, source]);

  return (
    <pre
      {...props}
      ref={block}
      className={className ? `nsh ${className}` : 'nsh'}
      data-language={language}
    >
      {markup === undefined ? (
        <code data-language={language}>{source}</code>
      ) : (
        // NSH's value contains escaped source text inside its own token markup.
        <code data-language={language} dangerouslySetInnerHTML={{ __html: markup }} />
      )}
    </pre>
  );
}
