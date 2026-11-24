import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Cpu, Sliders, ChevronDown } from 'lucide-react';

export default function EarthHero({ onOpenDesk }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      // Normalise scroll over first 700px
      const progress = Math.min(1, Math.max(0, scrollY / 700));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas Earth & Stars rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || window.innerWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 750 * window.devicePixelRatio);

    // Generate stars
    const starCount = 220;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * 0.7),
        radius: Math.random() * 1.5 * window.devicePixelRatio + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2
      });
    }

    // Generate city light nodes across Earth horizon
    const cityCount = 65;
    const cities = [];
    for (let i = 0; i < cityCount; i++) {
      // Angle along the arc
      const angle = (Math.random() - 0.5) * 1.35; // centered
      const depth = Math.random() * 0.35 + 0.65; // depth from horizon
      cities.push({
        angle,
        depth,
        size: Math.random() * 2.2 * window.devicePixelRatio + 0.8,
        brightness: Math.random() * 0.6 + 0.4,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2
      });
    }

    // City connection arcs
    const arcs = [];
    for (let i = 0; i < 18; i++) {
      const c1 = cities[Math.floor(Math.random() * cities.length)];
      const c2 = cities[Math.floor(Math.random() * cities.length)];
      if (c1 !== c2) arcs.push({ c1, c2, alpha: Math.random() * 0.25 + 0.1 });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep space background gradient (Image 1 & 2 color grade: deep space to midnight navy)
      const spaceGrad = ctx.createLinearGradient(0, 0, 0, height);
      spaceGrad.addColorStop(0, '#020409');
      spaceGrad.addColorStop(0.5, '#04091b');
      spaceGrad.addColorStop(1, '#07122e');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial nebula band across top
      const nebulaGrad = ctx.createRadialGradient(width * 0.55, height * 0.25, 10, width * 0.55, height * 0.25, width * 0.6);
      nebulaGrad.addColorStop(0, 'rgba(56, 189, 248, 0.06)');
      nebulaGrad.addColorStop(0.4, 'rgba(37, 99, 235, 0.04)');
      nebulaGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, width, height);

      // Render glittering stars
      for (const s of stars) {
        const twinkle = Math.sin(time * s.speed * 60 + s.phase) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(224, 242, 254, ${s.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // EARTH CURVATURE WITH SCROLL ZOOM
      // As scrollProgress increases (or when user scrolls), zoom into Earth!
      const currentZoom = 1.0 + scrollProgress * 0.55; // Scales from 1.0 to 1.55
      const earthCenterX = width * 0.5;
      const baseEarthRadius = width * 1.05;
      const earthRadius = baseEarthRadius * currentZoom;
      // Position center so the top of the curve sits nicely near the bottom third
      const horizonYOffset = height * (0.64 - scrollProgress * 0.18);
      const earthCenterY = horizonYOffset + earthRadius;

      // 1. Grand Atmospheric Back-Glow (Dawn bloom above Earth rim)
      const atmoBloom = ctx.createRadialGradient(
        earthCenterX,
        horizonYOffset + 40 * window.devicePixelRatio,
        earthRadius * 0.85,
        earthCenterX,
        horizonYOffset + 40 * window.devicePixelRatio,
        earthRadius * 1.18
      );
      atmoBloom.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
      atmoBloom.addColorStop(0.12, 'rgba(14, 165, 233, 0.35)');
      atmoBloom.addColorStop(0.35, 'rgba(37, 99, 235, 0.18)');
      atmoBloom.addColorStop(0.7, 'rgba(2, 6, 23, 0.05)');
      atmoBloom.addColorStop(1, 'transparent');

      ctx.fillStyle = atmoBloom;
      ctx.beginPath();
      ctx.arc(earthCenterX, earthCenterY, earthRadius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // 2. Earth Globe Body (Oceans & Landmass base)
      ctx.save();
      ctx.beginPath();
      ctx.arc(earthCenterX, earthCenterY, earthRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Inside Earth Surface Gradient
      const surfaceGrad = ctx.createRadialGradient(
        earthCenterX,
        horizonYOffset,
        50 * window.devicePixelRatio,
        earthCenterX,
        horizonYOffset,
        earthRadius
      );
      surfaceGrad.addColorStop(0, '#061330');
      surfaceGrad.addColorStop(0.3, '#040b1e');
      surfaceGrad.addColorStop(0.8, '#020510');
      surfaceGrad.addColorStop(1, '#01030a');
      ctx.fillStyle = surfaceGrad;
      ctx.fill();

      // Draw faint continent landmass silhouette outlines along horizon
      ctx.fillStyle = 'rgba(14, 34, 74, 0.35)';
      ctx.beginPath();
      // Organic silhouette curves
      const pCount = 20;
      for (let i = 0; i <= pCount; i++) {
        const tStep = (i / pCount) - 0.5;
        const ang = tStep * 1.4;
        const rDist = earthRadius - (Math.sin(i * 1.5 + time * 0.1) * 25 + 35) * window.devicePixelRatio;
        const px = earthCenterX + Math.sin(ang) * rDist;
        const py = earthCenterY - Math.cos(ang) * rDist;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.arc(earthCenterX, earthCenterY, earthRadius, Math.PI * 1.8, Math.PI * 1.2, true);
      ctx.closePath();
      ctx.fill();

      // Render glowing golden-white City Lights
      for (const city of cities) {
        const cityDist = earthRadius - (1 - city.depth) * 110 * window.devicePixelRatio;
        const cx = earthCenterX + Math.sin(city.angle) * cityDist;
        const cy = earthCenterY - Math.cos(city.angle) * cityDist;

        const pulse = Math.sin(time * city.pulseSpeed * 60 + city.phase) * 0.25 + 0.75;
        const glowRadius = city.size * 3.5;

        // City cluster glow
        const cGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        cGlow.addColorStop(0, `rgba(254, 240, 138, ${city.brightness * pulse * 0.9})`);
        cGlow.addColorStop(0.4, `rgba(245, 158, 11, ${city.brightness * pulse * 0.4})`);
        cGlow.addColorStop(1, 'transparent');

        ctx.fillStyle = cGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Bright pin-core
        ctx.fillStyle = `rgba(255, 255, 255, ${city.brightness * pulse})`;
        ctx.beginPath();
        ctx.arc(cx, cy, city.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || window.innerWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 750 * window.devicePixelRatio;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '82vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px 80px',
        textAlign: 'center'
      }}
    >
      {/* Dynamic Earth & Orbit Canvas with Scroll Zoom */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Atmospheric Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 70% at 50% 30%, transparent 40%, rgba(2, 4, 10, 0.75) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Content Floating over Earth - NO OUTER BOX CONTAINER */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 960, margin: '0 auto', paddingTop: 24 }}>
        {/* High-Impact Typographic Headline with Big/Small contrast and smooth transition */}
        <h1
          className="font-neuron animate-fade-in-up"
          style={{
            fontSize: 'clamp(2.6rem, 5.8vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: 24,
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)'
          }}
        >
          Earnings Desk{' '}
          <span
            style={{
              display: 'block',
              fontSize: 'clamp(1.6rem, 3.8vw, 2.8rem)',
              fontWeight: 400,
              color: 'rgba(224, 242, 254, 0.85)',
              letterSpacing: '-0.015em',
              marginTop: 6
            }}
          >
            with <strong style={{ fontWeight: 800, color: '#38bdf8' }}>Provable Grounding</strong>
          </span>
        </h1>

        {/* Clean, explainable sentence with staggered entrance */}
        <p
          className="animate-fade-in-up animate-delay-1"
          style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            color: '#cbd5e1',
            lineHeight: 1.7,
            maxWidth: 760,
            margin: '0 auto 38px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)'
          }}
        >
          Transform quarterly SEC earnings filings into <strong style={{ color: '#ffffff' }}>verifiable executive research notes</strong>.
          Every quantitative figure and qualitative variance is anchored to source disclosures with{' '}
          <strong style={{ color: '#38bdf8' }}>zero generative hallucination</strong>.
        </p>

        {/* Action Buttons with staggered entrance */}
        <div 
          className="animate-fade-in-up animate-delay-2"
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <button
            onClick={() => onOpenDesk && onOpenDesk()}
            className="btn btn-primary"
            style={{
              padding: '14px 32px',
              fontSize: '1rem',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              boxShadow: '0 8px 30px rgba(2, 132, 199, 0.35)',
              fontWeight: 700
            }}
          >
            <span>Launch Analysis Desk</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={() => onOpenDesk && onOpenDesk('Acme Technologies')}
            className="btn btn-secondary"
            style={{
              padding: '14px 26px',
              fontSize: '1rem',
              borderRadius: 10,
              background: 'rgba(10, 20, 48, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(16px)',
              fontWeight: 600,
              color: '#f8fafc'
            }}
          >
            <span>Explore Acme Case ($4.82B)</span>
          </button>

          <button
            onClick={() => onOpenDesk && onOpenDesk('CloudScale AI Systems')}
            className="btn btn-secondary"
            style={{
              padding: '14px 26px',
              fontSize: '1rem',
              borderRadius: 10,
              background: 'rgba(10, 20, 48, 0.7)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              backdropFilter: 'blur(16px)',
              fontWeight: 600,
              color: '#38bdf8'
            }}
          >
            <span>CloudScale AI (+36% YoY)</span>
          </button>
        </div>

        {/* Scroll Zoom Indicator */}
        <div
          style={{
            marginTop: 48,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.78rem',
            color: 'rgba(148, 163, 184, 0.8)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase'
          }}
        >
          <ChevronDown size={14} className="wave-bar" style={{ animation: 'bounce 2s infinite' }} />
          <span>Scroll to explore Earth intelligence · Zoom {Math.round((1 + scrollProgress * 0.55) * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
