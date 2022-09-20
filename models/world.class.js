class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  healthBar = new StatusBar(20, 0, 100, 1);
  bottleBar = new StatusBar(195, 0, 0, 2);
  coinBar = new StatusBar(370, 0, 0, 3);
  endbossBar = new StatusBar(540, 0, 100, 4);
  throwableObjects = [];
  collectedBottles = [];
  collectedCoins = [];
  collect_coin = new Audio("audio/collect_coin.mp3");
  collect_bottle_sound = new Audio("audio/bottle_collect.mp3");
  throw_bottle_sound = new Audio("audio/bottle_throw.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.runChecks();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.endbossBar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  runChecks() {
    this.checkCollisions();

    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }

  checkCollisions() {
    setInterval(() => {
      this.checkCollisionsEnemy();
      this.checkCollisionsBottles();
      this.checkCollisionsCoins();
      this.checkBottleCollisionsWithEnemy();
    }, 1000 / 25);
  }

  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
        console.log("no hit");
        this.chickenDied(enemy);
      } else if (
        this.character.isColliding(enemy) &&
        !this.character.isAboveGround() &&
        enemy.chickenAlive
      ) {
        console.log("hit");
        this.character.hit();
        this.healthBar.setPercentage(this.character.energy);
      }
    });
  }

  chickenDied(enemy) {
    if (enemy instanceof Pollito) {
      enemy.chickenAlive = false;
    }
  }

  checkCollisionsBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.collectedBottles.push(bottle);
        this.bottleBar.setPercentage(this.collectedBottles.length * 5);
        this.level.bottles.splice(bottle, 1);
        this.collect_bottle_sound.play();
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectedCoins.push(coin);
        this.coinBar.setPercentage(this.collectedCoins.length * 5);
        this.level.coins.splice(index, 1);
        this.collect_coin.play();
      }
    });
  }

  checkBottleCollisionsWithEnemy() {
    this.throwableObjects.forEach((to) => {
      this.level.enemies.forEach((enemy) => {
        if (to.isColliding(enemy) && enemy instanceof Endboss) {
          enemy.hit();

          enemy.isHurt();
          this.endbossBar.setPercentage(enemy.energy);
        } else if (to.isColliding(enemy) && enemy instanceof Chicken) {
          enemy.chickenAlive = false;
        }
      });
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles.length > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.collectedBottles.pop();
      this.bottleBar.setPercentage(this.collectedBottles.length * 5);
      this.throw_bottle_sound.play();
    }
  }
}
