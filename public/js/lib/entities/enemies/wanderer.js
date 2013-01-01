define(function (require) {

  var behaviours = require('../../behaviours'),
      shoots     = behaviours.shoots,
      moves      = behaviours.moves,
      rectangle  = behaviours.rectangle;

  function update(params) {
    this.timeUntilNextMovementChange -= params.elapsed;
    if (this.timeUntilNextMovementChange <= 0) {
      this.changeMovementDirection();
      this.timeUntilNextMovementChange = 500 * Math.floor(Math.random() * 2) + 1;
    }

    this.rotation = this.rotation + (params.elapsed) * Math.PI / 150;
    if (this.rotation >= 2 * Math.PI) { this.rotation = 0; }
  }

  function vanish() { this.disposed = true; }
  function killAndVanish(other) { this.disposed = true; other.disposed = true; }

  function changeMovementDirection() {
    var directions = [
      { velocityX: this.speed, velocityY: 0 },
      { velocityX: -1 * this.speed, velocityY: 0 },
      { velocityX: 0, velocityY: this.speed },
      { velocityX: 0, velocityY: -1 * this.speed }
    ];

    var newDirection = Math.floor(Math.random() * 4);

    _.extend(this, directions[newDirection]);
  }

  function undoLastMovement(other, algorithm) { this.undoLastMovement(other, algorithm); }

  function create(specs) {
    return _.extend(
      rectangle({ width: 15, height: 15 }),
      moves(),
      {
        type: 'wanderer',
        rotation: 0,
        collidesWith: {
          player: killAndVanish,
          rock: undoLastMovement,
          hole: undoLastMovement,
          boundaries: undoLastMovement,
          shoot: vanish
        }
      },
      shoots({
        update: update,
        changeMovementDirection: changeMovementDirection,
        timeUntilNextMovementChange: 0,
        speed: 1
      }),
      specs || {}
    );
  }
  return create;
});

