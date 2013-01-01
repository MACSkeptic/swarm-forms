define(function (require) {
  module('chaser');

  var chaser = require('../../../lib/entities/enemies/chaser');

  test('chases target', function () {
    var c = chaser({ x: 0, y: 0, chaseVelocity: 5 });

    updateWithTargetAt.apply(c, [3, 4]);
    
    equal(c.velocityX, 3);
    equal(c.velocityY, 4);
  });

  function updateWithTargetAt(x, y) {
    this.update({ currentScene: { player: { x: x, y: y, type: 'player' } } });
  }
});
