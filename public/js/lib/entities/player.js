define(['./shot'], function (shot) {

  function shootRight(params) {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityX: 10,
        update: function () {
          this.velocityY += (0.3 * (Math.random() * params.elapsed));
          this.velocityY -= (0.3 * (Math.random() * params.elapsed));
        }
      })
    );
  }

  function shootLeft(params) {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityX: -10,
        update: function () {
          this.velocityY += (0.3 * (Math.random() * params.elapsed));
          this.velocityY -= (0.3 * (Math.random() * params.elapsed));
        }
      })
    );
  }

  function shootDown(params) {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityY: 10,
        update: function () {
          this.velocityX += (0.3 * (Math.random() * params.elapsed));
          this.velocityX -= (0.3 * (Math.random() * params.elapsed));
        }
      })
    );
  }

  function shootUp(params) {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityY: -10,
        update: function () {
          this.velocityX += (0.3 * (Math.random() * params.elapsed));
          this.velocityX -= (0.3 * (Math.random() * params.elapsed));
        }
      })
    );
  }

  function update(params) {
    this.rotation += params.elapsed/200;

    if (this.rotation > Math.PI * 2) {
      this.rotation = 0;
    }
  }

  function create(specs) {
    var player = {};

    player.x = 0;
    player.y = 0;
    player.width = 30;
    player.height = 30;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isMovable = true;
    player.type = 'player';
    player.children = [];
    player.rotation = 0;

    player.shootRight = shootRight;
    player.shootLeft = shootLeft;
    player.shootDown = shootDown;
    player.shootUp = shootUp;
    player.update = update;

    return _.extend(player, specs || {});
  }

  return create;
});
