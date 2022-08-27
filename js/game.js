let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  console.log("My Character is", world.character);
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 38) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 40) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 32) {
    keyboard.RIGHT = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 38) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 40) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 32) {
    keyboard.RIGHT = false;
  }
});
