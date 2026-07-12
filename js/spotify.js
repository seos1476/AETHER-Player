console.log("Spotify Module Loaded");


const spotifyLogin =
document.getElementById("spotifyLogin");


if(spotifyLogin){

spotifyLogin.onclick=()=>{

window.location.href =
"https://spotify-auth-flow--seos1476.replit.app/api/spotify/login";

};

}
