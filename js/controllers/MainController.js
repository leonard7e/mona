app.controller('responsiveDesign', function($scope, $window, $rootScope) {
  // $scope.breakpoint -> 1 (Portalbe)
  // $scope.breakpoint -> 2 (Desktop)
  // $scope.breakpoint -> 3 (Wide Desktop)
  $scope.breakpoint = undefined;

  var win = angular.element($window);

  var update_bpoint = function (bp) {
    if ($scope.breakpoint !== bp) {
      $scope.breakpoint = bp;
    }
  };

  var query_media_breakpoints = function () {
    var wdt = $window['innerWidth'];
    if (wdt <= 700) {
      update_bpoint(1); // portable mode
    } else if (wdt <= 900) {
      update_bpoint(2); // desktop mode
    } else {
      update_bpoint(3); // wide desktop mode
    }
  };

  // Here we keep tracking our breakpoints for responsive design.
  win.bind('resize', function () {
    $scope.$apply( query_media_breakpoints )
  });

  // Broadcasting free window-click. Event will be used in descendant controllers.
  win.bind('click', function (){
    $rootScope.$broadcast('document.click');
  });

  // Set breakpoints on page load just now.
  query_media_breakpoints();
});

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

app.controller('DropdownNav', function ($scope) {
  $scope.activeMenu = -1;

  $scope.doNavSwitch = function($event,menuid) {
    if( $scope.activeMenu === menuid ) {
      $scope.activeMenu = -1;
    } else {
      $scope.activeMenu = menuid;
    }
    $event.stopPropagation();
  };

  $scope.isActive = function(menuid) {
    return $scope.activeMenu === menuid;
  };

  $scope.$on("document.click", function (e, a) {
    $scope.$apply(function () {
      $scope.activeMenu = -1;
    });
  });
});
