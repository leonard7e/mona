var emitMenuMsg = function (mtype, etype, $scope, $element) {
  $element.bind(etype, function (msg) {
    $scope.$emit('menuItemEvent', {
      type: mtype,
      navId: $scope.navItem
    });
  });
};

app.directive('navItem', function() {
  return {
    'restrict': 'A',
    scope: {
      navItem: '='
    },
    link: function($scope, $element, $attributes) {
      emitMenuMsg("enterMenu", "focus", $scope, $element);
      emitMenuMsg("enterMenu", "mouseenter", $scope, $element);
      emitMenuMsg("itemBlur", "blur", $scope, $element);
    },
  };
});
