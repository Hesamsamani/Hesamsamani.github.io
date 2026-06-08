(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const prefersHover = window.matchMedia('(hover: hover)').matches;
  const isMobile = window.innerWidth <= 768;

  const theme = {
    node: 'rgba(184, 115, 51,',
    glow: 'rgba(184, 115, 51,',
    particle: 'rgba(232, 184, 122,',
    particleGlow: 'rgba(184, 115, 51,',
  };

  /* ── Ambient full-page canvas ── */
  const ambientCanvas = document.getElementById('ambient-canvas');
  if (ambientCanvas && prefersHover) {
    const ctx = ambientCanvas.getContext('2d');
    let mouse = { x: -9999, y: -9999 };
    const nodes = [];
    const NODE_COUNT = isMobile ? 18 : 42;
    const MOUSE_FIELD = 200;
    const CONNECT_DIST = 130;

    const resize = () => {
      ambientCanvas.width = window.innerWidth;
      ambientCanvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    class Node {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * ambientCanvas.width;
        this.y = Math.random() * ambientCanvas.height;
        this.baseVx = (Math.random() - 0.5) * 0.22;
        this.baseVy = (Math.random() - 0.5) * 0.22;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.r = 1.5 + Math.random() * 2;
        this.alpha = 0.1 + Math.random() * 0.12;
      }
      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_FIELD && dist > 1) {
          const force = ((MOUSE_FIELD - dist) / MOUSE_FIELD) * 0.07;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
        this.vx *= 0.984;
        this.vy *= 0.984;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -20) this.x = ambientCanvas.width + 20;
        if (this.x > ambientCanvas.width + 20) this.x = -20;
        if (this.y < -20) this.y = ambientCanvas.height + 20;
        if (this.y > ambientCanvas.height + 20) this.y = -20;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${theme.node}${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());

    const animate = () => {
      ctx.clearRect(0, 0, ambientCanvas.width, ambientCanvas.height);

      const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
      grd.addColorStop(0, `${theme.glow}0.06)`);
      grd.addColorStop(1, `${theme.glow}0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, ambientCanvas.width, ambientCanvas.height);

      nodes.forEach((n) => {
        n.update();
        n.draw();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${theme.node}${0.05 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ── Hero particle canvas ── */
  const heroCanvas = document.getElementById('hero-particle-canvas');
  const heroSection = document.querySelector('[data-hero-section]');

  if (heroCanvas && heroSection && prefersHover) {
    const ctx = heroCanvas.getContext('2d');
    const particles = [];
    const COUNT = isMobile ? 35 : 120;
    const CONNECT_DIST = isMobile ? 90 : 150;
    const MOUSE_RADIUS = 240;
    let mouse = { x: null, y: null };

    const resize = () => {
      heroCanvas.width = heroCanvas.offsetWidth;
      heroCanvas.height = heroCanvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    heroSection.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * heroCanvas.width;
        this.y = Math.random() * heroCanvas.height;
        this.baseVx = (Math.random() - 0.5) * 0.5;
        this.baseVy = (Math.random() - 0.5) * 0.5;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.r = Math.random() * 2.5 + 1;
        this.baseAlpha = Math.random() * 0.4 + 0.15;
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
            this.vx += Math.cos(angle) * force * 0.5;
            this.vy += Math.sin(angle) * force * 0.5;
            this.a = Math.min(1, this.baseAlpha + force * 0.7);
          } else {
            this.a += (this.baseAlpha - this.a) * 0.05;
          }
        }
        this.vx *= 0.96;
        this.vy *= 0.96;
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
        ctx.fillStyle = `${theme.particle}${this.a})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < COUNT; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
      if (mouse.x !== null) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, MOUSE_RADIUS);
        g.addColorStop(0, `${theme.particleGlow}0.18)`);
        g.addColorStop(1, `${theme.particleGlow}0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, heroCanvas.width, heroCanvas.height);
      }
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `${theme.particle}${0.12 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${theme.particle}${0.25 * (1 - dist / MOUSE_RADIUS)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }

  /* ── Custom cursor in hero ── */
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

  /* ── Music player ── */
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

  window.startPortfolioMusic = () => {
    if (!bgAudio) return;
    bgAudio.volume = 0.35;
    bgAudio.play().then(() => setPlayingUI(true)).catch(() => {});
  };

  if (musicToggle && musicWidget && bgAudio) {
    musicToggle.addEventListener('click', () => {
      widgetOpen = !widgetOpen;
      musicWidget.classList.toggle('is-open', widgetOpen);
      musicToggle.setAttribute('aria-expanded', String(widgetOpen));
      iconNote?.classList.toggle('hidden', widgetOpen);
      iconClose?.classList.toggle('hidden', !widgetOpen);
      if (widgetOpen && !isPlaying) window.startPortfolioMusic();
    });

    audioPlayBtn?.addEventListener('click', () => {
      if (isPlaying) {
        bgAudio.pause();
        setPlayingUI(false);
      } else {
        bgAudio.volume = 0.35;
        bgAudio.play().then(() => setPlayingUI(true)).catch(() => {});
      }
    });

    bgAudio.addEventListener('timeupdate', () => {
      if (!bgAudio.duration) return;
      const pct = (bgAudio.currentTime / bgAudio.duration) * 100;
      if (audioProgressBar) audioProgressBar.style.width = `${pct}%`;
      if (audioTimeEl) audioTimeEl.textContent = formatTime(bgAudio.currentTime);
    });

    audioProgressWrap?.addEventListener('click', (e) => {
      const rect = audioProgressWrap.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      bgAudio.currentTime = pct * bgAudio.duration;
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