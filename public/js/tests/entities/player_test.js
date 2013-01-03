define(function (require) {
  module('player');

  var player = require('../../lib/entities/player');

  test('moves up when w is pressed', function () {
    equal(keyPressed.apply(player(), ['w']).velocityY, -player().velocity);
  });

  test('moves down when s is pressed', function () {
    equal(keyPressed.apply(player(), ['s']).velocityY, player().velocity);
  });

  test('moves left when a is pressed', function () {
    equal(keyPressed.apply(player(), ['a']).velocityX, -player().velocity);
  });

  test('moves right when d is pressed', function () {
    equal(keyPressed.apply(player(), ['d']).velocityX, player().velocity);
  });

  test('shoots up when up is pressed', function () {
    var p = keyPressed.apply(player(), ['up']);
    equal(p.children[0].velocityY, -player().shotVelocity);
    equal(p.children[0].velocityX, 0);
  });

  test('shoots down when down is pressed', function () {
    var p = keyPressed.apply(player(), ['down']);
    equal(p.children[0].velocityY, player().shotVelocity);
    equal(p.children[0].velocityX, 0);
  });

  test('shoots left when left is pressed', function () {
    var p = keyPressed.apply(player(), ['left']);
    equal(p.children[0].velocityX, -player().shotVelocity);
    equal(p.children[0].velocityY, 0);
  });

  test('shoots right when right is pressed', function () {
    var p = keyPressed.apply(player(), ['right']);
    console.log(p)
    equal(p.children[0].velocityX, player().shotVelocity);
    equal(p.children[0].velocityY, 0);
  });

  function keyPressed(key) {
    this.handleInput({ input: { keyPressed: _.tap(sinon.stub(), function (stub) {
      stub.returns(false);
      stub.withArgs(key).returns(true);
      return stub;
    }) } });

    return this;
  }
});
