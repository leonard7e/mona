var emitEnterMenu = function (etype, $scope, $element) {
  $element.bind(etype, function (msg) {
    $scope.$emit('menuItemEvent', {
      type: 'enterMenu',
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
      emitEnterMenu("focus", $scope, $element);
      emitEnterMenu("mouseenter", $scope, $element);
      $element.bind("blur", function (msg){
        $scope.$emit('menuItemEvent', {
          type: 'itemBlur',
          navId: $scope.navItem
        });
      });
    },
  };
});
