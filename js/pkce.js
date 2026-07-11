// ==========================================
// AETHER Spotify PKCE Authentication
// ==========================================

const CLIENT_ID = "4b760b62a55545bba8b5f80a7e4a3ff0";

const REDIRECT_URI =
"https://seos1476.github.io/AETHER-Player/";

const SCOPES = [
"streaming",
"user-read-email",
"user-read-private",
"user-read-playback-state",
"user-modify-playback-state",
"user-read-currently-playing"
];

function randomString(length){

const chars=
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let result="";

for(let i=0;i<length;i++){

result+=chars.charAt(
Math.floor(Math.random()*chars.length)
);

}

return result;

}

async function sha256(plain){

const encoder=new TextEncoder();

const data=encoder.encode(plain);

return await crypto.subtle.digest(
"SHA-256",
data
);

}

function base64url(buffer){

return btoa(
String.fromCharCode(...new Uint8Array(buffer))
)

.replace(/\+/g,"-")
.replace(/\//g,"_")
.replace(/=+$/,"");

}

async function loginSpotify(){

const verifier=randomString(128);

localStorage.setItem(
"spotify_verifier",
verifier
);

const challenge=
base64url(await sha256(verifier));

const params=new URLSearchParams({

client_id:CLIENT_ID,

response_type:"code",

redirect_uri:REDIRECT_URI,

code_challenge_method:"S256",

code_challenge:challenge,

scope:SCOPES.join(" ")

});

window.location=
"https://accounts.spotify.com/authorize?"+params;

}

document
.getElementById("spotifyLogin")
.addEventListener("click",loginSpotify);
