export default class Findeljuego extends Phaser.Scene {
  constructor() {
    super("Fin_Del_Juego"); // Nombre de la escena
  }

  init(data) {
    // Recibir datos de la escena anterior
    this.puntaje = data.puntaje; // Puntuación final

    // Controles
    this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
  }

  create() {
    // Fondo
      this.add.image(this.scale.width / 2, this.scale.height / 2, "Victoria")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setOrigin(0.5);

    // Mostrar texto de victoria centrado
    this.textoVictoria = this.add.text(315, 250, "¡Victoria!",
      {
        fontSize: "80px",
        fill: "#fff",
        fontStyle: "bold",
        stroke: "#000",
        strokeThickness: 8,
      }
    ).setOrigin(0.5);

    // Mostrar la puntuación final
    this.add.text(315, 350, `Puntuación: ${this.puntaje}`, {
      fontSize: "32px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 8,
    }).setOrigin(0.5);

    // Texto para volver al menú
    this.add.text(315, 500, "Presiona ESC para volver al menú", {
      fontSize: "32px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 8,
    }).setOrigin(0.5);
  }

  update() { // Actualizar objetos del juego
    // Volver al menú
    if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
      this.scene.start("Escena-Menu");
    }
  }
}