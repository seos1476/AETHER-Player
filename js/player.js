/* ==========================================
   AETHER Player v3.0
========================================== */

console.log("🎵 AETHER Player Loaded");

/* ==========================
   LOCAL PLAYER
========================== */

const audio = document.getElementById("audioPlayer");

const playBtn = document.getElementById("playPauseBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");

const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");

const volumeSlider = document.getElementById("volumeSlider");

const spotifyLogin =
document.getElementById("spotifyLogin");

let isPlaying = false;

let spotifyPlayer = null;

let spotifyReady = false;
/* ==========================
   SPOTIFY LOGIN
========================== */

if (spotifyLogin) {

spotifyLogin.addEventListener("click", () => {

window.location.href =
"https://spotify-auth-flow--seos1476.replit.app/api/spotify/login";

});

}
/* ==========================
   PLAY / PAUSE
========================== */

if (playBtn) {

    playBtn.addEventListener("click", async () => {

        // Spotify Player Active
        if (spotifyReady && spotifyPlayer) {

            spotifyPlayer.togglePlay();
            return;

        }

        // Local Player
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

    prevBtn.addEventListener("click", async () => {

        // Spotify
        if (spotifyReady && spotifyPlayer) {

            await fetch(
                "https://spotify-auth-flow--seos1476.replit.app/api/spotify/previous",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            return;

        }

        // Local Player
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

    nextBtn.addEventListener("click", async () => {

        // Spotify
        if (spotifyReady && spotifyPlayer) {

            await fetch(
                "https://spotify-auth-flow--seos1476.replit.app/api/spotify/next",
                {
                    method: "POST",
                    credentials: "include"
                }
            );

            return;

        }

        // Local Player
        if (typeof playSong === "function") {

            currentSong++;

            if (currentSong >= songs.length)
                currentSong = 0;

            playSong(currentSong);

        }

    });

}
/* ==========================
   SPOTIFY WEB PLAYBACK SDK
========================== */

window.onSpotifyWebPlaybackSDKReady = async () => {

    console.log("🎧 Spotify SDK Loaded");

    try {

        const response = await fetch(
            "https://spotify-auth-flow--seos1476.replit.app/api/spotify/token",
            {
                credentials: "include"
            }
        );

        if (!response.ok) {

            console.log("Spotify login required.");

            return;

        }

        const data = await response.json();

        spotifyPlayer = new Spotify.Player({

            name: "AETHER Player",

            getOAuthToken: cb => {

                cb(data.access_token);

            },

            volume: 0.6

        });

        spotifyPlayer.addListener("ready", ({ device_id }) => {

            spotifyReady = true;

            console.log("✅ Spotify Device Ready");

            console.log("Device ID:", device_id);

        });

        spotifyPlayer.addListener("not_ready", ({ device_id }) => {

            spotifyReady = false;

            console.log("⚠ Device Offline");

            console.log(device_id);

        });

        spotifyPlayer.addListener("initialization_error", ({ message }) => {

            console.error(message);

        });

        spotifyPlayer.addListener("authentication_error", ({ message }) => {

            console.error(message);

        });

        spotifyPlayer.addListener("account_error", ({ message }) => {

            console.error(message);

        });

        spotifyPlayer.addListener("playback_error", ({ message }) => {

            console.error(message);

        });

        await spotifyPlayer.connect();

    }

    catch(err){

        console.error(err);

    }

};
/* ==========================================
   AETHER Player
   Spotify Live UI
========================================== */

async function updateSpotifyNowPlaying() {

    if (!spotifyReady) return;

    try {

        const response = await fetch(
            "https://spotify-auth-flow--seos1476.replit.app/api/spotify/current",
            {
                credentials: "include"
            }
        );

        if (!response.ok) return;

        const data = await response.json();

        if (!data || !data.item) return;

        // Song Title
        const title = document.getElementById("songTitle");
        if (title)
            title.textContent = data.item.name;

        // Artist
        const artist = document.getElementById("artistName");
        if (artist)
            artist.textContent =
                data.item.artists.map(a => a.name).join(", ");

        // Album Art
        const albumArt = document.getElementById("albumArt");
        if (albumArt)
            albumArt.src = data.item.album.images[0].url;

        // Progress
        const percent =
            (data.progress_ms / data.item.duration_ms) * 100;

        if (progressFill)
            progressFill.style.width = percent + "%";

        // Duration
        if (durationText)
            durationText.textContent =
                formatTime(data.item.duration_ms / 1000);

        // Current Time
        if (currentTimeText)
            currentTimeText.textContent =
                formatTime(data.progress_ms / 1000);

    }

    catch (err) {

        console.log(err);

    }

}

/* Refresh every second */

setInterval(updateSpotifyNowPlaying,1000);

/* ==========================================
   SHUFFLE
========================================== */

const shuffleBtn = document.getElementById("shuffleBtn");

if(shuffleBtn){

shuffleBtn.onclick = ()=>{

alert("Shuffle support coming next update.");

};

}

/* ==========================================
   REPEAT
========================================== */

const repeatBtn = document.getElementById("repeatBtn");

if(repeatBtn){

repeatBtn.onclick = ()=>{

alert("Repeat support coming next update.");

};

}
/* ==========================================
   SPOTIFY SEARCH
========================================== */

const searchInput =
document.getElementById("searchInput");


const searchResults =
document.getElementById("searchResults");


if(searchInput){

searchInput.addEventListener(
"input",
async ()=>{


const query = searchInput.value.trim();


if(query.length < 2) return;


try{


const response = await fetch(

"https://spotify-auth-flow--seos1476.replit.app/api/spotify/search?q="
+ encodeURIComponent(query),

{
credentials:"include"
}

);


const data = await response.json();


displaySearchResults(
data.tracks.items
);


}

catch(err){

console.log(err);

}


});


}



function displaySearchResults(tracks){


if(!searchResults) return;


searchResults.innerHTML="";


tracks.forEach(track=>{


const song=document.createElement("div");


song.className="search-song";


song.innerHTML=`

<img src="${track.album.images[0].url}" width="50">


<div>

<h3>${track.name}</h3>

<p>
${track.artists[0].name}
</p>

</div>

`;



song.onclick=()=>{


playSpotifyTrack(
track.uri
);


};



searchResults.appendChild(song);



});


}



/* ==========================================
   SELECT SONG
========================================== */

async function playSpotifyTrack(uri){


await fetch(

"https://spotify-auth-flow--seos1476.replit.app/api/spotify/play",

{

method:"PUT",

credentials:"include",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

uri:uri

})

}

);


console.log(
"Playing:",
uri
);


}
/* ==========================================
   AETHER Spotify Playback Engine
========================================== */


async function startSpotifyPlayback(uri){


try{


const response = await fetch(

"https://spotify-auth-flow--seos1476.replit.app/api/spotify/play",

{

method:"PUT",

credentials:"include",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

uri:uri

})

}

);



const result = await response.json();


console.log(
"Spotify Playback Started",
result
);


}

catch(error){


console.error(
"Playback Error:",
error
);


}


}


/* ==========================
   CURRENT DEVICE CHECK
========================== */


if(spotifyPlayer){


spotifyPlayer.addListener(

"ready",

({device_id})=>{


console.log(
"AETHER Spotify Device:",
device_id
);


}

);


}


/* ==========================
   CONNECT PLAY BUTTON
========================== */


if(playBtn){


playBtn.addEventListener(

"click",

()=>{


if(spotifyReady){


spotifyPlayer.togglePlay();


}


}

);


}
