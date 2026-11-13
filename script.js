/* ===== PENGATURAN: ganti nilai di bawah ini ===== */
const CONFIG = {
  // YouTube: isi ID playlist, ID video, atau link lengkap dari YouTube
  youtube: "https://youtu.be/ZV3hvogtX5I?si=EsO67NYA4FkbTTKU",
  youtubeType: "video",

  // Spotify: isi bagian setelah open.spotify.com/ (tanpa tanda tanya dan seterusnya)
  spotify: "playlist/37i9dQZF1DXcBWIGoYBM5M",  // contoh: "show/4rOoJ6Egrf8K2IrywzwOMk" atau "playlist/37i9dQZF1DXcBWIGoYBM5M"

  // Link unduh aplikasi
  playStore: "https://lingua-edu-copy-4f8d5c2e.base44.app/",
  appStore: "https://lingua-edu-copy-4f8d5c2e.base44.app/",

  // Email tujuan form kontak
  email: "linguaeducation.1@gmail.com",

  // Tombol "Buka di YouTube / Spotify" di halaman masing-masing (kosongkan untuk menyembunyikan)
  youtubeLink: "https://youtu.be/ZV3hvogtX5I?si=EsO67NYA4FkbTTKU",
  spotifyLink: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
};

(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* Menu mobile */
  const toggle = $(".nav-toggle");
  const menu = $("#menu");
  if (toggle && menu) {
    const setMenu = open => {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open);
    };
    toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
    $$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));
  }

  /* Tandai menu sesuai bagian yang sedang dilihat */
  const links = $$('#menu a[href^="#"]');
  const sections = $$('main section[id]');
  if (links.length && sections.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => spy.observe(s));
  }

  /* Filter program belajar */
  const tabs = $$(".tab");
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => {
      t.classList.toggle("active", t === tab);
      t.setAttribute("aria-selected", t === tab);
    });
    $$(".row").forEach(row => {
      row.hidden = tab.dataset.filter !== "all" && row.dataset.cat !== tab.dataset.filter;
    });
  }));

  /* Embed YouTube dan Spotify */
  const render = (selector, src, title, emptyText) => {
    const box = $(selector);
    if (!box) return;
    box.innerHTML = src
      ? `<iframe src="${src}" title="${title}" loading="lazy" allowfullscreen
           allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`
      : `<p class="embed-empty">${emptyText}</p>`;
  };

  const normalizeYouTubeValue = (value, type = "video") => {
    if (!value) return "";
    const raw = String(value).trim();
    if (!raw) return "";

    if (type === "playlist") {
      const listMatch = raw.match(/[?&]list=([A-Za-z0-9_-]+)/i) || raw.match(/(?:^|[/?#])((?:PL|UU|LL|RD)[A-Za-z0-9_-]+)/i);
      return listMatch ? listMatch[1] : raw;
    }

    const videoMatch = raw.match(/[?&]v=([A-Za-z0-9_-]{11})/i)
      || raw.match(/(?:youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/i)
      || raw.match(/^([A-Za-z0-9_-]{11})$/i);
    return videoMatch ? videoMatch[1] : raw.replace(/[^A-Za-z0-9_-]/g, "");
  };

  const youtubeId = normalizeYouTubeValue(CONFIG.youtube, CONFIG.youtubeType);
  const yt = youtubeId && (CONFIG.youtubeType === "playlist"
    ? `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(youtubeId)}&rel=0`
    : `https://www.youtube.com/embed/${youtubeId}?rel=0`);
  const sp = CONFIG.spotify && `https://open.spotify.com/embed/${CONFIG.spotify}`;

  const youtubeBox = document.querySelector("#youtube");
  if (youtubeBox && location.protocol === "file:") {
    const targetUrl = CONFIG.youtubeLink || `https://youtu.be/${youtubeId}`;
    youtubeBox.innerHTML = `
      <a class="yt-preview" href="${targetUrl}" target="_blank" rel="noopener noreferrer" aria-label="Tonton video di YouTube">
        <img src="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" alt="Thumbnail video pembelajaran Linguaedu" loading="lazy">
        <span class="play-badge">▶</span>
        <span class="video-label">Tonton video pembelajaran</span>
      </a>
    `;
  } else {
    render("#youtube", yt, "Video YouTube", "Isi ID YouTube di script.js untuk menampilkan video.");
  }

  render("#spotify", sp, "Pemutar Spotify", "Isi link Spotify di script.js untuk menampilkan pemutar.");

  /* Link aplikasi dan email */
  const playStoreLink = $("#playstore");
  const appStoreLink = $("#appstore");
  if (playStoreLink) playStoreLink.href = CONFIG.playStore;
  if (appStoreLink) appStoreLink.href = CONFIG.appStore;
  // Semua elemen bertanda data-download (tombol hero, mockup aplikasi) langsung menuju link unduh
  $$("[data-download]").forEach(a => { a.href = CONFIG.playStore; });

  const mail = $("#email-link");
  if (mail) {
    mail.href = "mailto:" + CONFIG.email;
    mail.textContent = CONFIG.email;
  }

  /* Form kontak: membuka aplikasi email dengan pesan terisi */
  const form = $("#form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const f = new FormData(e.target);
      const subject = encodeURIComponent("Pesan dari " + f.get("nama"));
      const body = encodeURIComponent(`${f.get("pesan")}\n\n${f.get("nama")} (${f.get("email")})`);
      location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    });
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
})();

/* Animasi muncul saat di-scroll + tombol halaman media */
(() => {
  document.documentElement.classList.add("js");
  const items = [...document.querySelectorAll(".qcard,.facts,.row,.media-card,.devices,.form,.embed")];
  items.forEach((el, i) => { el.classList.add("reveal"); el.style.transitionDelay = (i % 4) * 70 + "ms"; });
  const show = el => {
    el.classList.add("in");
    setTimeout(() => { el.classList.remove("reveal", "in"); el.style.transitionDelay = ""; }, 1000);
  };
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    }), { threshold: .15 });
    items.forEach(el => io.observe(el));
  } else items.forEach(show);
  [["#yt-open", "youtubeLink"], ["#sp-open", "spotifyLink"]].forEach(([s, k]) => {
    const a = document.querySelector(s);
    if (a && CONFIG[k]) { a.href = CONFIG[k]; a.hidden = false; }
  });
})();

/* Slideshow latar hero: otomatis ganti, bisa diklik titiknya, bisa digeser di HP */
(() => {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dotsBox = document.querySelector(".hero-dots");
  const hero = document.querySelector(".hero");
  if (slides.length < 2 || !dotsBox || !hero) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const INTERVAL = 6000; // ms, ubah untuk mempercepat atau memperlambat
  let i = 0, timer, x0 = null;

  const go = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle("active", k === i));
    dots.forEach((d, k) => d.classList.toggle("active", k === i));
  };
  const play = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => go(i + 1), INTERVAL); };

  const dots = slides.map((_, n) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Gambar " + (n + 1));
    b.addEventListener("click", () => { go(n); play(); });
    dotsBox.appendChild(b);
    return b;
  });

  hero.addEventListener("mouseenter", () => clearInterval(timer));
  hero.addEventListener("mouseleave", play);
  hero.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener("touchend", e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) { go(i + (dx < 0 ? 1 : -1)); play(); }
    x0 = null;
  });

  go(0);
  play();
})();
