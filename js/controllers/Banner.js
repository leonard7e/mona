app.controller('Banner', function ($scope) {
  $scope.sandwichModeActive = function () {
    return $scope.breakpoint === 1;
  };
  $scope.sandwichActive = false;

  $scope.menuOpened = function() {
    if ($scope.breakpoint > 1) {
      return true;
    } else {
      return $scope.sandwichActive;
    }
  };

  $scope.toggleSandwich = function() {
    $scope.sandwichActive = !$scope.sandwichActive;
  };
});
