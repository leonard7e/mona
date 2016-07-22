app.controller('Banner', function ($scope, $window) {
  $scope.doSandwich = undefined;
  $scope.sandwichMenuOpened = undefined;

  var query_media = function () {
    var wdt = $window['outerWidth'];
    if (wdt <= 700) {
      $scope.doSandwich = true;
      $scope.sandwichMenuOpened = false;
    } else {
      $scope.doSandwich = false;
      $scope.sandwichMenuOpened = true;
    }
  };

  $scope.init = function() {
    query_media();
  }

  $scope.toggleSandwich = function() {
    $scope.sandwichMenuOpened = !$scope.sandwichMenuOpened;
  };

  var win = angular.element($window);
  win.bind('resize', function () {
    $scope.$apply( query_media )
  });
});

app.controller('DropdownNav', function ($scope, $document) {
  $scope.activeMenu = -1;


  $scope.doDisable = function () {
    $scope.activeMenu = -1;
  }
  $scope.doActivate = function(menuid) {
    $scope.activeMenu = menuid;
    event.stopPropagation();
  };
  $scope.isActive = function(menuid) {
    return $scope.activeMenu === menuid;
  };

  $document.on('click', function (){$scope.$apply($scope.doDisable)});
});
