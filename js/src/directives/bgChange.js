'use strict';

app.directive('bgChange', function($document) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.on('click', function() {
        var color = Math.floor((Math.random() * 255) + 1);
        angular.element($document[0].body).css('background', '#' + color);
      })
    }
  };
});