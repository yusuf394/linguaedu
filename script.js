/* ===== PENGATURAN: ganti nilai di bawah ini ===== */
const CONFIG = {
  // YouTube: isi ID playlist (diawali "PL") atau ID video, lalu pilih tipenya
  youtube: "ScMzIvxBSi4",   // contoh playlist: "PLxxxxxxxxxxxxxxxx" | contoh video: "dQw4w9WgXcQ"
  youtubeType: "video",      // "playlist" atau "video"

  // Spotify: isi bagian setelah open.spotify.com/ (tanpa tanda tanya dan seterusnya)
  spotify: "playlist/37i9dQZF1DXcBWIGoYBM5M",  // contoh: "show/4rOoJ6Egrf8K2IrywzwOMk" atau "playlist/37i9dQZF1DXcBWIGoYBM5M"

  // Link unduh aplikasi
  playStore: "https://lingua-edu-copy-4f8d5c2e.base44.app/",
  appStore: "https://lingua-edu-copy-4f8d5c2e.base44.app/",

  // Email tujuan form kontak
  email: "halo@namabrand.com",

  // Tombol "Buka di YouTube / Spotify" di halaman masing-masing (kosongkan untuk menyembunyikan)
  youtubeLink: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
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

  const yt = CONFIG.youtube && (CONFIG.youtubeType === "video"
    ? `https://www.youtube-nocookie.com/embed/${CONFIG.youtube}`
    : `https://www.youtube-nocookie.com/embed/videoseries?list=${CONFIG.youtube}`);
  const sp = CONFIG.spotify && `https://open.spotify.com/embed/${CONFIG.spotify}`;

  render("#youtube", yt, "Video YouTube", "Isi ID YouTube di script.js untuk menampilkan video.");
  render("#spotify", sp, "Pemutar Spotify", "Isi link Spotify di script.js untuk menampilkan pemutar.");

  /* Link aplikasi dan email */
  const playStoreLink = $("#playstore");
  const appStoreLink = $("#appstore");
  if (playStoreLink) playStoreLink.href = CONFIG.playStore;
  if (appStoreLink) appStoreLink.href = CONFIG.appStore;

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