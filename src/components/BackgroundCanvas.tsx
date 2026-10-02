import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// ----------------------------------------------------
// 1. Curl-Noise Vector Field Particles (Three.js GPU Particles)
// ----------------------------------------------------
const ParticlesField: React.FC<{
  mouse: React.MutableRefObject<[number, number]>;
  clickShockwave: React.MutableRefObject<{ active: boolean; x: number; y: number; progress: number }>;
  isMobile: boolean;
  accentColor: string;
}> = ({ mouse, clickShockwave, isMobile, accentColor }) => {
  const count = isMobile ? 300 : 1200;
  const pointsRef = useRef<THREE.Points>(null!);

  // Generate particle initial positions, random seeds & colors
  const { positions, originalPos, speeds, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const cols = new Float32Array(count * 3);

    const baseColor = new THREE.Color(accentColor);
    const spreadX = isMobile ? 10 : 16;
    const spreadY = isMobile ? 6 : 8;

    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * spreadX;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi);
      const z = (Math.random() - 0.5) * spreadY;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      spd[i] = 0.15 + Math.random() * 0.45;

      // Color variation across cyan, lime, solar amber
      let c = baseColor.clone();
      const rand = Math.random();
      if (rand > 0.7) {
        c = new THREE.Color('#a855f7'); // Purple
      } else if (rand > 0.4) {
        c = new THREE.Color('#0ea5e9'); // Sky Blue
      } else if (rand > 0.1) {
        c = new THREE.Color('#00F0FF'); // Cyan
      } else {
        c = new THREE.Color('#f43f5e'); // Rose
      }

      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }

    return { positions: pos, originalPos: orig, speeds: spd, colors: cols };
  }, [count, accentColor, isMobile]);

  // Vector velocity curl noise & gravity lens loop
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime() * 0.15; // Slowed down more
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = posAttr.array as Float32Array;

    const mx = mouse.current[0] * (isMobile ? 6 : 12);
    const my = mouse.current[1] * (isMobile ? 4 : 8);

    const shock = clickShockwave.current;
    if (shock.active) {
      shock.progress += 0.02; // Slowed from 0.04
      if (shock.progress > 1) shock.active = false;
    }

    for (let i = 0; i < count; i++) {
      let x = array[i * 3];
      let y = array[i * 3 + 1];
      let z = array[i * 3 + 2];

      // Curl noise trigonometric vector field — slowed multipliers
      const angle1 = Math.sin(y * 0.2 + time) + Math.cos(z * 0.25 + time * 0.4);
      const angle2 = Math.cos(x * 0.2 + time * 0.45) + Math.sin(z * 0.2 + time * 0.3);

      const vx = Math.cos(angle1) * 0.004 * speeds[i]; // Slowed more
      const vy = Math.sin(angle2) * 0.004 * speeds[i];

      x += vx;
      y += vy;

      // Gravitational lensing around mouse/touch — gentler on mobile
      if (!isMobile) {
        const dx = x - mx;
        const dy = y - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < 12.25 && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (3.5 - dist) * 0.004; // Reduced effect size and speed
          x -= (dx / dist) * force - (dy / dist) * force * 0.3;
          y -= (dy / dist) * force + (dx / dist) * force * 0.3;
        }
      }

      // Click shockwave expansion — gentler push
      if (shock.active) {
        const sx = x - shock.x * (isMobile ? 6 : 12);
        const sy = y - shock.y * (isMobile ? 4 : 8);
        const sDist = Math.sqrt(sx * sx + sy * sy);
        const radius = shock.progress * (isMobile ? 10 : 16);
        if (Math.abs(sDist - radius) < 3.0) {
          const push = (1.0 - Math.abs(sDist - radius) / 3.0) * 0.15; // Slowed from 0.25
          x += (sx / (sDist + 0.01)) * push;
          y += (sy / (sDist + 0.01)) * push;
        }
      }

      // Soft boundary wrap
      const boundX = isMobile ? 12 : 18;
      const boundY = isMobile ? 10 : 14;
      if (Math.abs(x) > boundX || Math.abs(y) > boundY) {
        x = originalPos[i * 3] + (Math.random() - 0.5) * 2;
        y = originalPos[i * 3 + 1] + (Math.random() - 0.5) * 2;
      }

      array[i * 3] = x;
      array[i * 3 + 1] = y;
      array[i * 3 + 2] = z;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.1 : 0.12}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={isMobile ? 0.6 : 0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

// ----------------------------------------------------
// 2. Scroll-Driven 3D Orbital Rings with Satellites
// ----------------------------------------------------
const OrbitalRings: React.FC<{ scrollProgress: number; accentColor: string; isMobile: boolean }> = ({
  scrollProgress,
  accentColor,
  isMobile,
}) => {
  const groupRef = useRef<THREE.Group>(null!);
  const sat1Ref = useRef<THREE.Mesh>(null!);
  const sat2Ref = useRef<THREE.Mesh>(null!);
  const sat3Ref = useRef<THREE.Mesh>(null!);

  // Scale rings down on mobile
  const scale = isMobile ? 0.55 : 1;

  const ring1Pos = useMemo(() => {
    const r = 6 * scale;
    const arr = [];
    for (let i = 0; i <= 128; i++) {
      const theta = (i / 128) * Math.PI * 2;
      arr.push(Math.cos(theta) * r, Math.sin(theta) * r, 0);
    }
    return new Float32Array(arr);
  }, [scale]);

  const ring2Pos = useMemo(() => {
    const r = 9.5 * scale;
    const arr = [];
    for (let i = 0; i <= 128; i++) {
      const theta = (i / 128) * Math.PI * 2;
      arr.push(Math.cos(theta) * r, Math.sin(theta) * r, 0);
    }
    return new Float32Array(arr);
  }, [scale]);

  const ring3Pos = useMemo(() => {
    const r = 13 * scale;
    const arr = [];
    for (let i = 0; i <= 128; i++) {
      const theta = (i / 128) * Math.PI * 2;
      arr.push(Math.cos(theta) * r, Math.sin(theta) * r, 0);
    }
    return new Float32Array(arr);
  }, [scale]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Tilt and spin based on scroll — slowed rotation speeds
    groupRef.current.rotation.x = Math.PI * 0.25 + scrollProgress * Math.PI * 0.3;
    groupRef.current.rotation.y = t * 0.05 + scrollProgress * Math.PI * 0.6; // Slowed from 0.1

    if (sat1Ref.current) {
      const r1 = 6 * scale;
      sat1Ref.current.position.x = Math.cos(t * 0.3) * r1; // Slowed from 0.6
      sat1Ref.current.position.y = Math.sin(t * 0.3) * r1;
    }
    if (sat2Ref.current) {
      const r2 = 9.5 * scale;
      sat2Ref.current.position.x = Math.cos(-t * 0.2 + 1.5) * r2; // Slowed from 0.4
      sat2Ref.current.position.y = Math.sin(-t * 0.2 + 1.5) * r2;
    }
    if (sat3Ref.current) {
      const r3 = 13 * scale;
      sat3Ref.current.position.x = Math.cos(t * 0.12 + 3) * r3; // Slowed from 0.25
      sat3Ref.current.position.y = Math.sin(t * 0.12 + 3) * r3;
    }
  });

  const ringColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const satSize = isMobile ? 0.6 : 1;

  return (
    <group ref={groupRef} position={[0, 0, -2]}>
      {/* Ring 1 */}
      <lineLoop>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ring1Pos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={ringColor} transparent opacity={0.4} />
      </lineLoop>
      <mesh ref={sat1Ref}>
        <sphereGeometry args={[0.18 * satSize, 16, 16]} />
        <meshBasicMaterial color={ringColor} />
      </mesh>

      {/* Ring 2 */}
      <lineLoop>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ring2Pos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a855f7" transparent opacity={0.3} />
      </lineLoop>
      <mesh ref={sat2Ref}>
        <sphereGeometry args={[0.22 * satSize, 16, 16]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* Ring 3 */}
      <lineLoop>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ring3Pos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#f43f5e" transparent opacity={0.22} />
      </lineLoop>
      <mesh ref={sat3Ref}>
        <sphereGeometry args={[0.26 * satSize, 16, 16]} />
        <meshBasicMaterial color="#f43f5e" />
      </mesh>
    </group>
  );
};

