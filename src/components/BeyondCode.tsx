import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, BookOpen, Compass, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Satellite {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: { x: number; y: number }[];
  orbitCount: number;
}

export const BeyondCode: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [satellites, setSatellites] = useState<Satellite[]>([]);
  const [gravityMass, setGravityMass] = useState(1500);
  const [satCount, setSatCount] = useState(0);
  const [stableOrbitsAchieved, setStableOrbitsAchieved] = useState(0);

  // Canvas Orbit Simulator loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.fillStyle = '#05060A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Render Central Star / Planet Mass (Gravity Well)
      const gradient = ctx.createRadialGradient(cx, cy, 4, cx, cy, 32);
      gradient.addColorStop(0, '#00F0FF');
      gradient.addColorStop(0.5, '#0099B8');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');

      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#00F0FF';
      ctx.fill();

      // Update Satellites
      setSatellites(prevSats =>
        prevSats
          .map(sat => {
            const dx = cx - sat.x;
            const dy = cy - sat.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist < 12 || dist > 600) return null; // crashed or escaped

            // Gravitational Force F = G * M / r^2
            const force = gravityMass / (distSq + 100);
            const ax = (dx / dist) * force;
            const ay = (dy / dist) * force;

            const vx = sat.vx + ax;
            const vy = sat.vy + ay;
            const x = sat.x + vx;
            const y = sat.y + vy;

            const newTrail = [...sat.trail.slice(-40), { x, y }];

            // Orbit counter logic
            let orbitCount = sat.orbitCount;
            if (newTrail.length > 30) {
              const startPos = newTrail[0];
              const distToStart = Math.hypot(x - startPos.x, y - startPos.y);
              if (distToStart < 20 && newTrail.length > 35) {
                orbitCount += 1;
                if (orbitCount === 1) {
                  setStableOrbitsAchieved(c => c + 1);
                  confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
                }
              }
            }

            // Draw Trail
            ctx.beginPath();
            ctx.moveTo(newTrail[0].x, newTrail[0].y);
            for (let i = 1; i < newTrail.length; i++) {
              ctx.lineTo(newTrail[i].x, newTrail[i].y);
            }
            ctx.strokeStyle = 'rgba(0, 255, 153, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Draw Satellite body
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#00FF99';
            ctx.fill();

            return { x, y, vx, vy, trail: newTrail, orbitCount };
          })
          .filter(Boolean) as Satellite[]
      );

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [gravityMass]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const dx = cx - clickX;
    const dy = cy - clickY;
    const dist = Math.hypot(dx, dy);

    // Perpendicular circular velocity estimation v = sqrt(GM / r)
    const orbitalSpeed = Math.sqrt(gravityMass / dist);
    const vx = (-dy / dist) * orbitalSpeed;
    const vy = (dx / dist) * orbitalSpeed;

    const newSat: Satellite = {
      x: clickX,
      y: clickY,
      vx,
      vy,
      trail: [{ x: clickX, y: clickY }],
      orbitCount: 0,
    };

    setSatellites(prev => [...prev, newSat]);
    setSatCount(c => c + 1);
  };

  const handleClear = () => {
    setSatellites([]);
  };

  return (
    <section id="beyond" className="relative py-24 px-4 sm:px-6 hairline-t hairline-b">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
          <div>
            <span className="font-mono text-xs text-lime-accent tracking-widest uppercase font-bold">
              05 // BEYOND CODE & PHYSICS SIMULATION
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-space-text mt-2 tracking-tight">
              Interactive Gravity Sandbox
            </h2>
          </div>
          <p className="font-mono text-xs text-space-muted mt-4 md:mt-0">
            [ CLICK CANVAS TO LAUNCH SATELLITE INTO ORBIT ]
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Physics Simulator Canvas */}
          <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border-cyan-accent/30 relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-space-border font-mono text-xs">
              <div className="flex items-center space-x-2 text-cyan-accent font-semibold">
                <Compass className="w-4 h-4" />
                <span>Orbit Simulator v1.0</span>
              </div>
              <div className="flex items-center space-x-4 text-space-muted">
                <span>Satellites: {satellites.length}</span>
                <span className="text-lime-accent flex items-center space-x-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Stable Orbits: {stableOrbitsAchieved}</span>
                </span>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              width={650}
              height={360}
              onClick={handleCanvasClick}
              className="w-full h-80 bg-space-950 rounded-2xl cursor-crosshair border border-white/10"
            />

            {/* Canvas Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-2 font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="text-space-muted">Gravity Mass ($M$):</span>
                <input
                  type="range"
                  min={500}
                  max={4000}
                  value={gravityMass}
                  onChange={e => setGravityMass(Number(e.target.value))}
                  className="w-32 accent-cyan-accent cursor-pointer"
                />
                <span className="text-cyan-accent font-bold">{gravityMass}</span>
              </div>

              <button
                onClick={handleClear}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-space-border bg-space-850 text-space-text hover:border-cyan-accent hover:text-cyan-accent transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Field</span>
              </button>
            </div>
          </div>

          {/* Reading & Beyond Code Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border-cyan-accent/20 space-y-4">
              <div className="flex items-center space-x-2 text-amber-solar font-mono text-xs font-bold">
                <BookOpen className="w-4 h-4" />
                <span>RECOMMENDED READING</span>
              </div>
              <h3 className="font-display text-xl font-bold text-space-text">
                Structures: Or Why Things Don't Fall Down
              </h3>
              <p className="text-space-muted text-xs leading-relaxed font-mono">
                By J.E. Gordon. Explores the fundamental engineering forces, strain vectors, and structural integrity principles that inspire my approach to clean software architecture.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-lime-accent/20 space-y-3">
              <span className="font-mono text-xs text-lime-accent font-bold uppercase tracking-wider">
                ASTROPHYSICS HOBBY
              </span>
              <p className="text-space-text text-sm font-normal">
                Building open-source amateur satellite ground stations and decoding NOAA weather satellite imagery via Software Defined Radio (SDR).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
