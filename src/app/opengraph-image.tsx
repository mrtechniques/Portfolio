import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Mohammed Shajith (Mr Techniques) Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#08080b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '22px',
              }}
            >
              MT
            </div>
            <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: 800, letterSpacing: '2px' }}>
              MR TECHNIQUES
            </div>
          </div>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              color: '#fbbf24',
              fontSize: '14px',
              fontFamily: 'monospace',
            }}
          >
            10 YEARS BEHIND THE LENS
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: '#ffffff', fontSize: '64px', fontWeight: 900, lineHeight: 1.1 }}>
            Mohammed Shajith
          </div>
          <div style={{ color: '#06b6d4', fontSize: '32px', fontWeight: 600 }}>
            Moments captured. Products built.
          </div>
          <div style={{ color: '#a1a1aa', fontSize: '20px' }}>
            Cinematographer • Photographer • AI & ML Software Engineer
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            color: '#71717a',
            fontSize: '16px',
            fontFamily: 'monospace',
          }}
        >
          <div>FILMS // WEDDINGS • AUTOMOTIVE • FESTIVALS</div>
          <div style={{ color: '#38bdf8' }}>CODE // PYTORCH • NEXT.JS 15 • OPENCV</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
