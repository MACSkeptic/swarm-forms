define(function (require) {
  module('rock');

  var rock = require('../../lib/entities/rock');

  test('is a rock', function () { equal(rock().type, 'rock'); });
  test('has width', function () { ok(rock().width); });
  test('has height', function () { ok(rock().height); });
});
