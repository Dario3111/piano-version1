const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const noteFrequencies = {
  C: 261.63,
  "C#": 277.18,
  D: 293.66,
  "D#": 311.13,
  E: 329.63,
  F: 349.23,
  "F#": 369.99,
  G: 392.0,
  "G#": 415.3,
  A: 440.0,
  "A#": 466.16,
  B: 493.88,
  C2: 523.25,
  "C#2": 554.37,
  D2: 587.33,
  "D#2": 622.25,
  E2: 659.25,
  F2: 698.46,
  "F#2": 739.99,
  G2: 783.99,
  "G#2": 830.61,
  A2: 880.0,
  "A#2": 932.33,
  B2: 987.77,
  C3: 1046.5,
};

//
const keyToNote = {
  KeyA: "C",
  KeyW: "C#",
  KeyS: "D",
  KeyE: "D#",
  KeyD: "E",
  KeyF: "F",
  KeyT: "F#",
  KeyG: "G",
  KeyY: "G#",
  KeyH: "A",
  KeyU: "A#",
  KeyJ: "B",
  KeyK: "C2",
  KeyO: "C#2",
  KeyL: "D2",
  KeyP: "D#2",
  Semicolon: "E2",
  Quote: "F2",
  Enter: "F#2",
};

function playSound(note) {
  const frequency = noteFrequencies[note];
  if (!frequency) return;

  const oscillator = audioContext.createOscillator();
  oscillator.type = "square"; //cambios de sonido
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2); // cambios en el tiempo
}

document.querySelectorAll(".white-key, .black-key").forEach((key) => {
  key.addEventListener("mousedown", () => {
    playSound(key.dataset.note);
    key.style.backgroundColor = "gray"; // gris al pulsar la tecla
  });
  key.addEventListener("mouseup", () => {
    key.style.backgroundColor = key.classList.contains("white-key")
      ? "white"
      : "black";
  });
  key.addEventListener("mouseleave", () => {
    key.style.backgroundColor = key.classList.contains("white-key")
      ? "white"
      : "black";
  });
});

document.addEventListener("keydown", (event) => {
  const note = keyToNote[event.code];
  if (note) {
    playSound(note);
    const keyElement = document.querySelector(`[data-note="${note}"]`);
    if (keyElement) keyElement.style.backgroundColor = "gray";
  }
});

document.addEventListener("keyup", (event) => {
  const note = keyToNote[event.code];
  if (note) {
    const keyElement = document.querySelector(`[data-note="${note}"]`);
    if (keyElement)
      keyElement.style.backgroundColor = keyElement.classList.contains(
        "white-key"
      )
        ? "white"
        : "black";
  }
});
