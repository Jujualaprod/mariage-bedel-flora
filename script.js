/* =========================================================
   Invitation de mariage — Bedel & Flora
   Construit la page à partir de config.js, puis gère
   l'enveloppe, les animations, le compte à rebours et la carte.
   ========================================================= */
(() => {
  'use strict';

  const C = window.INVITATION;
  if (!C) { console.error('config.js est introuvable ou contient une erreur.'); return; }

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => mqReduce.matches;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ---------- Petits générateurs ---------- */
  // Découpe un titre en mots pour l'apparition mot par mot
  const words = (text, offset = 0) =>
    String(text).trim().split(/\s+/)
      .map((w, i) => `<span class="w"><span style="--i:${i + offset}">${w}</span></span>`)
      .join(' ');

  const head = (kicker, title, intro = '', dark = false) => `
    <header class="head${dark ? ' on-dark' : ''}">
      <p class="kicker reveal">${kicker}</p>
      <h2 class="title words">${words(title)}</h2>
      <div class="divider reveal" style="--d:.3s" aria-hidden="true"><span></span><i></i><span></span></div>
      ${intro ? `<p class="lead reveal" style="--d:.4s">${intro}</p>` : ''}
    </header>`;

  const arrow = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

  const mapsEmbed = q => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&hl=fr&z=16&output=embed`;
  const mapsRoute = q => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;

  /* ---------- Sections ---------- */
  function hero() {
    const A = C.accueil, K = A.compteur;
    return `
    <section class="hero" id="accueil" aria-label="Accueil">
      <div class="hero-photo"><img src="${A.photo}" alt="${C.couple.prenom1} et ${C.couple.prenom2}" fetchpriority="high" decoding="async"></div>

      <div class="hero-top">
        <p class="kicker reveal">${A.surtitre}</p>
      </div>

      <div class="hero-mid">
        <h1 class="names words" style="--d:.25s">
          <span class="w"><span style="--i:0">${C.couple.prenom1}</span></span>
          <span class="w amp"><span style="--i:1">&amp;</span></span>
          <span class="w"><span style="--i:2">${C.couple.prenom2}</span></span>
        </h1>
        <p class="hero-date reveal" style="--d:1.1s">${C.date.court}</p>
        <p class="hero-place reveal" style="--d:1.3s">${A.lieu}</p>
      </div>

      <div class="hero-bottom">
        <p class="hero-phrase reveal" style="--d:1.5s">${A.phrase}</p>
        <div class="countdown reveal" id="countdown" style="--d:1.7s" role="timer" aria-label="Compte à rebours jusqu'au mariage">
          <div class="cd-cell"><span class="cd-num" data-cd="d">00</span><span class="cd-lab">${K.jours}</span></div>
          <div class="cd-cell"><span class="cd-num" data-cd="h">00</span><span class="cd-lab">${K.heures}</span></div>
          <div class="cd-cell"><span class="cd-num" data-cd="m">00</span><span class="cd-lab">${K.minutes}</span></div>
          <div class="cd-cell"><span class="cd-num" data-cd="s">00</span><span class="cd-lab">${K.secondes}</span></div>
        </div>
        <a class="scroll-cue reveal" href="#histoire" style="--d:2.1s"><span>${A.defiler}</span><i></i></a>
      </div>
    </section>`;
  }

  function story() {
    const S = C.histoire;
    return `
    <section class="section s-story" id="histoire">
      <div class="container">
        ${head(S.surtitre, S.titre, S.intro)}
        <div class="timeline" id="timeline">
          <span class="tl-line" aria-hidden="true"></span>
          <ol>
            ${S.etapes.map(e => `
            <li class="tl-item reveal">
              <span class="tl-dot" aria-hidden="true"></span>
              ${e.date ? `<p class="tl-date">${e.date}</p>` : ''}
              <p class="tl-label">${e.label}</p>
              <h3 class="tl-title">${e.titre}</h3>
              <p class="tl-text">${e.texte}</p>
            </li>`).join('')}
          </ol>
        </div>
      </div>
    </section>`;
  }

  function gallery() {
    const G = C.galerie;
    return `
    <section class="section s-gallery" id="galerie">
      <div class="container wide">
        ${head(G.surtitre, G.titre, G.intro, true)}
        <div class="gallery">
          ${G.photos.map(p => `
          <figure class="g-item reveal">
            <div class="g-depth"><div class="ph"><img src="${p.src}" alt="${p.alt}" loading="lazy" decoding="async"></div></div>
          </figure>`).join('')}
        </div>
      </div>
    </section>`;
  }

  function program() {
    const P = C.programme;
    return `
    <section class="section s-program" id="programme">
      <div class="container">
        ${head(P.surtitre, P.titre, P.intro)}
        <div class="program">
          ${P.moments.map(m => `
          <div class="p-item reveal">
            <div class="p-time">${m.heure}</div>
            <div class="p-rail" aria-hidden="true"></div>
            <div class="p-body">
              <h3 class="p-title">${m.titre}</h3>
              ${m.lieu ? `<p class="p-place">${m.lieu}</p>` : ''}
              <p class="p-text">${m.texte}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </section>`;
  }

  const venueInfo = l => `
    <p class="v-role">${l.role}</p>
    <h3 class="v-name">${l.nom}</h3>
    <p class="v-addr">${l.adresse}</p>`;

  function venue() {
    const L = C.lieu, first = L.lieux[0];
    return `
    <section class="section s-venue" id="lieu">
      <div class="container">
        ${head(L.surtitre, L.titre, L.intro)}
        <div class="tabs reveal" role="tablist" aria-label="Choisir un lieu">
          ${L.lieux.map((l, i) => `<button class="tab${i === 0 ? ' on' : ''}" role="tab" type="button" aria-selected="${i === 0}" data-i="${i}">${l.onglet}</button>`).join('')}
        </div>
        <div class="venue-info reveal" aria-live="polite"><div class="vi-inner" id="venueInner">${venueInfo(first)}</div></div>
        <div class="map reveal">
          <iframe id="mapFrame" title="Carte Google Maps" src="${mapsEmbed(first.recherche)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>
        <div class="route reveal">
          <a class="btn" id="routeBtn" href="${mapsRoute(first.recherche)}" target="_blank" rel="noopener">${L.bouton} ${arrow}</a>
        </div>
      </div>
    </section>`;
  }

  function dress() {
    const T = C.tenue;
    return `
    <section class="section s-dress" id="tenue">
      <div class="container">
        ${head(T.surtitre, T.titre, '', true)}
        <p class="dress-text reveal" style="--d:.3s">${T.texte}</p>
        <div class="swatches">
          ${T.couleurs.map((c, i) => `
          <div class="swatch reveal" style="--d:${(0.15 * i).toFixed(2)}s">
            <span class="dot" style="background:${c.hex}"></span>
            <span class="nm">${c.nom}</span>
          </div>`).join('')}
        </div>
        ${T.note ? `<p class="dress-note reveal">${T.note}</p>` : ''}
      </div>
    </section>`;
  }

  function rsvp() {
    const R = C.rsvp;
    const wa = R.whatsapp
      ? `<p class="rsvp-contact reveal"><a href="https://wa.me/${String(R.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent('Bonjour, j\'ai une question à propos du mariage de ' + C.couple.prenom1 + ' et ' + C.couple.prenom2 + '.')}" target="_blank" rel="noopener">${R.contactTexte}</a></p>`
      : '';
    return `
    <section class="section s-rsvp" id="presence">
      <div class="container">
        ${head(R.surtitre, R.titre)}
        <div class="rsvp-card reveal">
          <p class="rsvp-text">${R.texte}</p>
          <p class="rsvp-date">${R.dateLimite}</p>
          <a class="btn" href="${R.lien}" target="_blank" rel="noopener">${R.bouton}</a>
          ${wa}
        </div>
      </div>
    </section>`;
  }

  function footer() {
    const [a, b] = [C.couple.prenom1, C.couple.prenom2].map(n => n.trim().charAt(0).toUpperCase());
    return `
    <footer class="footer" id="merci">
      <div class="container">
        <h2 class="thanks words">${words(C.pied.merci)}</h2>
        <div class="divider reveal" style="--d:.3s" aria-hidden="true"><span></span><i></i><span></span></div>
        <p class="monogram reveal" style="--d:.2s" aria-label="${C.couple.prenom1} et ${C.couple.prenom2}">${a}<span> &amp; </span>${b}</p>
        <p class="hashtag reveal" style="--d:.3s">${C.couple.hashtag}</p>
        <p class="foot-date reveal" style="--d:.4s">${C.date.court}</p>
      </div>
    </footer>`;
  }

  /* ---------- Construction de la page ---------- */
  const main = $('#site');
  main.innerHTML = [hero(), story(), gallery(), program(), venue(), dress(), rsvp(), footer()].join('');

  document.title = `${C.couple.prenom1} & ${C.couple.prenom2} — ${C.date.court.replace(/\s·\s/g, '.')}`;

  // Textes de l'enveloppe
  const set = (sel, txt) => $$(sel).forEach(e => { e.textContent = txt; });
  set('.seal-txt', C.couple.initiales);
  set('#cardKicker', C.ouverture.carteSurtitre);
  set('#cardNames', `${C.couple.prenom1} & ${C.couple.prenom2}`);
  set('#cardDate', C.date.court);
  set('#introHint', C.ouverture.indice);
  set('#openBtn', C.ouverture.bouton);

  /* ---------- Compte à rebours ---------- */
  const cd = $('#countdown');
  const target = new Date(C.date.iso).getTime();
  const pad = n => String(n).padStart(2, '0');
  let timer = null;

  function tick() {
    if (Number.isNaN(target)) return;
    const diff = target - Date.now();
    if (diff <= 0) {
      cd.innerHTML = `<p class="cd-done">${C.accueil.compteur.termine}</p>`;
      clearInterval(timer);
      return;
    }
    const s = Math.floor(diff / 1000);
    const v = { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
    for (const k in v) {
      const el = $(`[data-cd="${k}"]`, cd);
      if (el) el.textContent = pad(v[k]);
    }
  }
  tick();
  timer = setInterval(tick, 1000);

  /* ---------- Apparition au défilement ---------- */
  function startReveals() {
    const els = $$('.reveal, .words');
    if (reduced() || !('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Frise + effet de profondeur de la galerie ---------- */
  const tl = $('#timeline');
  const tlItems = $$('.tl-item');
  const gItems = $$('.g-item').map(el => ({ el, depth: $('.g-depth', el), img: $('img', el) }));
  let ticking = false;

  function update() {
    ticking = false;
    const vh = window.innerHeight;

    if (tl) {
      if (reduced()) {
        tl.style.setProperty('--p', 1);
        tlItems.forEach(i => i.classList.add('active'));
      } else {
        const r = tl.getBoundingClientRect();
        tl.style.setProperty('--p', clamp((vh * 0.64 - r.top) / r.height, 0, 1).toFixed(4));
        tlItems.forEach(i => i.classList.toggle('active', i.getBoundingClientRect().top < vh * 0.68));
      }
    }

    if (!reduced()) {
      gItems.forEach(g => {
        const r = g.el.getBoundingClientRect();
        if (r.bottom < -120 || r.top > vh + 120) return;
        const c = clamp((r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2), -1, 1);
        g.depth.style.transform = `translate3d(0,${(c * 16).toFixed(1)}px,0)`;
        g.img.style.transform = `translate3d(0,${(-c * 9).toFixed(2)}%,0)`;
      });
    }
  }
  function requestUpdate() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  mqReduce.addEventListener?.('change', requestUpdate);

  /* ---------- Lieux : onglets, carte, itinéraire ---------- */
  const tabs = $$('.tab');
  const inner = $('#venueInner');
  const frame = $('#mapFrame');
  const routeBtn = $('#routeBtn');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const l = C.lieu.lieux[+tab.dataset.i];
    if (!l || tab.classList.contains('on')) return;
    tabs.forEach(t => { const on = t === tab; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
    inner.classList.add('swap');
    setTimeout(() => { inner.innerHTML = venueInfo(l); inner.classList.remove('swap'); }, reduced() ? 0 : 400);
    frame.src = mapsEmbed(l.recherche);
    routeBtn.href = mapsRoute(l.recherche);
  }));

  /* ---------- Ouverture de l'enveloppe ---------- */
  const intro = $('#intro');
  const openBtn = $('#openBtn');
  const envelope = $('#envelope');
  let opened = false;

  // L'enveloppe n'apparaît qu'une fois les polices prêtes (évite un saut visuel)
  const fontsReady = document.fonts && document.fonts.load
    ? Promise.all([document.fonts.load('1em "Pinyon Script"'), document.fonts.load('1em "Cinzel"')])
    : Promise.resolve();
  Promise.race([fontsReady, new Promise(r => setTimeout(r, 2200))])
    .catch(() => {})
    .then(() => intro.classList.add('is-ready'));

  function enterSite() {
    document.body.classList.remove('locked');
    document.body.classList.add('site-on');
    main.removeAttribute('inert');
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    startReveals();
    update();
  }

  function openInvitation() {
    if (opened) return;
    opened = true;
    openBtn.disabled = true;

    if (reduced()) {
      intro.classList.add('is-leaving');
      enterSite();
      setTimeout(() => intro.remove(), 400);
      return;
    }

    intro.classList.add('is-opening');                          // le cachet se brise
    setTimeout(() => intro.classList.add('is-flap'), 450);      // le rabat s'ouvre
    setTimeout(() => intro.classList.add('is-card'), 1350);     // la carte sort
    setTimeout(() => { intro.classList.add('is-leaving'); enterSite(); }, 3400); // fondu vers le site
    setTimeout(() => intro.remove(), 5200);
  }

  openBtn.addEventListener('click', openInvitation);
  envelope.addEventListener('click', openInvitation);
})();
