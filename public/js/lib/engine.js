define([ './game' ],
  function (game) {

  var lastLoop,
      keysPressed = [];

  function start() {
    game.init(loop);
  }

  function update(elapsed) {
    game.update(elapsed);
  }

  function draw() {
    game.draw();
  }

  function handleInput() {
    game.handleInput();
  }

  function loop(currentTime) {
    var elapsed = lastLoop ? (currentTime - lastLoop) : 0;

    lastLoop = currentTime;

    update(elapsed);

    draw();

    window.requestAnimationFrame(loop);
  }

  return {
    'start': start
  };
});
