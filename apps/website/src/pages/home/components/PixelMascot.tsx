export function PixelMascot({ className }: { className?: string | undefined }) {
  return (
    <svg className={className} aria-hidden="true" shapeRendering="crispEdges" viewBox="-6 -1 28 18">
      {[false, true].map((mirrored) => (
        <g key={String(mirrored)} transform={mirrored ? 'translate(16 0) scale(-1 1)' : undefined}>
          <path
            data-wing=""
            d="M5 11H1v-1H0V8h-2V6h-2V3h2v1h2v1h2v2h2v2h1z"
            fill="#fff"
            stroke="#a3afc5"
            strokeWidth=".45"
          />
        </g>
      ))}
      <path fill="#0647ca" d="M5 1h6v1h2v7H3V2h2z" />
      <path fill="#0062ff" d="M4 2h8v6H4zM4 9h8v4H4zM3 10h1v2H3zM12 10h1v2h-1z" />
      <path fill="#ffd5a5" d="M5 4h6v4H5zM3 12h1v1H3zM12 12h1v1h-1z" />
      <path fill="#202538" d="M6 5h1v1H6zM9 5h1v1H9zM5 13h2v2H4v-1h1zM9 13h2v1h1v1H9z" />
      <path fill="#bcd6ff" d="M7 9h2v1H7zM7 11h2v1H7z" />
    </svg>
  );
}
