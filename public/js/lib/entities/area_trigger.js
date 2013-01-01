define(['../behaviours/rectangle'], function (rectangle) {

  function triggered() { this.whenTriggered && this.whenTriggered(); }

  function create(specs) {
    return _.extend(
      rectangle({ type: 'areaTrigger', width: 20, height: 20, collidesWith: { player: triggered }}),
      specs || {}
    );
  }

  return create;
});
