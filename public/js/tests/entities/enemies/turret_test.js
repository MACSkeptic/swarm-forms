define(function (require) {
  module('turret');

  var turret = require('../../../lib/entities/enemies/turret');

  test('shoots at target', function () {
    var t = turret({ x: 0, y: 0, shotVelocity: 5 });
    t.shootAt({ x: 3, y: 4 });
    
    equal(t.children[0].type, 'shot');
    equal(t.children[0].enemy, true);
    equal(t.children[0].velocityX, 3);
    equal(t.children[0].velocityY, 4);
  });
});
