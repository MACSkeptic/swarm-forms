define(function (require) {
  var guns = require('./../components/guns'),
      behaviours = require('../behaviours'),
      shoots     = behaviours.shoots,
      moves      = behaviours.moves,
      rectangle  = behaviours.rectangle,
      circle     = behaviours.circle;

  function update(params) {
    this.rotation += params.elapsed / 200;
    if (this.rotation > Math.PI * 2) { this.rotation = 0; }

    _.find(this.children, function (shotA) {
      if (shotA.disposed) { return; }

      return _.find(this.children, function (shotB) {
        if (shotA === shotB) { return; }

        return (
          (
            Math.pow(shotA.x - shotB.x, 2) + Math.pow(shotA.y - shotB.y, 2)
          ) <= Math.pow(shotA.radius + shotB.radius, 2)
        ) && (
          (
            shotA.collidesWith.shot &&
            shotA.collidesWith.shot.apply(shotA, [shotB])
          ) || true
        );
      }, this);
    }, this);
  }

  function handleMovement(params) {
    if (!params.input.keyPressed('a') && !params.input.keyPressed('d')) { this.velocityX = 0; }
    if (!params.input.keyPressed('w') && !params.input.keyPressed('s')) { this.velocityY = 0; }

    if (params.input.keyPressed('a')) { this.velocityX = -this.velocity; }
    if (params.input.keyPressed('s')) { this.velocityY = this.velocity;  }
    if (params.input.keyPressed('d')) { this.velocityX = this.velocity;  }
    if (params.input.keyPressed('w')) { this.velocityY = -this.velocity; }
  }

  function handleShooting(params) {
    if (params.input.keyPressed('left'))  { this.shootLeft(params);  }
    if (params.input.keyPressed('right')) { this.shootRight(params); }
    if (params.input.keyPressed('up'))    { this.shootUp(params);    }
    if (params.input.keyPressed('down'))  { this.shootDown(params);  }
  }
  
  function handleChangeGun(params) {
    if (params.input.keyPressed('1')) { this.gun = this.guns[0]; }
    if (params.input.keyPressed('2')) { this.gun = this.guns[1]; }
    if (params.input.keyPressed('3')) { this.gun = this.guns[2]; }
  }

  function handleInput(params) {
    handleMovement.apply(this, [params]);
    handleShooting.apply(this, [params]);
    handleChangeGun.apply(this, [params]);
  }

  function undoLastMovement(other, algorithm) { this.undoLastMovement(other, algorithm); }

  function create(specs) {
    var player = _.extend(
      rectangle({ width: 30, height: 30 }),
      circle({ radius: 7.5 }),
      moves({ velocity: 2 }),
      {
        type: 'player',
        rotation: 0,
        handleInput: handleInput,
        collidesWith: {
          rock: undoLastMovement,
          hole: undoLastMovement,
          boundaries: undoLastMovement
        }
      },
      shoots({ update: update }),
      specs || {}
    );

    player.guns = [];
    player.guns.push(guns.basic(player));
    player.guns.push(guns.doubleBarrel(player));
    player.guns.push(guns.spread(player));
    player.gun = player.guns[0];

    return player;
  }

  return create;
});
