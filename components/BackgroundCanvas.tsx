
import React, { useRef, useEffect } from 'react';
import { BackgroundState } from '../types';

interface BackgroundCanvasProps {
  config: BackgroundState;
}

interface Point {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
}

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initPoints();
    };

    const initPoints = () => {
      const points: Point[] = [];
      const spacing = 45;
      const cols = Math.ceil(window.innerWidth / spacing) + 1;
      const rows = Math.ceil(window.innerHeight / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          points.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
      pointsRef.current = points;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const draw = () => {
      ctx.fillStyle = config.color;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const points = pointsRef.current;
      const mouse = mouseRef.current;

      ctx.beginPath();
      ctx.strokeStyle = config.pointColor;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        
        // Spring physics to home
        const dx_home = p.ox - p.x;
        const dy_home = p.oy - p.y;
        p.vx += dx_home * config.springStrength;
        p.vy += dy_home * config.springStrength;

        // Mouse gravity
        if (mouse.active) {
          const dx_mouse = mouse.x - p.x;
          const dy_mouse = mouse.y - p.y;
          const dist = Math.sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
          
          if (dist < 300) {
            const force = (1 - dist / 300) * config.gravityStrength;
            const angle = Math.atan2(dy_mouse, dx_mouse);
            p.vx += Math.cos(angle) * force * 0.01;
            p.vy += Math.sin(angle) * force * 0.01;
          }
        }

        // Apply friction/viscosity
        p.vx *= config.viscosity;
        p.vy *= config.viscosity;
        
        p.x += p.vx;
        p.y += p.vy;

        // Draw node
        ctx.fillStyle = config.pointColor;
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }

      requestRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [config]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none transition-colors duration-1000"
      style={{ background: config.color }}
    />
  );
};

export default BackgroundCanvas;
