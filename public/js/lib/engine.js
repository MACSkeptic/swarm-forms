define([ './game' ], 
  function (game) {

  var lastLoop,
      keysPressed = [];

  function start() {
    console.log('start engine');

    game.init(loop);
  }

  function update(elapsed) {
    console.log('update engine');

    game.update(elapsed);
  }

  function draw() {
    console.log('draw engine');

    game.draw();
  }

  function handleInput() {
    console.log('handle input engine');
    game.handleInput();
  }

  function loop(currentTime) {
    console.log('loop engine');

    var elapsed = lastLoop ? (currentTime - lastLoop) : 0;

    lastLoop = currentTime;

    update(elapsed);

    draw();

    window.requestAnimationFrame(loop);
  }

  return {
    "start": start
  };
});
