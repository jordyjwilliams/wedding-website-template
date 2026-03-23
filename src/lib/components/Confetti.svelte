<script lang="ts">
  /**
   * Headless Confetti component.
   * Generated from below codepen - adjusted to be reusable Svelte component.
   * REF: https://codepen.io/sameera2/pen/bGQyzoX
   *
   * Usage:
   *   let launch: () => void;
   *   <Confetti bind:launch />
   *   then call launch() wherever you like.
   *
   * Optional props:
   *   count   – number of particles (default 180)
   *   origin  – where the burst starts, as { x, y } fractions of viewport (default centre)
   */

  interface Origin {
    x: number; // 0–1 fraction of viewport width
    y: number; // 0–1 fraction of viewport height
  }

  interface Props {
    onReady?: (launch: () => void) => void;
    count?: number;
    origin?: Origin;
  }

  function createConfettiBurst(count: number, origin: Origin): void {
    const canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d')!;
    const ox = canvas.width * origin.x;
    const oy = canvas.height * origin.y;

    // Spread the burst so it doesn't always spawn from a single pixel
    const spread = Math.min(canvas.width * 0.15, 120);

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: ox + (Math.random() - 0.5) * spread,
      y: oy + (Math.random() - 0.5) * spread * 0.4,
      vx: (Math.random() - 0.5) * 14,
      vy: -(Math.random() * 14 + 6),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 8 + 5,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      alpha: 1,
    }));

    let raf: number;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const p of particles) {
        p.vy += 0.35; // gravity
        p.vx *= 0.99; // air drag
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        p.alpha -= 0.012;

        if (p.alpha <= 0) continue;
        alive = true;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        // Ribbon-shaped particle
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }

      if (alive) {
        raf = requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }

    raf = requestAnimationFrame(draw);
    // Safety net: remove canvas after 5 s even if particles are still fading
    setTimeout(() => {
      cancelAnimationFrame(raf);
      canvas.remove();
    }, 5000);
  }

  let { onReady, count = 180, origin = { x: 0.5, y: 0.55 } }: Props = $props();

  const launch = (): void => {
    createConfettiBurst(count, origin);
  };

  $effect(() => {
    onReady?.(launch);
  });

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    angle: number;
    spin: number;
    alpha: number;
  }

  // Uses the app's CSS variable colours so confetti always matches the theme.
  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    'hsl(var(--accent))',
    '#f9c74f',
    '#f8961e',
    '#f3722c',
    '#90be6d',
    '#43aa8b',
  ];
</script>
