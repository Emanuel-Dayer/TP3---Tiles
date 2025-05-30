export default class Game extends Phaser.Scene {
  constructor() {
    super("Nivel2");
  }

   init(data) {
    // recibir datos de la escena anterior
    this.puntaje = data.puntaje;

    this.escala = 4; // Factor de escala
    this.puntajeMonedas = 10;
    this.Velocidad = 180 * this.escala; // Ajustar velocidad según escala
    this.cantidadMonedas = 0;
    this.physics.world.drawDebug = false;

    // teclas de movimiento y reinicio
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.KeyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }

  preload() {

  }

  create() {
    // Desactivar suavizado para todas las texturas (pixel art)
    this.textures.get('tileset').setFilter(Phaser.Textures.FilterMode.NEAREST);
    this.textures.get('tileset_sprites').setFilter(Phaser.Textures.FilterMode.NEAREST);

    // Crear el tilemap y las capas
    const map = this.make.tilemap({ key: "map2" });
    const tileset = map.addTilesetImage("tileset", "tileset");
    const capaFondo = map.createLayer("suelo", tileset, 0, 0).setScale(this.escala);
    const capaParedes = map.createLayer("Pared", tileset, 0, 0).setScale(this.escala);;
    const capaObjetos = map.getObjectLayer("Objetos");

    // Crear el personaje en el punto de spawn
    const SpawnPersonaje = map.findObject("Objetos", (obj) => obj.name === "Personaje");
    this.personaje = this.physics.add.sprite(
      SpawnPersonaje.x * this.escala,
      SpawnPersonaje.y * this.escala,
      "tileset_sprites", 1
    ).setScale(this.escala);
    this.personaje.body.setCollideWorldBounds(false);

    // Grupos de monedas y metas
    this.monedas = this.physics.add.group();
    this.targets = this.physics.add.group();

    // Crear monedas y metas desde el layer de objetos
    capaObjetos.objects.forEach((objData) => {
      const { x = 0, y = 0, name } = objData;
      if (name === "Moneda") {
        const moneda = this.monedas.create(x * this.escala, y * this.escala, "tileset_sprites", 3);
        moneda.setScale(this.escala);
      }
      if (name === "Meta") {
        const meta = this.targets.create(x * this.escala, y * this.escala, "tileset_sprites", 2);
        meta.setScale(this.escala);
      }
    });

    // Colisiones con paredes
    capaParedes.setCollisionByProperty({ colisionable: true });
    this.physics.add.collider(this.personaje, capaParedes);
    this.physics.add.collider(this.monedas, capaParedes);

    // Overlaps y colisiones
    this.physics.add.overlap(
      this.personaje,
      this.monedas,
      this.juntarMoneda,
      null,
      this
    );
    this.physics.add.overlap(
      this.personaje,
      this.targets,
      this.colisionMeta,
      null,
      this
    );

    // Texto y camara
    this.monedasarecolectar = this.monedas.countActive(true);
    this.textoPuntaje = this.add.text(15, 15, `Puntaje: ${this.puntaje}`, {
      fontSize: "30px",
      fontStyle: "bold",
      fill: "#000",
      fontFamily: 'arial, sans-serif',
    }).setScrollFactor(0);

    this.textoMonedas = this.add.text(560, 15, `${this.cantidadMonedas} / ${this.monedasarecolectar}`, {
      fontSize: "30px",
      fontStyle: "bold",
      fill: "#000",
      fontFamily: 'arial, sans-serif',
    }).setScrollFactor(0);

    // Cámara que sigue al personaje
    this.cameras.main.startFollow(this.personaje);
    // Ajustar los límites de la cámara según la escala
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * this.escala,
      map.heightInPixels * this.escala
    );
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
      this.personaje.flipX = false; // mirar a la izquierda
    }
    if (this.cursors.right.isDown || this.keyD.isDown) {
      this.personaje.setVelocityX(this.Velocidad);
      this.personaje.flipX = true; // mirar a la derecha
    }

    // Reiniciar el juego con la tecla R
    if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
      this.scene.restart();
    }

    // Salir del juego con la tecla ESC
    if (Phaser.Input.Keyboard.JustDown(this.KeyESC)) {
      this.scene.start("Escena-Menu");
    }

    // Activar/Desactivar Modo Debug
    if (Phaser.Input.Keyboard.JustDown(this.keyP)) {
      this.physics.world.drawDebug = !this.physics.world.drawDebug;
      this.physics.world.debugGraphic.clear();
    }
  }

  juntarMoneda(personaje, moneda) {
    moneda.disableBody(true, true);
    this.puntaje += this.puntajeMonedas;
    this.cantidadMonedas++;
    this.textoMonedas.setText(`${this.cantidadMonedas} / ${this.monedasarecolectar}`);
    this.textoPuntaje.setText(`Puntaje: ${this.puntaje}`);
  }

  colisionMeta(personaje, targets) {
    if (this.monedas.countActive(true) === 0) {
      this.scene.start("Nivel3", { puntaje: this.puntaje });
    }
  }
}