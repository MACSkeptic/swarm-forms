define(function () {
  var detectors = {};

  function canCollide(entityA, entityB) {
    return (entityA !== entityB) &&
      !entityA.disposed && !entityB.disposed &&
      (entityA.collidesWith || {})[entityB.type];
  }

  function collided(entityA, entityB) {
    var params = {};
    params[entityA.type] = entityA;
    params[entityB.type] = entityB;
    params[entityA.collidesLike] = entityA;
    params[entityB.collidesLike] = entityB;
    return detector(entityA, entityB)(params, entityA, entityB);
  }

  function applyTo(entityA, entityB) {
    var aCanCollideWithB = canCollide(entityA, entityB),
        bCanCollideWithA = canCollide(entityB, entityA);

    if (!aCanCollideWithB && !bCanCollideWithA) { return; }

    if (collided(entityA, entityB)) {
      if (aCanCollideWithB) {
        entityA.collidesWith[entityB.type].apply(
          entityA, [entityB, detector(entityA, entityB)]);
      }
      if (bCanCollideWithA) {
        entityB.collidesWith[entityA.type].apply(
          entityB, [entityA, detector(entityA, entityB)]);
      }

      return true;
    }
  }

  function detector(entityA, entityB) {
    return typeSpecificDetector(entityA, entityB) ||
      mixedDetector(entityA, entityB) ||
      genericShapeDetector(entityA, entityB) ||
      function () {
        return console.error('could not find a detector for: ' + entityA.type + ', ' + entityB.type,
          'could not find a detector for: ' + entityA.collidesLike + ', ' + entityB.collidesLike) && false;
      };
  }

  function typeSpecificDetector(entityA, entityB) {
    var detectorA = detectors[entityA.type],
        detectorB = detectors[entityB.type];

    return (detectorA && detectorA[entityB.type]) || (detectorB && detectorB[entityA.type]);
  }

  function mixedDetector(entityA, entityB) {
    var detectorA = detectors[entityA.type],
        detectorB = detectors[entityB.type];

    return (detectorA && detectorA[entityB.collidesLike]) || (detectorB && detectorB[entityA.collidesLike]);
  }

  function genericShapeDetector(entityA, entityB) {
    var detectorA = detectors[entityA.collidesLike],
        detectorB = detectors[entityB.collidesLike];

    return (detectorA && detectorA[entityB.collidesLike]) || (detectorB && detectorB[entityA.collidesLike]);
  }

  function rectangleAndRectangle(entityA, entityB) {
    var bottomA = entityA.maxY(),
        bottomB = entityB.maxY(),
        leftA   = entityA.minX(),
        leftB   = entityB.minX(),
        rightA  = entityA.maxX(),
        rightB  = entityB.maxX(),
        topA    = entityA.minY(),
        topB    = entityB.minY();

    return !(leftA > rightB || leftB > rightA || topA > bottomB || topB > bottomA);
  }

  function shotAndRock(entities) {
    return circleAndRectangle(entities.shot, entities.rock);
  }

  function circleAndRectangle(circle, rectangle) {
    var cdx = Math.abs(circle.x - rectangle.x),
        cdy = Math.abs(circle.y - rectangle.y);

    if (cdx > (rectangle.width / 2 + circle.radius)) { return false; }
    if (cdy > (rectangle.height / 2 + circle.radius)) { return false; }

    if (cdx <= (rectangle.width / 2)) { return true; }
    if (cdy <= (rectangle.height / 2)) { return true; }

    return (
      Math.pow(cdx - rectangle.width / 2, 2) +
      Math.pow(cdy - rectangle.height / 2, 2)
    ) <= Math.pow(circle.radius, 2);
  }

  function shotOutOfBounds(entities) {
    return (entities.shot.x - entities.shot.radius) < entities.boundaries.minX ||
      (entities.shot.x + entities.shot.radius) > entities.boundaries.maxX ||
      (entities.shot.y - entities.shot.radius) < entities.boundaries.minY ||
      (entities.shot.y + entities.shot.radius) > entities.boundaries.maxY;
  }

  function wandererAndPlayer(entities) {
    return circleAndRectangle(entities.player, entities.wanderer);
  }

  function playerAndShot(entities) {
    return shotAndShot(undefined, entities.player, entities.shot);
  }

  function playerAndChaser(entities) {
    return circleAndRectangle(entities.player, entities.chaser);
  }

  function chaserAndShot(entities) {
    return circleAndRectangle(entities.shot, entities.chaser);
  }

  function wandererAndShot(entities) {
    return circleAndRectangle(entities.shot, entities.wanderer);
  }

  function shotAndShot(ignore, shotA, shotB) {
    return (
      Math.pow(shotA.x - shotB.x, 2) +
      Math.pow(shotA.y - shotB.y, 2)
    ) <= Math.pow(shotA.radius + shotB.radius, 2);
  }

  function playerAndTriggerToNextRoom(entities) {
    return Math.abs(entities.player.x - 320) < 30 && Math.abs(entities.player.y - 200) < 30;
  }

  function areaTriggerAndPlayer(entities) {
    return rectangleAndRectangle(entities.areaTrigger, entities.player);
  }

  function shotAndTower(entities) {
    return circleAndRectangle(entities.shot, entities.tower);
  }

  function shotAndTurret(entities) {
    return shotAndShot(undefined, entities.shot, entities.turret);
  }

  function playerAndRock(entities) {
    return rectangleAndRectangle(entities.player, entities.rock);
  }

  function playerAndHole(entities) {
    return rectangleAndRectangle(entities.player, entities.hole);
  }

  function playerAndBoundaries(entities) {
    return entities.player.minX() <= entities.boundaries.minX ||
      entities.player.maxX() >= entities.boundaries.maxX ||
      entities.player.minY() <= entities.boundaries.minY ||
      entities.player.maxY() >= entities.boundaries.maxY;
  }

  function wandererAndRock(entities) {
    return rectangleAndRectangle(entities.wanderer, entities.rock);
  }

  function wandererAndHole(entities) {
    return rectangleAndRectangle(entities.wanderer, entities.hole);
  }

  function wandererAndBoundaries(entities) {
    return entities.wanderer.minX() < entities.boundaries.minX ||
      entities.wanderer.maxX() > entities.boundaries.maxX ||
      entities.wanderer.minY() < entities.boundaries.minY ||
      entities.wanderer.maxY() > entities.boundaries.maxY;
  }

  function circleAndCircle(ignore, circleA, circleB) {
    return (
      Math.pow(circleA.x - circleB.x, 2) +
      Math.pow(circleA.y - circleB.y, 2)
    ) <= Math.pow(circleA.radius + circleB.radius, 2);
  }

  function setupDetectors() {
    addDetector('shot', 'rock', shotAndRock);
    addDetector('boundaries', 'shot', shotOutOfBounds);
    addDetector('circle', 'circle', circleAndCircle);
    addDetector('player', 'areaTrigger', areaTriggerAndPlayer);
    addDetector('player', 'triggerToNextRoom', playerAndTriggerToNextRoom);
    addDetector('player', 'rock', playerAndRock);
    addDetector('player', 'hole', playerAndHole);
    addDetector('player', 'boundaries', playerAndBoundaries);
    addDetector('chaser', 'shot', chaserAndShot);
    addDetector('chaser', 'player', playerAndChaser);
    addDetector('wanderer', 'player', wandererAndPlayer);
    addDetector('wanderer', 'shot', wandererAndShot);
    addDetector('wanderer', 'rock', wandererAndRock);
    addDetector('wanderer', 'hole', wandererAndHole);
    addDetector('wanderer', 'boundaries', wandererAndBoundaries);
  }

  function addDetector(entityA, entityB, algorithm) {
    detectors[entityA] = detectors[entityA] || {};
    detectors[entityB] = detectors[entityB] || {};

    detectors[entityA][entityB] = algorithm;
    detectors[entityB][entityA] = algorithm;
  }

  function init(callback) {
    setupDetectors();
    callback();
  }

  return { 'applyTo': applyTo, 'init': init };
});
