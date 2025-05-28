export default class Game extends Phaser.Scene {
  constructor() {
    super("Nivel1");
  }

  init() {
    this.puntaje = 0;
    this.Velocidad = 180;

    // teclas de movimiento y reinicio
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  preload() {
    this.load.tilemapTiledJSON("map", "public/assets/tilemap/map.json");
    this.load.image("tileset", "public/assets/texture.png");
    this.load.spritesheet("tileset_sprites", "public/assets/texture.png", {
      frameWidth: 18,
      frameHeight: 18,
    });
  }

  create() {
    // Desactivar suavizado para todas las texturas (pixel art)
    this.textures.get('tileset').setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.textures.get('tileset_sprites').setFilter(Phaser.Textures.FilterMode.NEAREST);

    // Crear el tilemap y las capas
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tileset", "tileset");
    const capaFondo = map.createLayer("suelo", tileset, 0, 0);
    const capaParedes = map.createLayer("Pared", tileset, 0, 0);
    const capaObjetos = map.getObjectLayer("Objetos");

    // Crear el personaje en el punto de spawn
    const SpawnPersonaje = map.findObject("Objetos", (obj) => obj.name === "Personaje");
    this.personaje = this.physics.add.sprite(SpawnPersonaje.x, SpawnPersonaje.y, "tileset_sprites", 1);
    this.personaje.body.setCollideWorldBounds(false);

    // Colisiones con paredes
    capaParedes.setCollisionByProperty({ colisionable: true });
    this.physics.add.collider(this.personaje, capaParedes);

    // Grupos de monedas y metas
    this.monedas = this.physics.add.group();
    this.targets = this.physics.add.group();

    // Crear monedas y metas desde el layer de objetos
    capaObjetos.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      if (name === "Moneda") {
        this.monedas.create(x, y, "tileset_sprites", 3);
      }
      if (name === "Meta") {
        this.targets.create(x, y, "tileset_sprites", 2);
      }
    });

    // Overlaps y colisiones
    // Overlap entre personaje y monedas
    this.physics.add.overlap(
      this.personaje,
      this.monedas,
      this.juntarMoneda,
      null,
      this
    );

    // Colisión entre monedas y paredes
    this.physics.add.collider(this.monedas, capaParedes);

    // Overlap con la meta
    this.physics.add.overlap(
      this.personaje,
      this.targets,
      this.colisionMeta,
      null,
      this
    );

    // Texto y camara
    // Texto de puntaje fijo en pantalla
    this.textoPuntaje = this.add.text(5, 5, `Puntaje: ${this.puntaje}`, {
      fontSize: "18px",
      fontStyle: "bold",
      fill: "#000",
      fontFamily: 'arial, sans-serif',
    }).setScrollFactor(0); // No se mueve con la cámara

    // Cámara que sigue al personaje
    this.cameras.main.startFollow(this.personaje);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }

  update() {
    // Movimiento
    this.personaje.setVelocity(0);
    if (this.cursors.up.isDown || this.keyW.isDown) {
      this.personaje.setVelocityY(-this.Velocidad);
    }
    if (this.cursors.down.isDown || this.keyS.isDown) {
      this.personaje.setVelocityY(this.Velocidad);
    }
    if (this.cursors.left.isDown || this.keyA.isDown) {
      this.personaje.setVelocityX(-this.Velocidad);
      this.personaje.flipX = false; // Mirar a la derecha
    }
    if (this.cursors.right.isDown || this.keyD.isDown) {
      this.personaje.setVelocityX(this.Velocidad);
      this.personaje.flipX = true; // Mirar a la izquierda
    }

    // Reiniciar el juego con la tecla R
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.scene.restart();
    }
  }

  juntarMoneda(personaje, moneda) {
    moneda.disableBody(true, true);
    this.puntaje += 10;
    this.textoPuntaje.setText(`Puntaje: ${this.puntaje}`);
  }

  colisionMeta(personaje, targets) {
    // Mostrar texto de victoria centrado
    const textoVictoria = this.add.text(
      this.cameras.main.worldView.centerX,
      this.cameras.main.worldView.centerY,
      "¡Victoria!",
      {
        fontSize: "32px",
        fill: "#fff",
        fontStyle: "bold",
        stroke: "#000",
        strokeThickness: 6,
      }
    ).setOrigin(0.5, 0.5);

    this.personaje.setTint(0x00ff00); // Cambiar color para indicar victoria
  }
}

