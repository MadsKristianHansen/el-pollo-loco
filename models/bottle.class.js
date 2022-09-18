class Bottle extends MovableObject {
  BOTTLES = [
    "img/6.botella/2.Botella_enterrada1.png",
    "img/6.botella/2.Botella_enterrada2.png",
  ];

  constructor(x, image) {
    super();
    this.loadImage(image);
    this.loadImages(this.BOTTLES);
    this.x = x;
    this.y = 366;
    this.height = 60;
    this.width = 60;
  }
}
