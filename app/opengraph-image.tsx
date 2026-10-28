import { ImageResponse } from 'next/og';
import { CREST } from '@/components/brand/crestData';
import { SITE } from '@/lib/site';

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const [, , W, H] = CREST.viewBox.split(' ').map(Number);

/** Default social card: the green crest on navy, with the promise set in capitals. */
export default function Image() {
  const g = (paths: readonly string[], fill: string) => (
    <g fill={fill}>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', background: '#121e34', color: '#fff', padding: '0 90px', gap: 80 }}>
        <svg width={(380 * W) / H} height={380} viewBox={`0 0 ${W} ${H}`}>
          {g(CREST.shell, '#88b03f')}
          {g(CREST.ink, '#88b03f')}
          {g(CREST.book, '#88b03f')}
          {g(CREST.label, '#121e34')}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 26, letterSpacing: 6, color: '#88b03f', fontWeight: 800, textTransform: 'uppercase' }}>St. Sebastian Sports Academy</div>
          <div style={{ marginTop: 24, fontSize: 112, lineHeight: 0.92, fontWeight: 800, textTransform: 'uppercase', display: 'flex', flexDirection: 'column' }}>
            <span>Champions</span>
            <span>for life</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
