class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  coinBonus = false;
  gameOver = false;
  keyboard;
  camera_x = 0;
  healthBar = new StatusBar(20, 0, 100, 1);
  bottleBar = new StatusBar(370, 0, 0, 2);
  coinBar = new StatusBar(195, 0, 0, 3);
  endbossBar = new StatusBar(540, 0, 100, 4);
  throwableObjects = [];
  collectedBottles = [];
  collectedCoins = [];
  collect_coin = new Audio("audio/collect_coin.mp3");
  collect_bottle_sound = new Audio("audio/bottle_collect.mp3");
  throw_bottle_sound = new Audio("audio/bottle_throw.mp3");
  game_music = new Audio("audio/bg_music.wav");
  won_sound = new Audio("audio/won.mp3");
  lost_sound = new Audio("audio/lost.mp3");
  game_over = new Audio("audio/game_over.mp3");
  chicken_hurt_sound = new Audio("audio/chicken_hurt.mp3");
  pollito_hurt_sound = new Audio("audio/smash.mp3");
  endboss_death_scream = new Audio("audio/death_scream.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.runChecks();
    this.playMusic();
  }

  playMusic() {
    this.game_music.volume = 0.2;
    this.game_music.play();

    this.game_music.addEventListener(
      "ended",
      function () {
        this.currentTime = 0;
        this.play();
      },
      false
    );
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.drawMoveableStatusbars();
    this.drawFrontObjects();
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawFrontObjects() {
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
  }

  drawMoveableStatusbars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    this.addToMap(this.endbossBar);
    this.ctx.translate(this.camera_x, 0);
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
    // mo.drawFrame(this.ctx);

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
      this.checkCollectedCoins();
      this.checkBottleCollisionsWithEnemy();
    }, 1000 / 25);
  }

  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
        this.chickenDied(enemy);
      } else if (this.characterHitByChicken(enemy)) {
        this.character.hit();
        if (this.character.isDead() && !this.gameOver) {
          this.displayYouLost();
        } else {
          this.healthBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  characterHitByChicken(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.isAboveGround() &&
      enemy.chickenAlive
    );
  }

  chickenDied(enemy) {
    if (enemy instanceof Pollito && enemy.chickenAlive && !this.gameOver) {
      this.pollito_hurt_sound.play();
      enemy.chickenAlive = false;
    }
  }

  checkCollisionsBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.collectedBottles.push(bottle);
        this.bottleBar.setPercentage(this.collectedBottles.length * 5);
        this.level.bottles.splice(bottle, 1);
        if (!this.gameOver) {
          this.collect_bottle_sound.play();
        }
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectedCoins.push(coin);
        this.coinBar.setPercentage(this.collectedCoins.length * 5);
        this.level.coins.splice(index, 1);
        this.collect_coin.volume = 1;
        if (!this.gameOver) {
          this.collect_coin.play();
        }
      }
    });
  }

  checkCollectedCoins() {
    if (this.collectedCoins.length == 20 && !this.coinBonus) {
      this.character.energy = 100;
      this.healthBar.setPercentage(this.character.energy);
      this.coinBonus = true;
    }
  }

  checkBottleCollisionsWithEnemy() {
    this.throwableObjects.forEach((to) => {
      this.level.enemies.forEach((enemy) => {
        if (to.isColliding(enemy) && enemy instanceof Endboss) {
          enemy.hit();
          this.checkYouWon(enemy);
        } else if (this.aliveChickenCollision(to, enemy)) {
          this.chicken_hurt_sound.play();
          enemy.chickenAlive = false;
        }
      });
    });
  }

  aliveChickenCollision(to, enemy) {
    return (
      to.isColliding(enemy) &&
      enemy instanceof Chicken &&
      enemy.chickenAlive &&
      !this.gameOver
    );
  }

  checkYouWon(enemy) {
    if (enemy.isDead() && !this.gameOver) {
      this.displayYouWon();
    } else {
      enemy.isHurt();
      this.endbossBar.setPercentage(enemy.energy);
    }
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
      if (!this.gameOver) {
        this.throw_bottle_sound.play();
      }
    }
  }

  displayYouWon() {
    if (!this.gameOver) {
      this.setYouWonMusic();
    }
    this.gameOver = true;
    this.setWorld();
    setTimeout(function () {
      document.getElementById("startScreen").style.display = "flex";
      document.getElementById("backgroundStart").style.display = "none";
      document.getElementById("backgroundGameOver").style.display = "flex";
      document.getElementById("canvas").style.display = "none";
    }, 3000);
  }

  displayYouLost() {
    if (!this.gameOver) {
      this.setGameOverMusic();
    }
    this.gameOver = true;
    this.setWorld();
    setTimeout(function () {
      document.getElementById("startScreen").style.display = "flex";
      document.getElementById("backgroundStart").style.display = "none";
      document.getElementById("canvas").style.display = "none";
      document.getElementById("backgroundGameOver").style.display = "none";
      document.getElementById("backgroundYouLost").style.display = "flex";
    }, 2000);
  }

  setYouWonMusic() {
    this.game_music.pause();
    this.endboss_death_scream.play();
    this.won_sound.play();
  }

  setGameOverMusic() {
    this.game_music.pause();
    this.lost_sound.play();
    this.game_over.play();
  }
}
