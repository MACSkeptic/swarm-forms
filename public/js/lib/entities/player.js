define(function () {

  function shootRight() {
    this.children.push({
      x: this.x,
      y: this.y,
      velocityX: 10,
      velocityY: 0,
      isMovable: true,
      type: 'shot'
    });
  }

  function create(specs) {
    var player = {};

    player.x = specs.x || 0;
    player.y = specs.y || 0;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isMovable = true;
    player.type = 'player';
    player.children = [];

    player.shootRight = shootRight;

    return player;
  }

  return create;
});
