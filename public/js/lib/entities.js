define(function (require) {
  return {
    room:              require('./entities/room'),
    boundaries:        require('./entities/boundaries'),
    rock:              require('./entities/rock'),
    hole:              require('./entities/hole'),
    triggerToNextRoom: require('./entities/trigger_to_next_room'),
    player:            require('./entities/player'),
    enemies:           require('./entities/enemies')
  };
});
