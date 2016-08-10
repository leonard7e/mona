app.controller('taxonomy', function($scope){
  // The selection of taxonomy items
  $scope.taxSelect = {
    "category": [],
    "tag": []
  };

  // Complete taxonomy hierarchy
  $scope.taxonomy = {
    "category": [],
    "tag": []
  };

  $scope.taxInit = function (tax) {
    function register_tax (category, tag) {
      function add_if_needed(name, target, value) {
        if ( $scope.taxonomy[name][target] === undefined ){
          $scope.taxonomy[name][target] = [value];
        } else if ( !($scope.taxonomy[name][target].indexOf(value) >= 0) ){
          $scope.taxonomy[name][target].push(value);
          $scope.taxonomy[name][target].sort(); // TODO: faster insert, basing on splice
        }
      };
      add_if_needed("category", category, tag);
      add_if_needed("tag", tag, category);
    };

    tax.category.forEach(function(category) {
      tax.tag.forEach(function(tag) {
        register_tax(category, tag);
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
    return !(tax_match(tax, "category", true) && tax_match(tax, "tag", true));
  };

  // ---
  function hide_switch (name, target, value) {
    if ($scope.taxSelect[target].length > 0) {
      for ( i in $scope.taxSelect[target]) {
        if ($scope.taxonomy[name][value].indexOf($scope.taxSelect[target][i]) >= 0) {
          return false;
        }
      };
      return true;
    } else {
      return false;
    }
  };

  // ---
  $scope.taxHideCategorySwitch = function (c) {
    return hide_switch("category", "tag", c);
  };

  $scope.taxHideTagSwitch = function (t) {
     return hide_switch("tag", "category", t);
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

  $scope.taxSwitchActive = function (name, tax) {
    return tax_match(tax, name, false);
  };
});
