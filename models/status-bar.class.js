class StatusBar extends DrawableObject {
  IMAGES_LIFE = [
    "img/7.Marcadores/Barra/Marcador vida/azul/0_.png",
    "img/7.Marcadores/Barra/Marcador vida/azul/20_.png",
    "img/7.Marcadores/Barra/Marcador vida/azul/40_.png",
    "img/7.Marcadores/Barra/Marcador vida/azul/60_.png",
    "img/7.Marcadores/Barra/Marcador vida/azul/80_.png",
    "img/7.Marcadores/Barra/Marcador vida/azul/100_.png",
  ];

  IMAGES_BOTTLE = [
    "img/7.Marcadores/Barra/Marcador_botella/Azul/0_.png",
    "img/7.Marcadores/Barra/Marcador_botella/Azul/20_.png",
    "img/7.Marcadores/Barra/Marcador_botella/Azul/40_.png",
    "img/7.Marcadores/Barra/Marcador_botella/Azul/60_.png",
    "img/7.Marcadores/Barra/Marcador_botella/Azul/80_.png",
    "img/7.Marcadores/Barra/Marcador_botella/Azul/100_.png",
  ];
  percentage = 100;

  constructor(x, y, percent, i) {
    super();
    this.image = this.statusbarImages(i);
    this.loadImages(this.image);
    this.x = x;
    this.y = y;
    this.width = 150;
    this.height = 40;
    this.setPercentage(percent);
  }

  statusbarImages(i) {
    if (i == 1) {
      return this.IMAGES_LIFE;
    } else if (i == 2) {
      return this.IMAGES_BOTTLE;
    }
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.image[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 0) {
      return 0;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else {
      return 1;
    }
  }
}
