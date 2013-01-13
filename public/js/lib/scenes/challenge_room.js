define(function (require) {
  var entities = [],
      entitiesModule = require('../entities'),
      room = entitiesModule.room,
      player = entitiesModule.player,
      rock = entitiesModule.rock,
      hole = entitiesModule.hole,
      chaser = entitiesModule.enemies.chaser,
      turret = entitiesModule.enemies.turret,
      superTurret = entitiesModule.enemies.superTurret,
      wanderer = entitiesModule.enemies.wanderer,
      boundaries = entitiesModule.boundaries,
      score = entitiesModule.score(),
      currentPlayer = player({ x: 1152 / 2, y: 720 / 2 });

  function init(callback) {
    entities.push(boundaries({ maxX: 1152, maxY: 720 }));
    entities.push(room({ width: 1152, height: 720 }));

    entities.push(rock({ x: 1152 * 0.3, y: 720 * 0.3 }));
    entities.push(rock({ x: 1152 * 0.7, y: 720 * 0.3 }));
    entities.push(rock({ x: 1152 * 0.3, y: 720 * 0.7 }));
    entities.push(rock({ x: 1152 * 0.7, y: 720 * 0.7 }));

    entities.push(hole({ x: 1152 * 0.2, y: 720 * 0.5, width: 1152 * 0.4 }));
    entities.push(hole({ x: 1152 * 0.8, y: 720 * 0.5, width: 1152 * 0.4 }));

    entities.push(currentPlayer);

    spawnLevel1();

    entities.push(score);

    callback();
  }

  function spawnLevel1() {
    entities.push(turret({ x: 1152 * 0.2, y: 720 * 0.2 }));
    entities.push(turret({ x: 1152 * 0.2, y: 720 * 0.8 }));
    entities.push(turret({ x: 1152 * 0.8, y: 720 * 0.2 }));
    entities.push(turret({ x: 1152 * 0.8, y: 720 * 0.8 }));

    entities.push(wanderer({ x: 1152 * 0.1, y: 720 * 0.1 }));
    entities.push(wanderer({ x: 1152 * 0.1, y: 720 * 0.9 }));
    entities.push(wanderer({ x: 1152 * 0.9, y: 720 * 0.1 }));
    entities.push(wanderer({ x: 1152 * 0.9, y: 720 * 0.9 }));

    entities.push(chaser({ x: 1152 * 0.2, y: 720 * 0.1 }));
    entities.push(chaser({ x: 1152 * 0.3, y: 720 * 0.8 }));
    entities.push(chaser({ x: 1152 * 0.9, y: 720 * 0.2 }));
    entities.push(chaser({ x: 1152 * 0.8, y: 720 * 0.7 }));
  }

  function spawnLevel2() {
    if (this.level2) { return; }
    this.level2 = true;

    this.entities.push(superTurret({ x: 1152 * 0.2, y: 720 * 0.2 }));
    this.entities.push(superTurret({ x: 1152 * 0.2, y: 720 * 0.8 }));
    this.entities.push(superTurret({ x: 1152 * 0.8, y: 720 * 0.2 }));
    this.entities.push(superTurret({ x: 1152 * 0.8, y: 720 * 0.8 }));

    this.entities.push(superTurret({ x: 1152 * 0.5, y: 720 * 0.2 }));
    this.entities.push(superTurret({ x: 1152 * 0.5, y: 720 * 0.8 }));
  }

  function update(params) {
    if (score.score == 12) { spawnLevel2.apply(this); }
  }

  function increaseScore() { score.increment(); }

  function handleInput(params) { currentPlayer.handleInput(params); }

  return {
    'init': init,
    'update': update,
    'entities': entities,
    'handleInput': handleInput,
    'increaseScore': increaseScore,
    'width': 1152,
    'height': 720,
    'name': 'first-room'
  };
});
