class Coin extends MovableObject {
  IMAGES_COINS = ["img/8.Coin/Moneda1.png", "img/8.Coin/Moneda2.png"];

  constructor(x, y) {
    super();
    this.loadImage("img/8.Coin/Moneda1.png");
    this.loadImages(this.IMAGES_COINS);
    this.animate();
    this.x = x;
    this.y = y;
    this.height = 125;
    this.width = 125;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 250);
  }
}
