(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const prefersHover = window.matchMedia('(hover: hover)').matches;
  const isMobile = window.innerWidth <= 768;

  const palette = {
    grid: 'rgba(33, 129, 189,',
    node: 'rgba(33, 129, 189,',
    beam: 'rgba(109, 173, 216,',
    glow: 'rgba(128, 203, 243,',
    particle: 'rgba(33, 129, 189,',
  };

  const HEX_R = isMobile ? 26 : 34;

  const drawHex = (ctx, cx, cy, r) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  };

  const drawHexGrid = (ctx, width, height, offsetX, offsetY, alpha) => {
    const r = HEX_R;
    const h = r * Math.sqrt(3);
    const w = r * 1.5;
    ctx.strokeStyle = `${palette.grid}${alpha})`;
    ctx.lineWidth = 0.55;
    for (let row = -1; row < height / (h * 0.5) + 2; row++) {
      for (let col = -1; col < width / w + 2; col++) {
        const x = col * w + offsetX + (row % 2 ? w * 0.5 : 0);
        const y = row * (h * 0.5) + offsetY;
        drawHex(ctx, x, y, r);
      }
    }
  };

  const bindPointer = (target, onMove) => {
    target.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    target.addEventListener(
      'touchstart',
      (e) => {
        const t = e.touches[0];
        if (t) onMove(t.clientX, t.clientY);
      },
      { passive: true }
    );
    target.addEventListener(
      'touchmove',
      (e) => {
        const t = e.touches[0];
        if (t) onMove(t.clientX, t.clientY);
      },
      { passive: true }
    );
  };

  /* ── Ambient architecture canvas ── */
  const ambientCanvas = document.getElementById('ambient-canvas');
  if (ambientCanvas) {
    const ctx = ambientCanvas.getContext('2d');
    let mouse = { x: -9999, y: -9999 };
    const nodes = [];
    const NODE_COUNT = isMobile ? 34 : 62;
    const DUST_COUNT = isMobile ? 22 : 38;
    const MOUSE_FIELD = isMobile ? 160 : 220;
    const CONNECT_DIST = HEX_R * 3.6;
    const MAX_LINKS_PER_NODE = 4;
    let gridOffset = 0;

    const resize = () => {
      ambientCanvas.width = window.innerWidth;
      ambientCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    bindPointer(document, (x, y) => {
      mouse.x = x;
      mouse.y = y;
    });

    class StructuralNode {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * ambientCanvas.width;
        this.y = Math.random() * ambientCanvas.height;
        this.baseVx = (Math.random() - 0.5) * 0.08;
        this.baseVy = (Math.random() - 0.5) * 0.08;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.r = 1.6 + Math.random() * 1.8;
        this.alpha = 0.14 + Math.random() * 0.2;
        this.isColumn = Math.random() > 0.72;
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_FIELD && dist > 1) {
          const force = ((MOUSE_FIELD - dist) / MOUSE_FIELD) * 0.05;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
        this.vx = this.vx * 0.97 + this.baseVx * 0.03;
        this.vy = this.vy * 0.97 + this.baseVy * 0.03;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -20) this.x = ambientCanvas.width + 20;
        if (this.x > ambientCanvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = ambientCanvas.height + 20;
        if (this.y > ambientCanvas.height + 20) this.y = -20;
      }
      draw() {
        if (this.isColumn) {
          ctx.strokeStyle = `${palette.beam}${this.alpha * 0.7})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(this.x - 4, this.y - 4, 8, 8);
        }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${palette.node}${this.alpha})`;
        ctx.fill();
      }
    }

    const dust = [];
    class DustMote {
      constructor() {
        this.x = Math.random() * ambientCanvas.width;
        this.y = Math.random() * ambientCanvas.height;
        this.r = 0.6 + Math.random() * 0.9;
        this.alpha = 0.06 + Math.random() * 0.1;
        this.vx = (Math.random() - 0.5) * 0.04;
        this.vy = (Math.random() - 0.5) * 0.04;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = ambientCanvas.width;
        if (this.x > ambientCanvas.width) this.x = 0;
        if (this.y < 0) this.y = ambientCanvas.height;
        if (this.y > ambientCanvas.height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${palette.glow}${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new StructuralNode());
    for (let i = 0; i < DUST_COUNT; i++) dust.push(new DustMote());

    const drawNodeLinks = () => {
      for (let i = 0; i < nodes.length; i++) {
        const nearby = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) nearby.push({ j, dist });
        }
        nearby.sort((a, b) => a.dist - b.dist);
        nearby.slice(0, MAX_LINKS_PER_NODE).forEach(({ j, dist }) => {
          if (i > j) return;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `${palette.beam}${0.09 * (1 - dist / CONNECT_DIST)})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        });
      }
    };

    const animate = () => {
      gridOffset += 0.12;
      ctx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);
      drawHexGrid(ctx, ambientCanvas.width, ambientCanvas.height, gridOffset * 0.25, gridOffset * 0.18, 0.07);

      dust.forEach((d) => {
        d.update();
        d.draw();
      });

      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, isMobile ? 140 : 200);
      grd.addColorStop(0, `${palette.glow}0.16)`);
      grd.addColorStop(0.5, `${palette.glow}0.05)`);
      grd.addColorStop(1, `${palette.glow}0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, ambientCanvas.width, ambientCanvas.height);

      nodes.forEach((n) => {
        n.update();
        n.draw();
      });

      drawNodeLinks();

      for (let i = 0; i < nodes.length; i++) {
        const mdx = mouse.x - nodes[i].x;
        const mdy = mouse.y - nodes[i].y;
        const mdist = Math.hypot(mdx, mdy);
        if (mdist < MOUSE_FIELD) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `${palette.glow}${0.18 * (1 - mdist / MOUSE_FIELD)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ── Hero architecture canvas ── */
  const heroCanvas = document.getElementById('hero-particle-canvas');
  const heroSection = document.querySelector('[data-hero-section]');

  if (heroCanvas && heroSection) {
    const ctx = heroCanvas.getContext('2d');
    const nodes = [];
    const COUNT = isMobile ? 38 : 82;
    const DUST_COUNT = isMobile ? 18 : 32;
    const CONNECT_DIST = isMobile ? 108 : 168;
    const MAX_LINKS_PER_NODE = 4;
    const MOUSE_RADIUS = isMobile ? 180 : 260;
    let mouse = { x: null, y: null };
    let tick = 0;

    const resize = () => {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const setHeroPointer = (clientX, clientY) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    };

    bindPointer(heroSection, setHeroPointer);
    heroSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
    heroSection.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class PlanNode {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.baseVx = (Math.random() - 0.5) * 0.25;
        this.baseVy = (Math.random() - 0.5) * 0.25;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.r = Math.random() * 1.8 + 1;
        this.baseAlpha = Math.random() * 0.3 + 0.12;
        this.a = this.baseAlpha;
      }
      update() {
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force * 0.35;
            this.vy += Math.sin(angle) * force * 0.35;
            this.a = Math.min(0.85, this.baseAlpha + force * 0.55);
          } else {
            this.a += (this.baseAlpha - this.a) * 0.05;
          }
        }
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -10) this.x = heroCanvas.width + 10;
        if (this.x > heroCanvas.width + 10) this.x = -10;
        if (this.y < -10) this.y = heroCanvas.height + 10;
        if (this.y > heroCanvas.height + 10) this.y = -10;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${palette.particle}${this.a})`;
        ctx.fill();
      }
    }

    const dust = [];
    class HeroDust {
      constructor() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.r = 0.5 + Math.random() * 0.8;
        this.alpha = 0.05 + Math.random() * 0.09;
        this.vx = (Math.random() - 0.5) * 0.05;
        this.vy = (Math.random() - 0.5) * 0.05;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0) this.x = heroCanvas.width;
        if (this.x > heroCanvas.width) this.x = 0;
        if (this.y < 0) this.y = heroCanvas.height;
        if (this.y > heroCanvas.height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${palette.particle}${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < COUNT; i++) nodes.push(new PlanNode());
    for (let i = 0; i < DUST_COUNT; i++) dust.push(new HeroDust());

    const drawHeroLinks = () => {
      for (let i = 0; i < nodes.length; i++) {
        const nearby = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) nearby.push({ j, dist });
        }
        nearby.sort((a, b) => a.dist - b.dist);
        nearby.slice(0, MAX_LINKS_PER_NODE).forEach(({ j, dist }) => {
          if (i > j) return;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `${palette.beam}${0.13 * (1 - dist / CONNECT_DIST)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        });
      }
    };

    const animate = () => {
      tick += 0.35;
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      drawHexGrid(ctx, heroCanvas.width, heroCanvas.height, tick, tick * 0.55, 0.08);

      dust.forEach((d) => {
        d.update();
        d.draw();
      });

      if (mouse.x !== null) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        g.addColorStop(0, `${palette.glow}0.24)`);
        g.addColorStop(1, `${palette.glow}0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
      }

      nodes.forEach((p) => {
        p.update();
        p.draw();
      });

      drawHeroLinks();

      for (let i = 0; i < nodes.length; i++) {
        if (mouse.x !== null) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${palette.particle}${0.3 * (1 - dist / MOUSE_RADIUS)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ── Custom cursor in hero (desktop only) ── */
  const heroCursor = document.getElementById('hero-cursor');
  const heroCursorDot = document.getElementById('hero-cursor-dot');
  let mouseX = 0;
  let mouseY = 0;
  let inHero = false;

  if (heroCursor && heroCursorDot && prefersHover) {
    document.body.classList.add('custom-cursor-active');
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (heroSection) {
        const r = heroSection.getBoundingClientRect();
        inHero =
          e.clientY >= r.top && e.clientY <= r.bottom && e.clientX >= r.left && e.clientX <= r.right;
      }
      heroCursorDot.style.left = `${e.clientX}px`;
      heroCursorDot.style.top = `${e.clientY}px`;
      heroCursor.classList.toggle('is-visible', inHero);
      heroCursorDot.classList.toggle('is-visible', inHero);
    });

    const animateCursor = () => {
      if (inHero) {
        const cx = parseFloat(heroCursor.style.left) || mouseX;
        const cy = parseFloat(heroCursor.style.top) || mouseY;
        heroCursor.style.left = `${cx + (mouseX - cx) * 0.14}px`;
        heroCursor.style.top = `${cy + (mouseY - cy) * 0.14}px`;
      }
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  /* ── Music player (auto-play, loop, skip silent intro) ── */
  const MUSIC_FALLBACK_START = 5.5;
  let musicStartOffset = MUSIC_FALLBACK_START;
  let musicOffsetReady = false;
  let autoPlayRequested = false;

  const detectAudibleStart = async (audioEl) => {
    const src = audioEl.querySelector('source')?.src;
    if (!src) return MUSIC_FALLBACK_START;
    try {
      const ctx = new AudioContext();
      const res = await fetch(src);
      const buf = await ctx.decodeAudioData(await res.arrayBuffer());
      const data = buf.getChannelData(0);
      const sampleRate = buf.sampleRate;
      const threshold = 0.006;
      const windowSize = Math.floor(sampleRate * 0.04);
      for (let i = 0; i < data.length - windowSize; i += windowSize) {
        let sum = 0;
        for (let j = 0; j < windowSize; j++) sum += Math.abs(data[i + j]);
        if (sum / windowSize > threshold) {
          const seconds = Math.max(0, i / sampleRate - 0.15);
          await ctx.close();
          return seconds;
        }
      }
      await ctx.close();
    } catch {
      /* use fallback */
    }
    return MUSIC_FALLBACK_START;
  };

  const musicToggle = document.getElementById('music-toggle');
  const musicWidget = document.getElementById('music-widget');
  const bgAudio = document.getElementById('bg-audio');
  const audioPlayBtn = document.getElementById('audio-play-btn');
  const audioProgressWrap = document.getElementById('audio-progress-wrap');
  const audioProgressBar = document.getElementById('audio-progress-bar');
  const audioTimeEl = document.getElementById('audio-time');
  const iconPlay = audioPlayBtn?.querySelector('.icon-play');
  const iconPause = audioPlayBtn?.querySelector('.icon-pause');
  const iconNote = musicToggle?.querySelector('.music-icon--note');
  const iconClose = musicToggle?.querySelector('.music-icon--close');

  let widgetOpen = false;
  let isPlaying = false;

  const formatTime = (s) => {
    if (Number.isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const setPlayingUI = (playing) => {
    isPlaying = playing;
    iconPlay?.classList.toggle('hidden', playing);
    iconPause?.classList.toggle('hidden', !playing);
    musicToggle?.classList.toggle('is-playing', playing);
  };

  const ensureAudiblePosition = () => {
    if (!bgAudio) return;
    const start = musicOffsetReady ? musicStartOffset : MUSIC_FALLBACK_START;
    if (bgAudio.currentTime < start - 0.25) {
      bgAudio.currentTime = start;
    }
  };

  const playMusic = async () => {
    if (!bgAudio) return;
    if (!musicOffsetReady) {
      musicStartOffset = await detectAudibleStart(bgAudio);
      musicOffsetReady = true;
    }
    bgAudio.loop = true;
    bgAudio.volume = 0.38;
    ensureAudiblePosition();
    try {
      await bgAudio.play();
      setPlayingUI(true);
      musicToggle?.classList.add('is-playing');
    } catch {
      /* blocked until user gesture */
    }
  };

  window.startPortfolioMusic = () => {
    autoPlayRequested = true;
    playMusic();
  };

  if (bgAudio) {
    bgAudio.loop = true;
    detectAudibleStart(bgAudio).then((offset) => {
      musicStartOffset = offset;
      musicOffsetReady = true;
      if (autoPlayRequested) playMusic();
    });

    bgAudio.addEventListener('timeupdate', () => {
      if (!bgAudio.duration) return;
      const start = musicOffsetReady ? musicStartOffset : MUSIC_FALLBACK_START;
      if (isPlaying && bgAudio.currentTime < 1 && start > 1) {
        bgAudio.currentTime = start;
      }
      const pct = (bgAudio.currentTime / bgAudio.duration) * 100;
      if (audioProgressBar) audioProgressBar.style.width = `${pct}%`;
      if (audioTimeEl) audioTimeEl.textContent = formatTime(bgAudio.currentTime);
    });

    bgAudio.addEventListener('ended', () => {
      bgAudio.currentTime = musicStartOffset;
      bgAudio.play().catch(() => {});
    });
  }

  const tryAutoPlay = () => {
    if (!document.getElementById('site-intro')) {
      autoPlayRequested = true;
      playMusic();
    }
  };

  window.addEventListener('hesam:intro-dismissed', tryAutoPlay);
  document.addEventListener(
    'pointerdown',
    () => {
      if (!isPlaying && autoPlayRequested) playMusic();
    },
    { once: true }
  );

  if (!document.getElementById('site-intro')) {
    window.setTimeout(tryAutoPlay, 400);
  }

  if (musicToggle && musicWidget && bgAudio) {
    musicToggle.addEventListener('click', () => {
      widgetOpen = !widgetOpen;
      musicWidget.classList.toggle('is-open', widgetOpen);
      musicToggle.setAttribute('aria-expanded', String(widgetOpen));
      iconNote?.classList.toggle('hidden', widgetOpen);
      iconClose?.classList.toggle('hidden', !widgetOpen);
      if (!isPlaying) {
        autoPlayRequested = true;
        playMusic();
      }
    });

    audioPlayBtn?.addEventListener('click', () => {
      if (isPlaying) {
        bgAudio.pause();
        setPlayingUI(false);
      } else {
        autoPlayRequested = true;
        playMusic();
      }
    });

    audioProgressWrap?.addEventListener('click', (e) => {
      const rect = audioProgressWrap.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const start = musicOffsetReady ? musicStartOffset : MUSIC_FALLBACK_START;
      bgAudio.currentTime = Math.max(start, pct * bgAudio.duration);
    });
  }

  /* ── Magnetic buttons ── */
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    if (!prefersHover) return;
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();