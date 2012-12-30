define(function () {    

  function createVector2dFromPointAndModule(x, y, module) {
    var speedVector = $V([module, 0, 0]);
    var destinationVector = $V([x, y, 0]);
    var normalLine = Line.create([0, 0, 0], [0, 0, 1]);
    var angle = speedVector.angleFrom(destinationVector);
    var turnDirection = speedVector.cross(destinationVector);
    if (turnDirection.elements[2] < 0) { angle = Math.PI*2 - angle; }
    var rotatedSpeed = speedVector.rotate(angle, normalLine);  
    return { x: rotatedSpeed.elements[0], y: rotatedSpeed.elements[1] };
  }

  return { createVector2dFromPointAndModule: createVector2dFromPointAndModule; }
}
