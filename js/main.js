/* ===========================
   AETHER Player v0.2
=========================== */

console.log("🎵 AETHER Player Loaded");

const progress = document.querySelector(".progress-fill");

let value = 45;
let direction = 1;

setInterval(() => {

    value += direction;

    if(value >= 100){
        direction = -1;
    }

    if(value <= 10){
        direction = 1;
    }

    progress.style.width = value + "%";

},80);


/* Floating album animation */

const album = document.querySelector(".album");

let angle = 0;

setInterval(()=>{

    angle += 0.15;

    album.style.transform =
        `rotate(${angle}deg)`;

},20);


/* Buttons */

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-6px) scale(1.03)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0px) scale(1)";

});

});


/* Music Card Glow */

const card=document.querySelector(".music-card");

document.addEventListener("mousemove",(e)=>{

const x=e.clientX/window.innerWidth;

const y=e.clientY/window.innerHeight;

card.style.transform=
`rotateY(${(x-.5)*12}deg)
 rotateX(${(0.5-y)*12}deg)
 translateY(-8px)`;

});
