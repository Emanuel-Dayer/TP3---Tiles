// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Menu extends Phaser.Scene {
  constructor() {
    super("Escena-Menu");
  }

  init() {
    // Controles
    this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  preload() {
    // Cargar tilemap y texturas
    this.load.tilemapTiledJSON("map", "public/assets/tilemap/map.json");
    this.load.tilemapTiledJSON("map2", "public/assets/tilemap/map2.json");
    this.load.tilemapTiledJSON("map3", "public/assets/tilemap/map3.json");

    this.load.image("tileset", "public/assets/texture.png");
    this.load.spritesheet("tileset_sprites", "public/assets/texture.png", {
      frameWidth: 18,
      frameHeight: 18,
    });

    // Fondos
    this.load.image("FondoMenu", "./public/assets/FondoMenu.png");
    this.load.image("Victoria", "./public/assets/Victoria.png");
  }

  create() {
    // Fondo centrado
    this.add.image(this.scale.width / 2, this.scale.height / 2, "FondoMenu")
      .setDisplaySize(this.scale.width, this.scale.height)
      .setOrigin(0.5);

    // Texto centrado
    this.add.text(this.scale.width / 2, 550, `Presiona ENTER para iniciar`, {
      fontSize: "38px",
      fill: "#fff",
      stroke: "#000",
      strokeThickness: 16,
    }).setOrigin(0.5);
  }

  update() {
    // Iniciar el juego
    if (Phaser.Input.Keyboard.JustDown(this.keyEnter)) {
      this.scene.start("Nivel1");
    }
  }
}
