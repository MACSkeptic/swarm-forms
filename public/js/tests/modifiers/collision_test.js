define(function (require) {
  module('collision');

  var collision = require('../../../js/lib/modifiers/collision'),
      boundaries = require('../../../js/lib/entities/boundaries'),
      player = require('../../../js/lib/entities/player'),
      shot = require('../../../js/lib/entities/shot');

  collision.init(function () {
    module('collision between player and shot');

    test('barely collide', function () {
      var p = player({ x: 0, y: 0, radius: 2.5 });
      var s = shot({ x: 3, y: 4, radius: 2.5 });

      ok(collision.applyTo(p, s));
    });

    test('no collision', function () {
      var p = player({ x: 0, y: 0, radius: 2.5 });
      var s = shot({ x: 3.1, y: 4, radius: 2.5 });

      ok(!collision.applyTo(p, s));
    });

    module('collision between generic circle using shot collision algorithm and shot');

    test('barely collide', function () {
      var c = { x: 0, y: 0, radius: 2.5, collidesLike: 'shot', collidesWith: { shot: function () {} } };
      var s = shot({ x: 3, y: 4, radius: 2.5 });

      ok(collision.applyTo(c, s));
    });

    test('no collision', function () {
      var c = { x: 0, y: 0, radius: 2.5, collidesLike: 'shot', collidesWith: { shot: function () {} } };
      var s = shot({ x: 3.1, y: 4, radius: 2.5 });

      ok(!collision.applyTo(c, s));
    });

    module('collision between player and boundaries');

    test('barely collide', function () {
      var p = player({ x: 6, y: 5, radius: 5 });
      var b = boundaries();

      ok(collision.applyTo(p, b));
    });

    test('no collision', function () {
      var p = player({ x: 6, y: 5.1, radius: 5 });
      var b = boundaries();

      ok(!collision.applyTo(p, b));
    });
  });
});
