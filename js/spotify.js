const SPOTIFY_CLIENT_ID = "4b760b62a55545bba8b5f80a7e4a3ff0";

const REDIRECT_URI = "https://seos1476.github.io/AETHER-Player/";

const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-read-playback-state",
  "user-modify-playback-state",
  "playlist-read-private",
  "user-library-read"
];
const CLIENT_ID = "4b760b62a55545bba8b5f80a7e4a3ff0";
const REDIRECT_URI = "https://seos1476.github.io/AETHER-Player/";
const CLIENT_ID = "4b760b62a55545bba8b5f80a7e4a3ff0";
const REDIRECT_URI = "https://seos1476.github.io/AETHER-Player/";
/* ==========================================
   AETHER Spotify Integration v1.0
========================================== */

const CLIENT_ID = "4b760b62a55545bba8b5f80a7e4a3ff0";

const REDIRECT_URI = "https://seos1476.github.io/AETHER-Player/";

const SCOPES = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing"
];

const loginBtn = document.getElementById("spotifyLogin");

if (loginBtn) {

    loginBtn.addEventListener("click", () => {

        const scope = encodeURIComponent(SCOPES.join(" "));

        const url =
            `https://accounts.spotify.com/authorize` +
            `?client_id=${CLIENT_ID}` +
            `&response_type=token` +
            `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
            `&scope=${scope}`;

        window.location.href = url;

    });

}
