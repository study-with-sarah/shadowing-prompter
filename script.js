fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    let currentIndex = 0;

    const nav = document.getElementById("episode-nav");
    const header = document.getElementById("episode-header");
    const contentDiv = document.getElementById("content");

    // 去除 [cite: xx] 标注
    function clean(text) {
      return text.replace(/\s*\[cite:[^\]]*\]/g, "");
    }

    // Audio player: invisible by default, get reused across episodes
    const audio = new Audio();

    const playerBar = document.createElement("div");
    playerBar.id = "audio-player";
    playerBar.innerHTML = `
      <button id="play-btn">▶</button>
      <span id="audio-time">0:00</span>
      <input type="range" id="audio-seek" min="0" value="0" step="0.1">
    `;
    nav.insertAdjacentElement("afterend", playerBar);

    const playBtn = document.getElementById("play-btn");
    const audioTime = document.getElementById("audio-time");
    const audioSeek = document.getElementById("audio-seek");

    function fmtTime(s) {
      const m = Math.floor(s / 60);
      return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    }

    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
      } else {
        audio.pause();
        playBtn.textContent = "▶";
      }
    });

    audio.addEventListener("loadedmetadata", () => {
      audioSeek.max = audio.duration;
      audioTime.textContent = `0:00 / ${fmtTime(audio.duration)}`;
    });

    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;
      audioSeek.value = audio.currentTime;
      audioTime.textContent = `${fmtTime(audio.currentTime)} / ${fmtTime(audio.duration)}`;
    });

    audioSeek.addEventListener("input", () => {
      audio.currentTime = audioSeek.value;
    });

    audio.addEventListener("ended", () => {
      playBtn.textContent = "▶";
    });

    // ── Navigation ────────────────────────────────────────
    const prevBtn = document.createElement("button");
    prevBtn.id = "prev-btn";
    prevBtn.textContent = "←";

    const select = document.createElement("select");
    select.id = "ep-select";
    data.forEach((ep, i) => {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = `${ep.theme}`;
      select.appendChild(opt);
    });

    const nextBtn = document.createElement("button");
    nextBtn.id = "next-btn";
    nextBtn.textContent = "→";

    nav.appendChild(prevBtn);
    nav.appendChild(select);
    nav.appendChild(nextBtn);

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) loadEpisode(currentIndex - 1);
    });
    nextBtn.addEventListener("click", () => {
      if (currentIndex < data.length - 1) loadEpisode(currentIndex + 1);
    });
    select.addEventListener("change", () => loadEpisode(Number(select.value)));

    function loadEpisode(index) {
      currentIndex = index;
      const ep = data[index];

      select.value = index;
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === data.length - 1;

      // Reset audio
      audio.pause();
      playBtn.textContent = "▶";
      audioSeek.value = 0;
      audioTime.textContent = "0:00";
      if (ep.audio) {
        audio.src = ep.audio;
        playerBar.hidden = false;
      } else {
        audio.src = "";
        playerBar.hidden = true;
      }

      // 渲染集标题
      header.innerHTML = `
        <div class="ep-theme">${ep.theme}</div>
      `;

      // 渲染台词行
      contentDiv.innerHTML = "";
      ep.lines.forEach((line) => {
        const container = document.createElement("div");
        container.className = "line-container";
        container.innerHTML = `
          <div class="text-en">${clean(line.en)}</div>
          <div class="text-zh">${clean(line.zh)}</div>
        `;
        container.addEventListener("click", () =>
          container.classList.toggle("active"),
        );
        contentDiv.appendChild(container);
      });
    }

    loadEpisode(0);
  });
