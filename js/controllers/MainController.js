app.controller('MainDropdownNav', function ($scope) {
  $scope.mesg = "";
  $scope.$on('insideMenu', function (event, target) {
    $scope.$broadcast('showMenu', target);
  });
});


app.controller('Dropdown', function ($scope) {
  $scope.itsId = null;
  $scope.isHidden = true;
  $scope.init = function (target) {
    $scope.itsId = target;
  }
  $scope.$on('showMenu', function (event, target) {
    if (target === $scope.itsId) {
      $scope.isHidden = false;
    } else {
      $scope.isHidden = true;
    }
  });
});

app.controller('NavItem', function ($scope) {
  $scope.handleFocus = function (msg) {
    $scope.$emit('insideMenu', msg);
  };
});
