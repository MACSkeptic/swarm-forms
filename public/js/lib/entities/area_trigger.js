define(function () {

  function triggered(){
    this.callback();
  }
  
  function create( area, callback) {
    var areaTrigger = {};        
    areaTrigger.type = 'areaTrigger';
    areaTrigger.x = 0;
    areaTrigger.y = 0;
    areaTrigger.width = 20;
    areaTrigger.height = 20;
    _.extend(areaTrigger,area);
    areaTrigger.callback = callback;
    areaTrigger.triggered = _.bind(triggered,areaTrigger);
    areaTrigger.collidesWith = { player: triggered };

    return areaTrigger;
  }

  return create;
});
