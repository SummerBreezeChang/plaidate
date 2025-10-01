import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Plaidate - Join the Waitlist'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFDF4',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #FFFDF4 0%, #F9F9F9 100%)',
          }}
        />
        
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
            zIndex: 1,
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#2E4F21',
              marginBottom: '20px',
              letterSpacing: '-2px',
            }}
          >
            Plaidate
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#2E4F21',
              marginBottom: '16px',
              maxWidth: '800px',
              lineHeight: '1.2',
            }}
          >
            Join the Waitlist
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: '24px',
              color: '#666',
              marginBottom: '40px',
              maxWidth: '900px',
              lineHeight: '1.4',
            }}
          >
            A family-friendly platform for parents of K–5 children to easily organize, discover, and join playdates
          </div>
          
          {/* CTA Badge */}
          <div
            style={{
              backgroundColor: '#2E4F21',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '28px',
              fontWeight: '600',
              boxShadow: '0 8px 32px rgba(46, 79, 33, 0.3)',
            }}
          >
            Available in Early 2026
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '120px',
            height: '120px',
            backgroundColor: '#F6D636',
            borderRadius: '50%',
            opacity: 0.1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            width: '80px',
            height: '80px',
            backgroundColor: '#3D98D6',
            borderRadius: '50%',
            opacity: 0.1,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
