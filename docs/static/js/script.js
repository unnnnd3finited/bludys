const commonGifs = [
  "static/gifs/hi.gif",
  "static/gifs/hello.gif",
  "static/gifs/yo.gif",
];

const songs = [
  {
    title: "nope your too late i already died (slowed)",
    artist: "wifiskeleton",
    src: "static/songs/deds.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "from the start (speed up)",
    artist: "laufey",
    src: "static/songs/start.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "Reminisce",
    artist: "blackedy",
    src: "static/songs/remi.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "8am",
    artist: "blackedy",
    src: "static/songs/8am.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "intentions",
    artist: "blackedy",
    src: "static/songs/inte.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "wondering",
    artist: "blackedy",
    src: "static/songs/wond.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "hostile",
    artist: "blackedy",
    src: "static/songs/host.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "love u my way 2",
    artist: "blackedy",
    src: "static/songs/myway.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "glued 2 u",
    artist: "666swish",
    src: "static/songs/glued.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "505 (slowed)",
    artist: "artic monkeys",
    src: "static/songs/505.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "Pretty Girl (slowed + reverb)",
    artist: "Clairo",
    src: "static/songs/pretty.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
    {
    title: "bakground",
    artist: "Gotham love",
    src: "static/songs/bak.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
      {
    title: "i wish that everything would stop",
    artist: "666swish",
    src: "static/songs/wish.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "Ethereal",
    artist: "mikeeysmind",
    src: "static/songs/ethe.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "Tek it",
    artist: "Cafunè",
    src: "static/songs/tek.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "nope your too late i already died",
    artist: "wifiskeleton",
    src: "static/songs/ded.mp3",
    plays: 0,
    favorite: false,
    weeklySession: true,
  },
  {
    title: "strangers",
    artist: "proderics",
    src: "static/songs/strange.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "i threw a rock off an overpass and killed a guy",
    artist: "sign crushes motorist",
    src: "static/songs/tweak.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "Nuts (slowed)",
    artist: "Lil peep",
    src: "static/songs/nutss.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "Nuts (extended + sped up)",
    artist: "Lil peep",
    src: "static/songs/nuts.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "The love I lost (slowed + extended version)",
    artist: "Fried by flouride",
    src: "static/songs/lost.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "Skin",
    artist: "otuka",
    src: "static/songs/skin.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  {
    title: "August 10 (slowed + reverb)",
    artist: "Julie Doiron",
    src: "static/songs/august.mp3",
    plays: 0,
    favorite: true,
    weeklySession: true,
  },
  // altre canzoni qui...
];

// Aggiungiamo a ogni canzone le gif comuni
songs.forEach(song => {
  song.coverGifs = commonGifs;
});

// Carica plays salvati se ci sono
function loadPlaysFromStorage() {
  const storedPlays = localStorage.getItem('songPlays');
  if (storedPlays) {
    const playsData = JSON.parse(storedPlays);
    songs.forEach(song => {
      if (playsData[song.title] !== undefined) {
        song.plays = playsData[song.title];
      }
    });
  }
}
loadPlaysFromStorage();

function savePlaysToStorage() {
  const playsData = {};
  songs.forEach(song => {
    playsData[song.title] = song.plays;
  });
  localStorage.setItem('songPlays', JSON.stringify(playsData));
}

let currentSongIndex = 0;
let isPlaying = false;
let shuffle = false;
let repeat = false;
let audio = new Audio();
let coverInterval = null;
let currentGifIndex = 0;

const coverImg = document.getElementById("cover");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const shuffleBtn = document.getElementById("shuffle");
const repeatBtn = document.getElementById("repeat");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const menuBtn = document.getElementById("menu-btn");
const dropdown = document.getElementById("dropdown");

const searchInput = document.getElementById("search-input");
const mostListenedEl = document.getElementById("most-listened");
const weeklySessionsEl = document.getElementById("weekly-sessions");
const favoritesEl = document.getElementById("favorites");
const allSongsEl = document.getElementById("all-songs");

function loadSong(index) {
  const song = songs[index];
  currentSongIndex = index;
  audio.src = song.src;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  currentGifIndex = 0;
  clearInterval(coverInterval);
  updateCoverGif();
  if (song.coverGifs.length > 1) {
    coverInterval = setInterval(() => {
      currentGifIndex = (currentGifIndex + 1) % song.coverGifs.length;
      updateCoverGif();
    }, 5000);
  }
  // Cambia il titolo della pagina
  document.title = song.title + " - " + song.artist;
}

function updateCoverGif() {
  coverImg.src = songs[currentSongIndex].coverGifs[currentGifIndex];
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';

  // Incrementa il contatore plays quando parte la canzone
  songs[currentSongIndex].plays++;

  // Salva nel localStorage dopo aver aggiornato
  savePlaysToStorage();

  // Aggiorna le liste
  renderMostListened();
  renderWeeklySessions();
  renderFavorites();
  renderAllSongs();
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function togglePlay() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function prevSong() {
  if (shuffle) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex--;
    if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
  }
  loadSong(currentSongIndex);
  playSong();
}

function nextSong() {
  if (shuffle) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
  playSong();
}

function toggleShuffle() {
  shuffle = !shuffle;
  shuffleBtn.classList.toggle("active", shuffle);
}

function toggleRepeat() {
  repeat = !repeat;
  repeatBtn.classList.toggle("active", repeat);
}

audio.addEventListener("ended", () => {
  if (repeat) {
    playSong();
  } else {
    nextSong();
  }
});

audio.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audio;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let currentM = Math.floor(currentTime / 60);
    let currentS = Math.floor(currentTime % 60);
    if (currentS < 10) currentS = "0" + currentS;

    let durM = Math.floor(duration / 60);
    let durS = Math.floor(duration % 60);
    if (durS < 10) durS = "0" + durS;

    currentTimeEl.textContent = `${currentM}:${currentS}`;
    durationEl.textContent = `${durM}:${durS}`;
  }
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
shuffleBtn.addEventListener("click", toggleShuffle);
repeatBtn.addEventListener("click", toggleRepeat);

menuBtn.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
  searchInput.value = "";
  renderAllSongs(songs);
});

function renderSongList(container, list) {
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<li>Nessuna canzone</li>";
    return;
  }
  list.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist} (plays: ${song.plays})`;
    li.addEventListener("click", () => {
      loadSong(songs.indexOf(song));
      playSong();
      dropdown.classList.add("hidden");
    });
    container.appendChild(li);
  });
}

function renderAllSongs(list = songs) {
  renderSongList(allSongsEl, list);
}

function renderMostListened() {
  const sorted = [...songs].sort((a, b) => b.plays - a.plays);
  renderSongList(mostListenedEl, sorted.slice(0, 5));
}

function renderWeeklySessions() {
  const weekly = songs.filter((s) => s.weeklySession);
  renderSongList(weeklySessionsEl, weekly);
}

function renderFavorites() {
  const favs = songs.filter((s) => s.favorite);
  renderSongList(favoritesEl, favs);
}

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = songs.filter(
    (s) =>
      s.title.toLowerCase().includes(term) ||
      s.artist.toLowerCase().includes(term)
  );
  renderSongList(allSongsEl, filtered);
});

renderMostListened();
renderWeeklySessions();
renderFavorites();
renderAllSongs();

// Carica la prima canzone all'avvio
loadSong(0);
