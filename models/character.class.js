class Character extends MovableObject {
  height = 280;
  width = 150;
  y = 155;
  IMAGES_WALKING = [
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png",
  ];

  constructor() {
    super().loadImage(
      "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png"
    );
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 100);
  }

  jump() {}
}
