const bodyBg = document.querySelector('.body__background');
const player = document.querySelector('.player');
const playerInner = player.querySelector('.player__inner');
const playerBtnInner = player.querySelector('.player__btn-inner');
const input = player.querySelector('input[type="range"]');
const songName = player.querySelector('.player__name');
const songTitle = player.querySelector('.player__title');
const songImg = player.querySelector('.player__img');
const btnImg = player.querySelector('.player__btn--play');
const audio = player.querySelector('.audio');
let elemCurrTime = player.querySelector('.player__current-time');
let elemDuration = player.querySelector('.player__duration');

const songs = [
  {
    name: 'AC / DC',
    title: 'Thunderstruck',
    src: 'AC DC - Thunderstruck',
    img: 'acdc-img',
    background: 'poster-acdc',
    duration: '04 : 52',
  },
  {
    name: 'Skillet',
    title: 'Monster',
    src: 'Skillet - Monster',
    img: 'skillet-img',
    background: 'poster-skillet',
    duration: '02 : 58',
  },
  {
    name: 'Queen',
    title: 'Bohemian Rhapsody',
    src: 'Queen - Bohemian Rhapsody',
    img: 'queen-img',
    background: 'poster-queen',
    duration: '05 : 54',
  },
  {
    name: 'Skillet',
    title: 'Awake and Alive',
    src: 'Skillet - Awake and Alive',
    img: 'skillet-img',
    background: 'poster-skillet',
    duration: '03 : 29',
  },
  {
    name: 'Three Days Grace',
    title: 'Painkiller',
    src: 'Three Days Grace - Painkiller',
    img: 'threeDaysGrace-img',
    background: 'poster-threeDaysGrace',
    duration: '02 : 59',
  },
  {
    name: 'Catharsis',
    title: 'Hold Fast',
    src: 'Catharsis - Hold Fast',
    img: 'catharsis-img',
    background: 'poster-catharsis',
    duration: '03 : 44',
  },
  {
    name: 'Fall Out Boy',
    title: 'Immortals',
    src: 'Fall Out Boy - Immortals',
    img: 'fallOutBoy-img',
    background: 'poster-fallOutBoy',
    duration: '03 : 09',
  },
  {
    name: 'Scorpions',
    title: 'Still Loving You',
    src: 'Scorpions - Still Loving You',
    img: 'scorpions-img',
    background: 'poster-scorpions',
    duration: '06 : 26',
  },
  {
    name: 'Sonata Arctica',
    title: 'Full Moon',
    src: 'Sonata Arctica - Full Moon',
    img: 'sonataArctica-img',
    background: 'poster-sonataArctica',
    duration: '05 : 06',
  },
  {
    name: 'Three Days Grace',
    title: 'Animal I Have Become',
    src: 'Three Days Grace - Animal I Have Become',
    img: 'threeDaysGrace-img',
    background: 'poster-threeDaysGrace',
    duration: '03 : 51',
  },
];

let isPlay = false;

let songIndex = 0;

const createSong = (song) => {
  songImg.src = `assets/img/${song.img}.jpg`
  songName.textContent = song.name;
  songTitle.textContent = song.title;
  audio.src = `assets/audio/${song.src}.mp3`;
  elemDuration.textContent = song.duration;
  bodyBg.src = `./assets/img/${song.background}.jpg`;
}

const changeProgress = () => {
  let duration = Math.trunc(audio.duration);
  let currentTime = Math.trunc(audio.currentTime);
  let minute = Math.floor(currentTime / 60);
  let sec = Math.floor(currentTime % 60);
  const percent = currentTime / duration * 100;
  input.style.backgroundSize = `${percent}% 100%`;  
  input.max = duration;
  input.value = currentTime;
  if(currentTime === duration) {
    if (songIndex === songs.length - 1) {
      songIndex = -1;
    }
    
    songIndex++;
    createSong(songs[songIndex]);
    audio.play();
  }

  if(minute < 10 ) {
    minute = '0' + minute;
  }

  if (sec < 10) {
    sec = '0' + sec;
  }
  elemCurrTime.textContent = `${minute} : ${sec}`;
}

const setProgress = () => {
  audio.currentTime = input.value;
}

const playAudio = (evt) => {
  duration = audio.duration;
  let target = evt.target;
  
  if(target.classList.contains('player__btn--play') && isPlay === false) {
    duration = audio.duration;
    isPlay = true;
    btnImg.classList.add('active');
    audio.play();
  } else {
    isPlay = false;
    btnImg.classList.remove('active');
    audio.pause();
  }
}

const switchSongs = (evt) => {
  let target = evt.target;
  duration = audio.duration;
  if(target.classList.contains('player__btn--next')) {
    isPlay = true;
    if (songIndex === songs.length - 1) {
      songIndex = -1;
    }
    if(isPlay === true) {
      btnImg.classList.add('active');
    }

    songIndex++;
    createSong(songs[songIndex]);
    audio.play();
  }

  if(target.classList.contains('player__btn--prev')) {
    isPlay = true;
    if (songIndex === 0) {
      songIndex = songs.length;
    }
    if(isPlay === true) {
      btnImg.classList.add('active');
    }

    songIndex--;
    createSong(songs[songIndex]);
    audio.play();
  }
}

audio.addEventListener('timeupdate', changeProgress);
input.addEventListener('input', setProgress);
playerBtnInner.addEventListener('click', playAudio);
playerBtnInner.addEventListener('click', switchSongs);