class Character extends MovableObject {
  height = 280;
  width = 150;
  y = 155;

  constructor() {
    super().loadImage(
      "../img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png"
    );
  }

  jump() {}
}
