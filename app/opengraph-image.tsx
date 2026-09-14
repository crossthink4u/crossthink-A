import { ImageResponse } from 'next/og';

export const alt = 'CrossThink: by Iris — Where Ideas Meet Talent';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Generated at build/request time so link previews never depend on a checked-in PNG.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#08080a',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -260,
            left: -160,
            width: 900,
            height: 900,
            borderRadius: 999,
            background: 'radial-gradient(circle, rgba(168,85,247,0.30) 0%, rgba(8,8,10,0) 62%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, color: '#ffffff', fontWeight: 700 }}>
          {/* same hexagon mark as the favicon and the in-app logo */}
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
              fill="#a855f7"
              fillOpacity="0.2"
              stroke="#a855f7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Cross<span style={{ color: '#a855f7' }}>Think</span>
          <span style={{ color: '#6b6b7b', fontWeight: 400 }}>: by Iris</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 82, fontWeight: 800, color: '#ffffff', lineHeight: 1.05, letterSpacing: -2 }}>
            Where ideas
          </div>
          <div style={{ fontSize: 82, fontWeight: 800, color: '#a855f7', lineHeight: 1.05, letterSpacing: -2 }}>
            meet talent
          </div>
          <div style={{ fontSize: 30, color: '#8a8a99', marginTop: 26 }}>
            Browse open student projects · Find your team · Apply in 2 minutes
          </div>
        </div>
      </div>
    ),
    size,
  );
}
