class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 55;
  hurt_endboss_sound = new Audio("audio/endboss_hurt.mp3");
  chickenAlive = true;
  speed = 50;
  damageTaken = 3;

  IMAGES_ALERT = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png",
  ];

  IMAGES_DEAD = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png",
  ];

  IMAGES_HIT = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G21.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G22.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/3.Herida/G23.png",
  ];

  IMAGES_WALKING = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G1.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G2.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G3.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/1.Caminata/G4.png",
  ];

  IMAGES_RAGE = [
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G13.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G14.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G15.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G16.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G17.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G18.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G19.png",
    "img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/2.Ataque/G20.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HIT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_RAGE);
    this.x = 3400;
    this.animate();
    this.checkPosition();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HIT);
        this.hurt_endboss_sound.play();
      } else if (this.energy < 100 && this.energy > 80) {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.otherDirection && this.x < 3400) {
          this.moveRight();
        } else if (!this.otherDirection && this.x > 150) {
          this.moveLeft();
        }
      } else if (this.energy <= 80) {
        this.playAnimation(this.IMAGES_RAGE);
        if (this.otherDirection && this.x < 3400) {
          this.moveRight();
        } else if (!this.otherDirection && this.x > 150) {
          this.moveLeft();
        }
      } else {
        this.playAnimation(this.IMAGES_ALERT);
      }
    }, 200);
  }

  checkPosition() {
    setInterval(() => {
      if (this.x >= 3400) {
        this.otherDirection = false;
      } else if (this.x <= 150) {
        this.otherDirection = true;
      }
    }, 200);
  }
}
