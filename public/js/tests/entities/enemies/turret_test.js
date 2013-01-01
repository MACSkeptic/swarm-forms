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

  test('cannot shoot in quick succession', function () {
    var t = turret({ x: 0, y: 0, shotVelocity: 5 });
    t.shootAt({ x: 3, y: 4 });
    t.shootAt({ x: 3, y: 4 });
    t.shootAt({ x: 3, y: 4 });

    equal(t.children.length, 1);
  });

  test('automatically shoots after the minimum time', function () {
    var t = turret({ x: 0, y: 0, shotVelocity: 5 });

    updateWithTargetAt.apply(t, [3, 4]);
    equal(t.children.length, 1);
    equal(t.children[0].velocityX, 3);
    equal(t.children[0].velocityY, 4);

    updateWithTargetAt.apply(t, [3, 4]);
    updateWithTargetAt.apply(t, [3, 4]);
    equal(t.children.length, 1);

    timePasses.apply(t, [t.timeRequiredBetweenShots]);
    updateWithTargetAt.apply(t, [3, 4]);
    equal(t.children.length, 2);
    equal(t.children[1].velocityX, 3);
    equal(t.children[1].velocityY, 4);

    updateWithTargetAt.apply(t, [3, 4]);
    updateWithTargetAt.apply(t, [3, 4]);
    equal(t.children.length, 2);
  });

  function timePasses(elapsed) {
    this.update({ elapsed: elapsed, currentScene: {} });
  }

  function updateWithTargetAt(x, y) {
    this.update({ currentScene: { player: { x: x, y: y, type: 'player' } }, elapsed: 0 });
  }
});
