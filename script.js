const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const envelope = document.getElementById("envelope");
const mainContent = document.getElementById("mainContent");
const music = document.getElementById("bgMusic");
const musicPlayer = document.getElementById("musicPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeControl = document.getElementById("volumeControl");
const volumeIcon = document.getElementById("volumeIcon");
const cover = document.querySelector(".cover");
const noSound = document.getElementById("noSound");

let canPlayNoSound = true;

noBtn.addEventListener("mouseenter", () => {
    if (!canPlayNoSound) return;

    // Reiniciamos el audio desde el inicio
    noSound.currentTime = 0.6;
    noSound.play().catch(e => console.log("Audio bloqueado por navegador:", e));

    // Movimiento travieso
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const x = Math.random() * (window.innerWidth - btnWidth - 20); // margen de 10px
    const y = Math.random() * (window.innerHeight - btnHeight - 20);

    noBtn.style.position = "absolute";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    // Cooldown para no saturar el sonido
    canPlayNoSound = false;
    setTimeout(() => canPlayNoSound = true, 400); // 0.4s
});


yesBtn.addEventListener("click", () => {

    // 1️⃣ Ocultar pantalla inicial
    mainContent.style.display = "none";

    // 2️⃣ Mostrar carta
    envelope.style.display = "flex";

    // 3️⃣ Forzar reflow antes de animar
    void envelope.offsetWidth;

    // 4️⃣ Activar animación
    envelope.classList.add("open");

    // 5️⃣ Mostrar reproductor
    musicPlayer.classList.remove("hidden");

    // 6️⃣ Iniciar música
    music.volume = 1;
    music.play();
    updatePlayIcon();
    updateVolumeIcon(1);
});




function updatePlayIcon() {
    if (music.paused) {
        playPauseBtn.textContent = "▶";
        cover.classList.remove("playing");
    } else {
        playPauseBtn.textContent = "⏸";
        cover.classList.add("playing");
    }
}

playPauseBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
    updatePlayIcon();
});


// Control de volumen
function updateVolumeIcon(volume) {
    if (volume == 0) {
        volumeIcon.textContent = "🔇";
    } else if (volume < 0.5) {
        volumeIcon.textContent = "🔉";
    } else {
        volumeIcon.textContent = "🔊";
    }
}

volumeControl.addEventListener("input", (e) => {
    const value = parseFloat(e.target.value);
    music.volume = value;
    updateVolumeIcon(value);
});


const bgMusic = document.getElementById("bgMusic");

function fadeInAudio(audio, duration = 3000, targetVolume = 0.5) {
    audio.volume = 0;          // empezar en silencio
    audio.play();              // iniciar reproducción
    let step = 50;             // intervalo en ms
    let increment = targetVolume / (duration / step); // cuánto subir cada paso

    const fadeInterval = setInterval(() => {
        if (audio.volume + increment >= targetVolume) {
            audio.volume = targetVolume;
            clearInterval(fadeInterval);
        } else {
            audio.volume += increment;
        }
    }, step);
}

// Llamar la función cuando abras la carta
fadeInAudio(bgMusic, 3000, 0.3); // 3 segundos hasta volumen 0.3


