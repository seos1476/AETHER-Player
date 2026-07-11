/* ==========================================
   AETHER Player Controls v2.0
========================================== */

console.log("🎵 Player Controls Loaded");

const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");

const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

const volumeSlider = document.getElementById("volumeSlider");

let isPlaying = false;

/* ==========================
   PLAY / PAUSE
========================== */

if (playBtn) {

    playBtn.addEventListener("click", () => {

        if (!audio.src) return;

        if (audio.paused) {

            audio.play();
            playBtn.innerHTML = "⏸";
            isPlaying = true;

        } else {

            audio.pause();
            playBtn.innerHTML = "▶";
            isPlaying = false;

        }

    });

}

/* ==========================
   PREVIOUS
========================== */

if (prevBtn) {

    prevBtn.addEventListener("click", () => {

        if (typeof playSong === "function") {

            currentSong--;

            if (currentSong < 0)
                currentSong = songs.length - 1;

            playSong(currentSong);

        }

    });

}

/* ==========================
   NEXT
========================== */

if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        if (typeof playSong === "function") {

            currentSong++;

            if (currentSong >= songs.length)
                currentSong = 0;

            playSong(currentSong);

        }

    });

}

/* ==========================
   TIME FORMAT
========================== */

function formatTime(seconds) {

    if (isNaN(seconds)) return "0:00";

    const min = Math.floor(seconds / 60);

    const sec = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${min}:${sec}`;

}

/* ==========================
   UPDATE PROGRESS
========================== */

audio.addEventListener("timeupdate", () => {

    const percent =
        (audio.currentTime / audio.duration) * 100;

    if (progressFill)
        progressFill.style.width = percent + "%";

    if (currentTimeText)
        currentTimeText.textContent =
            formatTime(audio.currentTime);

    if (durationText)
        durationText.textContent =
            formatTime(audio.duration);

});

/* ==========================
   SEEK
========================== */

if (progress) {

    progress.addEventListener("click", (e) => {

        const rect = progress.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const percent = x / rect.width;

        audio.currentTime =
            percent * audio.duration;

    });

}

/* ==========================
   VOLUME
========================== */

if (volumeSlider) {

    volumeSlider.addEventListener("input", () => {

        audio.volume = volumeSlider.value;

    });

}

/* ==========================
   SONG ENDED
========================== */

audio.addEventListener("ended", () => {

    if (typeof playSong === "function") {

        currentSong++;

        if (currentSong >= songs.length)
            currentSong = 0;

        playSong(currentSong);

    }

});
const shuffleBtn=document.getElementById("shuffleBtn");

const repeatBtn=document.getElementById("repeatBtn");

if(shuffleBtn){

shuffleBtn.onclick=()=>{

shuffle=!shuffle;

shuffleBtn.style.color=

shuffle?"#8b5cf6":"white";

};

}

if(repeatBtn){

repeatBtn.onclick=()=>{

repeat=!repeat;

repeatBtn.style.color=

repeat?"#8b5cf6":"white";

};

}
