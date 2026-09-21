/* Brandwave Haus — complete site interactions. No build step required. */
(() => {
  "use strict";

  const navToggle = document.getElementById("nav-toggle");
  const navButton = document.querySelector(".nav-button");
  const syncMenu = () => navButton?.setAttribute("aria-expanded", String(!!navToggle?.checked));
  navToggle?.addEventListener("change", syncMenu);
  navButton?.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navToggle.checked = !navToggle.checked;
      syncMenu();
    }
  });
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      if (navToggle) navToggle.checked = false;
      syncMenu();
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navToggle?.checked) {
      navToggle.checked = false;
      syncMenu();
      navButton?.focus();
    }
  });

  /* CONTACT — FormSubmit AJAX keeps visitors on this page. */
  const form = document.querySelector(".contact-form");
  if (form) {
    const button = form.querySelector(".submit-button");
    const status = form.querySelector(".form-status");
    const buttonText = button.innerHTML;
    let sending = false;
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (sending) return;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      sending = true;
      button.disabled = true;
      button.textContent = "Sending enquiry…";
      form.setAttribute("aria-busy", "true");
      status.className = "form-status";
      status.textContent = "";
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      try {
        const response = await fetch("https://formsubmit.co/ajax/nasreennazar@brandwavehaus.com", {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
          signal: controller.signal
        });
        const result = await response.json();
        if (!response.ok || ![true, "true"].includes(result.success)) {
          throw new Error("Submission was not accepted");
        }
        form.reset();
        status.classList.add("is-success");
        status.textContent = "Thank you. Your enquiry has been sent successfully. We’ll be in touch soon.";
      } catch (error) {
        status.classList.add("is-error");
        status.textContent = "We couldn’t send your enquiry just now. Please email info@brandwavehaus.com and we’ll get back to you.";
      } finally {
        clearTimeout(timeout);
        sending = false;
        button.disabled = false;
        button.innerHTML = buttonText;
        form.removeAttribute("aria-busy");
      }
    });
  }

  /* WORK — keep the carousel and cinematic player on one approved source list. */
  const allVideoIds = [
    "E7znSK4I4a8", "s_jIQGgLkqw", "k8FMybLJoVU", "6zsE9mH-yyk",
    "SzWGiMlw9vs", "hh5cMMWTzuU", "u1WVA97LZF8", "9B4umKSk0-g",
    "O3Q0_q4TSXM", "xXkGI9s5FR0", "kxy9eNbpNic", "hyvojaX4d4w",
    "xEPIr9BpD5Y", "THZbAarEcdA", "slfnhUzeXzw", "T-rdDiLk0hI"
  ];

  const youtubeTrack = document.querySelector(".youtube-track");
  if (youtubeTrack) {
    const card = (id, duplicate = false) => `
      <a class="youtube-card" href="https://www.youtube.com/watch?v=${id}"
         target="_blank" rel="noopener noreferrer"
         ${duplicate ? 'aria-hidden="true" tabindex="-1"' : ""}>
        <img src="https://i.ytimg.com/vi/${id}/maxresdefault.jpg"
             alt="${duplicate ? "" : "Brandwave Haus project"}">
        <span class="youtube-play-hint">
          <i class="fa-brands fa-youtube" aria-hidden="true"></i> View Project
        </span>
      </a>`;
    youtubeTrack.innerHTML = [
      ...allVideoIds.map(id => card(id)),
      ...allVideoIds.map(id => card(id, true))
    ].join("");
  }

  /* CLIENTS — the original logo set is completely replaced here. */
  const clients = [
    ["https://user34551.na.imgto.link/public/20260921/screenshot-2026-08-28-161548.avif", "United Motors"],
    ["https://user34551.na.imgto.link/public/20260921/seva-logo.avif", "SEVA"],
    ["https://user34551.na.imgto.link/public/20260921/sealed-air-new.avif", "Sealed Air"],
    ["https://user34551.na.imgto.link/public/20260921/screenshot-2026-09-21-at-10-48-23-am-1.avif", "Aptitude Cafe"],
    ["./relictum.png", "Relictum"],
    ["./aix-investment-group.png", "AIX Investment Group"],
    ["./sharjah-children.png", "Sharjah Children"],
    ["https://user34551.na.imgto.link/public/20260921/sharjah-book-authority.avif", "Sharjah Book Authority"],
    ["https://user34551.na.imgto.link/public/20260921/parivar-restaurant.avif", "Parivar Restaurant"],
    ["./mkn-global.jpeg", "MKN Global"],
    ["https://user34551.na.imgto.link/public/20260921/mizu-j-restaurant.avif", "Mizu"],
    ["https://user34551.na.imgto.link/public/20260921/manzo-sushi.avif", "Manzo Sushi"],
    ["https://user34551.na.imgto.link/public/20260921/lyla-blanc.avif", "Lyla Blanc"],
    ["https://user34551.na.imgto.link/public/20260921/logo-128337307.avif", "AIM"],
    ["https://user34551.na.imgto.link/public/20260921/gonpachi-300x300.avif", "Gonpachi"],
    ["https://user34551.na.imgto.link/public/20260921/expo-logo.avif", "Expo"],
    ["https://user34551.na.imgto.link/public/20260921/elite-private-school-logo.avif", "Elite Private School"],
    ["https://user34551.na.imgto.link/public/20260921/daarzood.avif", "Daar Zood"],
    ["./baraka.jpeg", "Baraka"],
    ["./al-faridah-building.png", "Al Faridah Building"],
    ["https://user34551.na.imgto.link/public/20260921/al-bayt-mitwahid-logo.avif", "Al Bayt Mitwahid"],
    ["https://user34551.na.imgto.link/public/20260921/ahic-logo-scaled.avif", "AHIC"]
  ];

  const clientTrack = document.querySelector(".client-track");
  if (clientTrack) {
    const wideClients = new Set([0, 2, 3, 5, 7, 9, 12, 16, 19, 20, 21]);
    const logo = ([src, alt], index, duplicate = false) => `
      <div class="client-item${wideClients.has(index) ? " client-wide" : ""}"
           ${duplicate ? 'aria-hidden="true"' : ""}>
        <img src="${src}" alt="${duplicate ? "" : alt}">
      </div>`;
    clientTrack.innerHTML = [
      ...clients.map((client, index) => logo(client, index)),
      ...clients.map((client, index) => logo(client, index, true))
    ].join("");
  }

  /* YouTube sometimes returns a tiny placeholder rather than a failed request. */
  document.querySelectorAll(".youtube-card img").forEach(image => {
    const fallback = () => {
      if (image.dataset.fallbackApplied === "true") return;
      const match = image.src.match(/\/vi\/([^/]+)\//);
      if (!match) return;
      image.dataset.fallbackApplied = "true";
      image.src = `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg`;
    };
    image.addEventListener("error", fallback);
    image.addEventListener("load", () => {
      if (image.naturalWidth <= 120) fallback();
    });
    if (image.complete && image.naturalWidth <= 120) fallback();
  });

  /* OUR WORK IN MOTION — original approved order, 1 → 12 → 1. */
  const workVideoIds = allVideoIds;
  const mount = document.getElementById("workVideoPlayer");
  if (!mount) return;
  const wrap = document.querySelector(".work-video-wrap");
  let player;
  let currentIndex = 0;
  let advanceTimer = null;
  let consecutiveErrors = 0;

  // Size against the actual section, preserving a 16:9 cover crop at any viewport.
  function sizePlayer() {
    const width = Math.max(wrap.clientWidth, wrap.clientHeight * 16 / 9);
    wrap.style.setProperty("--video-width", `${Math.ceil(width)}px`);
    wrap.style.setProperty("--video-height", `${Math.ceil(width * 9 / 16)}px`);
  }
  sizePlayer();
  if (window.ResizeObserver) new ResizeObserver(sizePlayer).observe(wrap);
  else window.addEventListener("resize", sizePlayer);

  function playNext(delay = 0) {
    if (!player || advanceTimer !== null) return;
    advanceTimer = setTimeout(() => {
      advanceTimer = null;
      currentIndex = (currentIndex + 1) % workVideoIds.length;
      player.mute();
      player.loadVideoById({ videoId: workVideoIds[currentIndex], startSeconds: 0 });
    }, delay);
  }

  function createPlayer() {
    if (player || !window.YT?.Player) return;
    const playerVars = {
      autoplay: 1, mute: 1, controls: 0, playsinline: 1,
      rel: 0, disablekb: 1, fs: 0, iv_load_policy: 3
    };
    if (/^https?:$/.test(window.location.protocol)) playerVars.origin = window.location.origin;
    player = new window.YT.Player("workVideoPlayer", {
      videoId: workVideoIds[0],
      playerVars,
      events: {
        onReady(event) {
          const iframe = event.target.getIframe();
          iframe.title = "Brandwave Haus Work in Motion";
          iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
          iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
          iframe.setAttribute("tabindex", "-1");
          sizePlayer();
          event.target.mute();
          event.target.playVideo();
        },
        onStateChange(event) {
          if (event.data === window.YT.PlayerState.PLAYING) consecutiveErrors = 0;
          if (event.data === window.YT.PlayerState.ENDED) playNext();
        },
        onError() {
          // Skip unavailable/non-embeddable videos. Back off if all videos fail.
          consecutiveErrors += 1;
          playNext(consecutiveErrors >= workVideoIds.length ? 30000 : 250);
        },
        onAutoplayBlocked() {
          // Some mobile browsers require a user gesture even for muted video.
          const resume = () => { player.mute(); player.playVideo(); };
          document.addEventListener("pointerdown", resume, { once: true });
        }
      }
    });
  }

  const previousReady = window.onYouTubeIframeAPIReady;
  window.onYouTubeIframeAPIReady = () => {
    try { if (typeof previousReady === "function") previousReady(); }
    finally { createPlayer(); }
  };
  if (window.YT?.Player) createPlayer();
  else if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  }
})();
