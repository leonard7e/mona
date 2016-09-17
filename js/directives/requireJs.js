
app.directive('requireJs', function() {
  return {
    'restrict': 'A',
    link: function($scope, $element, $attributes) {
      $element.removeClass("RequireJS");
    }
  };
});
