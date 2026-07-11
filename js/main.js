/* ==========================================
   AETHER Player
   Main UI Script
========================================== */

console.log("🎵 AETHER Player Loaded");

/* ==========================
   Progress Bar Animation
========================== */

const progress = document.querySelector(".progress-fill");

if (progress) {

    let value = 45;
    let direction = 1;

    setInterval(() => {

        value += direction;

        if (value >= 100) direction = -1;
        if (value <= 10) direction = 1;

        progress.style.width = value + "%";

    }, 80);

}

/* ==========================
   Album Rotation
========================== */

const album = document.querySelector(".album-art");

if (album) {

    let angle = 0;

    setInterval(() => {

        angle += 0.15;

        album.style.transform =
            `rotate(${angle}deg)`;

    }, 20);

}

/* ==========================
   Button Hover Animation
========================== */

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        btn.style.transform =
            "translateY(-5px) scale(1.04)";

    });

    btn.addEventListener("mouseleave", () => {

        btn.style.transform =
            "translateY(0px) scale(1)";

    });

});

/* ==========================
   Album Card 3D Effect
========================== */

const card = document.querySelector(".album-card");

if (card) {

    document.addEventListener("mousemove", (e) => {

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        card.style.transform =
            `rotateY(${(x - 0.5) * 10}deg)
             rotateX(${(0.5 - y) * 10}deg)
             translateY(-8px)`;

    });

}

/* ==========================
   Future Modules
========================== */

// audio.js
// spotify.js
// youtube.js
// esp32.js

console.log("✅ UI Ready");