// ----------------------------------------------------
// 3. Network Signal Data Pulses
// ----------------------------------------------------
const SignalPulses: React.FC<{ accentColor: string; isMobile: boolean }> = ({ accentColor, isMobile }) => {
  const lineCount = isMobile ? 5 : 10;

  const lines = useMemo(() => {
    const spread = isMobile ? 14 : 24;
    const spreadY = isMobile ? 10 : 16;
    const arr = [];
    for (let i = 0; i < lineCount; i++) {
      const p1 = new THREE.Vector3((Math.random() - 0.5) * spread, (Math.random() - 0.5) * spreadY, -3);
      const p2 = new THREE.Vector3((Math.random() - 0.5) * spread, (Math.random() - 0.5) * spreadY, -3);
      arr.push({ p1, p2, speed: 0.15 + Math.random() * 0.2, offset: Math.random() * Math.PI * 2 }); // Slowed from 0.3 + 0.4
    }
    return arr;
  }, [isMobile, lineCount]);

  const pulseMeshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    lines.forEach((line, i) => {
      const mesh = pulseMeshRefs.current[i];
      if (mesh) {
        const progress = (Math.sin(t * line.speed + line.offset) + 1) / 2;
        mesh.position.lerpVectors(line.p1, line.p2, progress);
      }
    });
  });

  return (
    <group>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([line.p1.x, line.p1.y, line.p1.z, line.p2.x, line.p2.y, line.p2.z]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={accentColor} transparent opacity={0.15} />
          </line>
          <mesh ref={el => (pulseMeshRefs.current[i] = el)}>
            <sphereGeometry args={[isMobile ? 0.07 : 0.1, 8, 8]} />
            <meshBasicMaterial color={accentColor} transparent opacity={0.9} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
};

// ----------------------------------------------------
// Main Background Canvas Container
// ----------------------------------------------------
export const BackgroundCanvas: React.FC = () => {
  const { activeSection } = useTheme();
  const mouse = useRef<[number, number]>([0, 0]);
  const clickShockwave = useRef<{ active: boolean; x: number; y: number; progress: number }>({
    active: false,
    x: 0,
    y: 0,
    progress: 0,
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const accentColor = useMemo(() => {
    switch (activeSection) {
      case 'work':
        return '#00FF99';
      case 'timeline':
        return '#FFB800';
      case 'skills':
        return '#00F0FF';
      case 'contact':
        return '#00FF99';
      default:
        return '#00F0FF';
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    const handleClick = (e: MouseEvent) => {
      clickShockwave.current = {
        active: true,
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
        progress: 0,
      };
    };

    const checkMobileAndMotion = () => {
      setIsMobile(window.innerWidth < 768);
      // Forcefully disable reduced motion check so the 3D canvas always renders
      setPrefersReducedMotion(false);
    };

    checkMobileAndMotion();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', checkMobileAndMotion);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', checkMobileAndMotion);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-space-950 via-space-900 to-space-950 opacity-90" />
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 14 : 10], fov: isMobile ? 50 : 60 }}
        dpr={Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5)}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.8} />
        <ParticlesField
          mouse={mouse}
          clickShockwave={clickShockwave}
          isMobile={isMobile}
          accentColor={accentColor}
        />
        <OrbitalRings scrollProgress={scrollProgress} accentColor={accentColor} isMobile={isMobile} />
        <SignalPulses accentColor={accentColor} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};
