app.controller('Banner', function ($scope, $window) {
  $scope.doSandwich = undefined;
  $scope.sandwichMenuOpened = undefined;

  var query_media = function () {
    var wdt = $window['outerWidth'];
    if (wdt < 600) {
      console.log("Portable mode");
      $scope.doSandwich = true;
      $scope.sandwichMenuOpened = false;
    } else {
      console.log("Desktop mode")
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
  $window.onresize = function () {
    $scope.$apply( query_media )
  };
});

app.controller('DropdownNav', function ($scope, $document) {
  $scope.$on('menuItemEvent', function (event, msg) {
    if (msg.type === "enterMenu") {
      $scope.$broadcast('popupCtlEvent', {
        type: 'show',
        navId: msg.navId } );
    } else if (msg.type === "itemBlur") {
      $scope.$broadcast('popupCtlEvent', {
        type: 'itemBlur',
        navId: msg.navId } );
    }
  });
});

app.controller('Dropdown', function ($scope, $document) {
  $scope.itsId = null;
  $scope.doPopup = false;
  $scope.itemBlur = false;

  $scope.init = function (target) {
    $scope.itsId = target;
    $document.bind("click", function (event) {
      $scope.$apply(function(){
        $scope.doPopup = false;
      });
    });
  };

  $scope.$on('popupCtlEvent', function (event, msg) {
    if (msg.navId === $scope.itsId || msg.navId == "_ALL_") {
      if        ( msg.type === 'show') {
        $scope.doPopup = true;
        $scope.itemBlur = false;
      } else if ( msg.type === 'hide') {
        $scope.doPopup = false;
        $scope.itemBlur = false;
      } else if ( msg.type === 'itemBlur') {
        $scope.itemBlur = true;
        setTimeout(function(){
          // Wait some time
          if ($scope.itemBlur) {
            $scope.doPopup=false;
            $scope.itemBlur=false;
            $scope.$digest();
          }
        }, 100);
      }
    }
    else if (msg.type == "show") {
      // Hide, because other popups are shown
      $scope.doPopup = false;
    }
    $scope.$digest();
  });
});
