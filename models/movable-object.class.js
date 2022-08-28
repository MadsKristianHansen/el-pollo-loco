class MovableObject {
  x = 100;
  y = 100;
  img;
  height = 100;
  width = 100;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  moveRight() {}
}
