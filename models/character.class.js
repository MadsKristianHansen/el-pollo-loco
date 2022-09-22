class Character extends MovableObject {
  height = 230;
  width = 110;
  y = 200;
  speed = 10;
  damageTaken = 2;
  IMAGES_WALKING = [
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png",
    "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png",
  ];
  IMAGES_JUMPING = [
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-34.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-35.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-37.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-38.png",
  ];
  IMAGES_DEAD = [
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-51.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-52.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-53.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-54.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-56.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-57.png",
  ];
  IMAGES_HURT = [
    "img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png",
  ];
  IMAGES_WAIT = [
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-2.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-3.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-4.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-5.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-6.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-7.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-8.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-9.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-10.png",
  ];
  IMAGES_SLEEP = [
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-11.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-12.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-13.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-14.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-15.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-16.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-17.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-18.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-19.png",
    "img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/LONG_IDLE/I-20.png",
  ];
  world;
  walking_sound = new Audio("audio/running.mp3");
  jump_sound = new Audio("audio/character_jump.mp3");
  hurt_sound = new Audio("audio/character_hurt.mp3");

  constructor() {
    super().loadImage(
      "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_WAIT);
    this.loadImages(this.IMAGES_SLEEP);

    this.animate();
    this.applyGravity();
  }

  checkMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!this.world.gameOver) {
        this.walking_sound.play();
      }
    }
  }

  checkMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      if (!this.world.gameOver) {
        this.walking_sound.play();
      }
    }
  }

  checkJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      if (!this.world.gameOver) {
        this.jump_sound.play();
      }
    }
  }

  movements() {
    setInterval(() => {
      this.walking_sound.pause();
      this.checkMoveRight();
      this.checkMoveLeft();
      this.checkJump();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  checkWalkingAnimation() {
    return (
      (this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isDead()) ||
      (this.world.keyboard.LEFT && !this.isAboveGround() && !this.isDead())
    );
  }

  checkAnimationInterval1() {
    setInterval(() => {
      if (this.checkWalkingAnimation()) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.world.gameOver) {
          this.hurt_sound.play();
        }
      } else if (this.world.keyboard.KEY_PRESS !== true) {
        this.playAnimation(this.IMAGES_SLEEP);
      } else if (!this.isAboveGround() && !this.isDead()) {
        this.playAnimation(this.IMAGES_WAIT);
      }
    }, 100);
  }

  checkAnimationInterval2() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 75);
  }

  checkAnimationInterval3() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 193);
  }

  animate() {
    this.movements();
    this.checkAnimationInterval1();
    this.checkAnimationInterval2();
    this.checkAnimationInterval3();
  }

  jump() {
    this.speedY = 30;
    this.currentImage = 0;
  }
}
