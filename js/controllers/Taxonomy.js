app.controller('taxonomy', function($scope){
  // The selection of taxonomy items
  $scope.taxSelect = {
    "town": [],
    "category": [],
    "tag": [],
  };

  // Complete taxonomy hierarchy
  $scope.taxonomy = {
    "town": [],
    "category": [],
    "tag": [],
  };

  $scope.taxInit = function (tax) {
    function register_tax (town, category, tag) {
      function add_if_needed(name, target, section, value) {
        if ( $scope.taxonomy[name][target] === undefined) {
          $scope.taxonomy[name][target] = {};
        } if ( $scope.taxonomy[name][target][section] === undefined ){
          $scope.taxonomy[name][target][section] = [value];
        } else if ( !($scope.taxonomy[name][target][section].indexOf(value) >= 0) ){
          $scope.taxonomy[name][target][section].push(value);
          $scope.taxonomy[name][target][section].sort(); // TODO: faster insert, basing on splice
        }
      };
      add_if_needed("town", town, "category", category);
      add_if_needed("town", town, "tag", tag);
      add_if_needed("category", category, "town", town);
      add_if_needed("category", category, "tag", tag);
      add_if_needed("tag", tag, "town", town);
      add_if_needed("tag", tag, "category", category);
    };

    tax.town.forEach(function(town) {
      tax.category.forEach(function(category) {
        tax.tag.forEach(function(tag) {
          register_tax(town, category, tag);
        })
      })
    });
  };


  // ---
  function tax_match ( tax, name, def ) {
    function tax_match_selection (tax, name) {
      for (var i =0; i< tax[name].length; ++i) {
        if($scope.taxSelect[name].indexOf(tax[name][i])>= 0) {
          return true;
        }
      }
      return false;
    };

    if($scope.taxSelect[name].length > 0) {
      return tax_match_selection(tax, name);
    }
    return def;
  }


  // ---
  $scope.taxHideBlogItem = function (tax) {
    return !(tax_match(tax, "town", true) && tax_match(tax, "category", true) && tax_match(tax, "tag", true));
  };

  $scope.taxSwitchActive = function (name, tax) {
    return tax_match(tax, name, false);
  };




  // ---
  function hide_switch (name, value) {
    var to_hide = undefined;
    if (name == "town") {to_hide = ["category", "tag"]};
    if (name == "category") {to_hide = ["town", "tag"]};
    if (name == "tag") {to_hide = ["town","category"]};

    for (x = 0; x<to_hide.length; ++x) {
      var target = to_hide[x];
      if ($scope.taxSelect[target].length > 0) {
        for ( i in $scope.taxSelect[target]) {
          if($scope.taxonomy[name][value][target] == undefined)
          {
            console.log(name, target, $scope.taxonomy[name][value])
          };
          if ($scope.taxonomy[name][value][target].indexOf($scope.taxSelect[target][i]) >= 0) {
            return false;
          }
        };
        return true;
      }
    }
    return false;
  };

  $scope.taxHideTownSwitch = function (tw) {
    return hide_switch("town", tw);
  };

  $scope.taxHideCategorySwitch = function (c) {
    return hide_switch("category", c);
  };

  $scope.taxHideTagSwitch = function (t) {
     return hide_switch("tag", t);
  };

  // ---
  $scope.taxDoSwitch = function (name,value) {
    function switch_tax (name, value) {
      function select_tax (name, value) {
        if ( !($scope.taxSelect[name].indexOf(value) >= 0) ){
          $scope.taxSelect[name].push(value);
          $scope.taxSelect[name].sort(); // TODO: faster insert, basing on splice
        }
      };

      function deselect_tax (name, value) {
        idx = $scope.taxSelect[name].indexOf(value);
        if (idx >= 0) {
          $scope.taxSelect[name].splice(idx, 1);
        } else {
          console.log ("Error:", name,"->",value, "not inside taxonomy")
        }
      };

      if ($scope.taxSelect[name].indexOf(value) >= 0) {
        deselect_tax(name, value);
      } else {
        select_tax(name, value);
      };
    };

    switch_tax(name,value);
  };
});


app.controller('sidebarCtrl', function ($scope) {
  $scope.filterActive = [];
  $scope.filterInit = function (idx) {
    $scope.filterActive.push(idx);
    // insert idx into filterActive only once
  };
  $scope.filterSwitch = function (idx) {
    var pos = $scope.filterActive.indexOf(idx);
    if (pos >= 0) {
      $scope.filterActive.splice(pos, 1);
    } else {
      $scope.filterActive.push(idx);
    }
  };
  $scope.filterIsActive = function (idx) {
    return ($scope.filterActive.indexOf(idx) === -1);
  };
});
