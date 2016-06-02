app.controller('MainDropdownNav', function ($scope) {
  $scope.mesg = "";
  $scope.$on('insideMenu', function (event, target) {
    $scope.$broadcast('showMenu', target);
  });
});

app.controller('Dropdown', function ($scope) {
  $scope.itsId = null;
  $scope.doPopup = false;
  $scope.init = function (target) {
    $scope.itsId = target;
  }
  $scope.$on('showMenu', function (event, target) {
    if (target === $scope.itsId) {
      $scope.doPopup = true;
      $scope.$digest();
    } else {
      $scope.doPopup = false;
      $scope.$digest();
    }
  });
});
