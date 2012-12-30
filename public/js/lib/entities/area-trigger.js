define(function () {

  function triggered(){
    this.callback();
  }
  
  function create( area, callback) {
    var areaTrigger = {};
    _.extend(areaTrigger,specs);
    areaTrigger.type = 'area-trigger';
    areaTrigger.x = 0;
    areaTrigger.y = 0;
    areaTrigger.width = 20;
    areaTrigger.height = 20;
    areaTrigger.triggered = _.bind(triggered,areaTrigger);

    return areaTrigger;
  }

  return create;
});
