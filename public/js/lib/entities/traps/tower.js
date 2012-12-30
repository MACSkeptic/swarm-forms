define(['../shot'], function (shot) {

 function shootRight(params) {
    this.children.push( shotWithInertia(10, 0, this) );
  }

  function shootLeft(params) {
    this.children.push( shotWithInertia(-10, 0, this) );
  }

  function shootDown(params) {
    this.children.push( shotWithInertia(0, 10, this) );
  }

  function shootUp(params) {
    this.children.push( shotWithInertia(0, -10, this) );
  }

  function shotWithInertia(velocityX, velocityY, that) {
    return shot({
      x: that.x,
      y: that.y,
      velocityX: velocityX + that.velocityX,
      velocityY: velocityY + that.velocityY
    });
  }

  function update(params) {
    this.rotation += params.elapsed/200;

    if (this.rotation > Math.PI * 2) {
      this.rotation = 0;
    }
  }

  function create(specs) {
    var tower = {};

    tower.x = specs.x || 0;
    tower.y = specs.y || 0;
    tower.width = 25;
    tower.height = 25;
    tower.velocityX = 0;
    tower.velocityY = 0;
    tower.isMovable = false;
    tower.type = 'tower';

    tower.children = [];

    tower.shootRight = _.bind(shootRight,tower);
    tower.shootLeft = _.bind(shootLeft,tower)
    tower.shootDown = _.bind(shootDown,tower)
    tower.shootUp = _.bind(shootUp,tower)
    tower.update = specs.update || update;    

    return _.extend(tower, specs || {});
  }

  return create;
});
