let level1;
let enemies = [];
let coins = [new Coin(3600, 300)];
let backgroundObjects = [
  new BackgroundObject("img/5.Fondo/Capas/5.cielo_1920-1080px.png", -719),
  new BackgroundObject("img/5.Fondo/Capas/3.Fondo3/2.png", -719),
  new BackgroundObject("img/5.Fondo/Capas/2.Fondo2/2.png", -719),
  new BackgroundObject("img/5.Fondo/Capas/1.suelo-fondo1/2.png", -719),

  new BackgroundObject("img/5.Fondo/Capas/5.cielo_1920-1080px.png", 0),
  new BackgroundObject("img/5.Fondo/Capas/3.Fondo3/1.png", 0),
  new BackgroundObject("img/5.Fondo/Capas/2.Fondo2/1.png", 0),
  new BackgroundObject("img/5.Fondo/Capas/1.suelo-fondo1/1.png", 0),
  new BackgroundObject("img/5.Fondo/Capas/5.cielo_1920-1080px.png", 719),
  new BackgroundObject("img/5.Fondo/Capas/3.Fondo3/2.png", 719),
  new BackgroundObject("img/5.Fondo/Capas/2.Fondo2/2.png", 719),
  new BackgroundObject("img/5.Fondo/Capas/1.suelo-fondo1/2.png", 719),

  new BackgroundObject("img/5.Fondo/Capas/5.cielo_1920-1080px.png", 719 * 2),
  new BackgroundObject("img/5.Fondo/Capas/3.Fondo3/1.png", 719 * 2),
  new BackgroundObject("img/5.Fondo/Capas/2.Fondo2/1.png", 719 * 2),
  new BackgroundObject("img/5.Fondo/Capas/1.suelo-fondo1/1.png", 719 * 2),
  new BackgroundObject("img/5.Fondo/Capas/5.cielo_1920-1080px.png", 719 * 3),
  new BackgroundObject("img/5.Fondo/Capas/3.Fondo3/2.png", 719 * 3),
  new BackgroundObject("img/5.Fondo/Capas/2.Fondo2/2.png", 719 * 3),
  new BackgroundObject("img/5.Fondo/Capas/1.suelo-fondo1/2.png", 719 * 3),

  new BackgroundObject("img/5.Fondo/Capas/5.cielo_1920-1080px.png", 719 * 4),
  new BackgroundObject("img/5.Fondo/Capas/3.Fondo3/1.png", 719 * 4),
  new BackgroundObject("img/5.Fondo/Capas/2.Fondo2/1.png", 719 * 4),
  new BackgroundObject("img/5.Fondo/Capas/1.suelo-fondo1/1.png", 719 * 4),
  new BackgroundObject("img/5.Fondo/Capas/5.cielo_1920-1080px.png", 719 * 5),
  new BackgroundObject("img/5.Fondo/Capas/3.Fondo3/2.png", 719 * 5),
  new BackgroundObject("img/5.Fondo/Capas/2.Fondo2/2.png", 719 * 5),
  new BackgroundObject("img/5.Fondo/Capas/1.suelo-fondo1/2.png", 719 * 5),
];
let bottles = [
  new Bottle(300, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(400, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(600, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(800, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(1000, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(1100, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(1500, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(1800, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(2000, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(2100, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(2200, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(2300, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(2450, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(2600, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(2780, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(2900, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(3000, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(3300, "img/6.botella/2.Botella_enterrada1.png"),
  new Bottle(3400, "img/6.botella/2.Botella_enterrada2.png"),
  new Bottle(3650, "img/6.botella/2.Botella_enterrada2.png"),
];
let clouds = [
  new Cloud("img/5.Fondo/Capas/4.nubes/1.png", 250),
  new Cloud("img/5.Fondo/Capas/4.nubes/2.png", 750),
  new Cloud("img/5.Fondo/Capas/4.nubes/2.png", 1750),
  new Cloud("img/5.Fondo/Capas/4.nubes/1.png", 2250),
  new Cloud("img/5.Fondo/Capas/4.nubes/2.png", 3250),
  new Cloud("img/5.Fondo/Capas/4.nubes/1.png", 4200),
];

function initLevel1() {
  addEnemies();
  addCoins();

  return new Level(enemies, clouds, backgroundObjects, bottles, coins);
}

function addEnemies() {
  for (let i = 0; i < 12; i++) {
    enemies.push(new Chicken());
  }
  for (let i = 0; i < 7; i++) {
    enemies.push(new Pollito());
  }
  enemies.push(new Endboss());
}

function addCoins() {
  for (let i = 0; i < 19; i++) {
    let x = 500 + Math.random() * 3000;
    let y = 10 + Math.random() * 200;
    coins.push(new Coin(x, y));
  }
}
