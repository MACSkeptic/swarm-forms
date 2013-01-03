define(function (require) {
  module('moves');

  var moves = require('../../lib/behaviours/moves');

  test('calls algorithm', function () {
    var movable = moves({ type: 'self', collidesLike: 'boulder', previousX: 10, previousY: 10 });
    var other = { collidesLike: 'dummy', type: 'other' };

    movable.undoLastMovement(other, function (entities, entityA, entityB) {
      ok(entities[movable.type] === movable);
      ok(entities[movable.collidesLike] === movable);
      ok(entities[other.type] === other);
      ok(entities[other.collidesLike] === other);
      ok(entityA === movable);
      ok(entityB === other);
    });
  });

  test('does not undo', function () {
    expect(0);
    moves().undoLastMovement({}, function () { ok(false); });
  });

  test('undoes x', function () {
    var movable = moves({ x: 10, y: 4, previousX: 5, previousY: 2, velocityX: 5, velocityY: 2 });

    movable.undoLastMovement({}, function () { return movable.x == 10; });

    equal(movable.x, 5);
    equal(movable.y, 4);
    equal(movable.velocityX, 0)
  });

  test('undoes y', function () {
    var movable = moves({ x: 10, y: 4, previousX: 5, previousY: 2, velocityX: 5, velocityY: 2 });

    movable.undoLastMovement({}, function () { return movable.y == 4; });

    equal(movable.x, 10);
    equal(movable.y, 2);
    equal(movable.velocityY, 0);
  });

  test('undoes both', function () {
    var movable = moves({
      x: 10, y: 4, previousX: 5, previousY: 2, velocityX: 5, velocityY: 2,
      type: 'self', collidesLike: 'boulder'
    });

    movable.undoLastMovement({}, function () { return true; });

    equal(movable.x, 5);
    equal(movable.y, 2);
    equal(movable.velocityY, 0);
    equal(movable.velocityX, 0);
  });
});
