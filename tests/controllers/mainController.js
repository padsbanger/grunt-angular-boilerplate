'use strict';

describe('Main controller', function() {
  var scope, mainController, location, route, rootScope;

  beforeEach(module('app'));

  beforeEach(inject(function($controller, $rootScope ) {
    rootScope = $rootScope;
    scope = $rootScope.$new();

    mainController = $controller('mainController', {
      $scope: scope
    });

  }));

  it('should use correct route controller', function() {
    expect(scope.data.length).toBe(5);

  });
});
