app.directive('navItem', function() {
  var emitInsideMenu = function (etype, $scope, $element) {
    $element.bind(etype, function (msg) {
      $scope.$emit('insideMenu', $scope.navItem);
    });    
  };
  return {
    'restrict': 'A',
    scope: {
      navItem: '='
    },
    link: function($scope, $element, $attributes) {
      emitInsideMenu("focus", $scope, $element);
      emitInsideMenu("mouseenter", $scope, $element);
    },
  };
});
