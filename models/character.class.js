class Character extends MovableObject {
  height = 280;
  width = 150;
  y = 155;
  speed = 10;
  IMAGES_WALKING = [
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png",
  ];
  world;

  constructor() {
    super().loadImage(
      "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png"
    );
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 50);
  }

  jump() {}
}
