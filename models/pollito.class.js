class Pollito extends MovableObject {
  y = 375;
  height = 50;
  width = 50;
  chickenAlive = true;
  IMAGES_WALKING = [
    "img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png",
    "img/3.Secuencias_Enemy_básico/Versión_pollito/2.Centro.png",
    "img/3.Secuencias_Enemy_básico/Versión_pollito/3.Paso_izquierdo.png",
  ];

  IMAGES_DEAD = ["img/3.Secuencias_Enemy_básico/Versión_pollito/4.Muerte.png"];

  constructor() {
    super().loadImage(
      "img/3.Secuencias_Enemy_básico/Versión_pollito/1.Paso_derecho.png"
    );
    this.x = 1000 + Math.random() * 6000;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.speed = 2 + Math.random() * 0.5;
  }

  animate() {
    this.movement();
    this.animation();
  }

  movement() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  animation() {
    setInterval(() => {
      if (this.chickenAlive) {
        this.playAnimation(this.IMAGES_WALKING);
      } else {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 100);
  }
}
