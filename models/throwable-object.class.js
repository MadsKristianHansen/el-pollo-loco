class ThrowableObject extends MovableObject {
  IMAGES_THROWN = [
    "img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png",
    "img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png",
    "img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png",
    "img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png",
  ];

  constructor(x, y) {
    super().loadImage("img/7.Marcadores/Icono/Botella.png");
    this.loadImages(this.IMAGES_THROWN);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 60;
    this.throw();
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
    setInterval(() => {
      this.playAnimation(this.IMAGES_THROWN);
    }, 100);
  }
}
