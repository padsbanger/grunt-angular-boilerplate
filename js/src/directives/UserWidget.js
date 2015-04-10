app.directive('userWidget', function() {
  return {
    restirct: 'E',
    transclude: true,
    scope: {
      data: '=data'
    },
    templateUrl: 'views/templates/user.html',
    link: function() {}
  }
});
