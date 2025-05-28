import Nivel1 from "./scenes/Nivel-1.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 200,
  height: 200,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 630,
      height: 630,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Nivel1],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);

// Forzar vecino más cercano en el canvas HTML, para que los píxeles se vean nítidos
window.addEventListener('DOMContentLoaded', () => {
  const canvases = document.getElementsByTagName('canvas');
  for (let canvas of canvases) {
    canvas.style.imageRendering = 'pixelated';
    canvas.style.imageRendering = 'crisp-edges';
  }
});
