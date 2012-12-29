define([
    '../entities/player',
    '../entities/boundaries'
  ],
  function (player, boundaries) {
    var entities = [
      player({ x: 50, y: 300 }),
      player({ x: 1100, y: 350 }),
      player({ x: 500, y: 50 }),
      { x: 300, y: 000, width: 100, height: 100, type: 'square' },
      { x: 200, y: 550, width: 100, height: 100, type: 'square' },
      { x: 800, y: 100, width: 100, height: 100, type: 'square' },
      { x: 800, y: 500, width: 100, height: 100, type: 'square' },
      boundaries()
    ];

    function init(callback) {
      console.log('init demo');

      callback();
    }

    function handleInput(params) {
      var input = params.input, elapsed = params.elapsed, game = params.game;
      if(input.keyPressed('esc')){
        game.changeCurrentSceneByName('main-menu');
        return;
      }

      if(input.keyPressed('a')){
        entities[0].velocityX = -1;
        entities[0].velocityY = 0;
      }
      if(input.keyPressed('s')){
        entities[0].velocityX = 0;
        entities[0].velocityY = 1;
      }
      if(input.keyPressed('d')){
        entities[0].velocityX = 1;
        entities[0].velocityY = 0;
      }
      if(input.keyPressed('w')){
        entities[0].velocityX = 0;
        entities[0].velocityY = -1;
      }
      if(input.keyPressed('q')){
        entities[0].velocityX = 0;
        entities[0].velocityY = 0;
      }

      if(input.keyPressed('left')){
        entities[1].velocityX = -1;
        entities[1].velocityY = 0;
      }
      if(input.keyPressed('down')){
        entities[1].velocityX = 0;
        entities[1].velocityY = 1;
      }
      if(input.keyPressed('right')){
        entities[1].velocityX = 1;
        entities[1].velocityY = 0;
      }
      if(input.keyPressed('up')){
        entities[1].velocityX = 0;
        entities[1].velocityY = -1;
      }
      if(input.keyPressed('forwardslash')){
        entities[1].velocityX = 0;
        entities[1].velocityY = 0;
      }
      
    }

    function update(params) {
      console.log('update scene');

      if (Math.random() > 0.9) {
        entities[0].shootRight(params);
      }

      if (Math.random() > 0.9) {
        entities[1].shootLeft(params);
      }

      if (Math.random() > 0.9) {
        entities[2].shootDown(params);
      }
    }

    return {
      "init": init,
      "update": update,
      "entities": entities,
      "handleInput": handleInput,
      "width":1280,
      "height":720,
      "name": 'demo'
    };
  }
);
