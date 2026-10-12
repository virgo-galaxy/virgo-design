// Asymmetric visual test card: edge markers reveal crop/position, while fine lines
// and contrasting color fields make material blur easy to compare.
export const surfaceImageFixture = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640" viewBox="0 0 960 640" fill="none">
  <path fill="#172033" d="M0 0h960v640H0z"/>
  <path fill="#f4f0e8" d="M480 0h480v320H480z"/>
  <path fill="#5268e8" d="M480 320h480v320H480z"/>
  <path fill="#73d5c4" d="M0 640V400l360 240z"/>
  <circle cx="360" cy="270" r="160" fill="#f68c73"/>
  <circle cx="360" cy="270" r="96" stroke="#172033" stroke-width="2"/>
  <path stroke="#172033" stroke-opacity=".2" d="M600 0v320m80-320v320m80-320v320m80-320v320M480 80h480m-480 80h480m-480 80h480"/>
  <g stroke="#f4f0e8" stroke-width="3">
    <path d="M592 392h256m-256 16h256m-256 16h256m-256 16h256m-256 16h256m-256 16h256"/>
    <path d="M32 96V32h64m736 576h96v-64"/>
  </g>
  <path stroke="#172033" stroke-width="3" d="M832 32h96v64M32 544v64h64"/>
  <path stroke="#f4f0e8" stroke-opacity=".5" d="M16 16h928v608H16z"/>
  <circle cx="80" cy="200" r="8" fill="#f4f0e8"/>
  <circle cx="880" cy="240" r="8" fill="#172033"/>
  <path stroke="#172033" stroke-width="3" d="M640 552h160m-80-24v48"/>
</svg>`)}`;
