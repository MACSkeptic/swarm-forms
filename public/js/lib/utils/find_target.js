define(function () {
  function randomElementOf(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function isOfType(type) {
    return function (element) { return element && element.type == type; };
  }

  function findTargetOfType(lists) {
    var targetList;

    _.find(lists || [], function (list) {
      targetList = _.filter(list || [], isOfType(this.type));
      return targetList && targetList.length > 0 && targetList;
    }, this);

    return targetList && randomElementOf(targetList);
  }

  function sexyFind(type) {
    return { "amongst": findTargetOfType, "type": type };
  }

  return {
    ofType: sexyFind
  };
});
