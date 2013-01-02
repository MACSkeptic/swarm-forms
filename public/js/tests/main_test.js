define(function (require) {
  require('./entities/rock_test');
  require('./entities/player_test');

  require('./entities/enemies/turret_test');
  require('./entities/enemies/chaser_test');

  require('./modifiers/collision_test');

  require('./behaviours/moves_test');

  QUnit.start();
});
