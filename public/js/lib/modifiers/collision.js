define(function () {
  var detectors = {};

  function canCollide(entityA, entityB) {
    return !(entityA === entityB) &&
      !entityA.disposed && !entityB.disposed &&
      (entityA.collidesWith || {})[entityB.type];
  }

  function collided(entityA, entityB) {
    var params = {};
    params[entityA.type] = entityA;
    params[entityB.type] = entityB;
    return detector(entityA, entityB)(params, entityA, entityB);
  }

  function applyTo(entityA, entityB) {
    var aCanCollideWithB = canCollide(entityA, entityB),
        bCanCollideWithA = canCollide(entityB, entityA);

    if (!aCanCollideWithB && !bCanCollideWithA) { return; }

    if (collided(entityA, entityB)) {
      if (aCanCollideWithB) { entityA.collidesWith[entityB.type].apply(entityA, [entityB]); }
      if (bCanCollideWithA) { entityB.collidesWith[entityA.type].apply(entityB, [entityA]); }
    }
  }

  function detector(entityA, entityB) {
    var detectorA = detectors[entityA.type],
        detectorB = detectors[entityB.type];

    return (detectorA && detectorA[entityB.type]) ||
      (detectorB && detectorB[entityA.type]) ||
      function () {
        console.error(
          'could not find a detector for: ' +
          entityA.type + ', ' +
          entityB.type
        );
        return false;
      };
  }

  function rectangleAndRectangle(entityA, entityB) {
    var x1 = entityA.x;
    var x2 = entityB.x;

    var y1 = entityA.y;
    var y2 = entityB.y;

    var size1 = entityA.width/2;
    var size2 = entityB.width/2;

    var bottom1, bottom2, left1, left2, right1, right2, top1, top2;
    left1 = x1 - size1;
    right1 = x1 + size1;
    top1 = y1 - size1;
    bottom1 = y1 + size1;
    left2 = x2 - size2;
    right2 = x2 + size2;
    top2 = y2 - size2;
    bottom2 = y2 + size2;
    return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
  }

  function shotAndRock(entities) {
    return circleAndRectangle(entities.shot, entities.rock);
  }

  function circleAndRectangle(circle, rectange) {
    var cdx = Math.abs(circle.x - rectange.x),
        cdy = Math.abs(circle.y - rectange.y);

    if (cdx > (rectange.width/2 + circle.radius)) { return false; }
    if (cdy > (rectange.height/2 + circle.radius)) { return false; }

    if (cdx <= (rectange.width/2)) { return true; }
    if (cdy <= (rectange.height/2)) { return true; }

    return (
      Math.pow(cdx - rectange.width/2, 2) +
      Math.pow(cdy - rectange.height/2, 2)
    ) <= Math.pow(circle.radius, 2);
  }

  function shotOutOfBounds(entities) {
    return (entities.shot.x - entities.shot.radius) < entities.boundaries.minX ||
      (entities.shot.x + entities.shot.radius) > entities.boundaries.maxX ||
      (entities.shot.y - entities.shot.radius) < entities.boundaries.minY ||
      (entities.shot.y + entities.shot.radius) > entities.boundaries.maxY;
  }

  function playerAndShot(entities) {
    return false;
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

  function areaTriggerAndPlayer(entities){
    return rectangleAndRectangle(entities.areaTrigger, entities.player);
  }

  function shotAndTower(entities){
    return circleAndRectangle(entities.shot, entities.tower);
  }

  function playerAndRock(entities) {
    return false;
  }

  function setupDetectors() {
    addDetector('tower'      , 'shot'              , shotAndTower               );
    addDetector('shot'       , 'shot'              , shotAndShot                );
    addDetector('shot'       , 'rock'              , shotAndRock                );
    addDetector('boundaries' , 'shot'              , shotOutOfBounds            );
    addDetector('player'     , 'shot'              , playerAndShot              );
    addDetector('player'     , 'areaTrigger'       , areaTriggerAndPlayer       );
    addDetector('player'     , 'triggerToNextRoom' , playerAndTriggerToNextRoom );
    addDetector('player'     , 'rock'              , playerAndRock              );
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

  return {
    "applyTo": applyTo,
    "init": init
  };
});
