'use strict';

describe('Filter: CapitalizeFirstLetter', function() {

  // load the service's module
  beforeEach(module('app'));

  var filters;

  // Initialize the service and a mock backend
  beforeEach(inject(function($injector, $filter) {
    filters = $filter;
  }));


  describe("CapitalizeFirstLetter", function() {

    it('should capitalize the first letter', function() {
      var capitalizedString = filters('CapitalizeFirstLetter')('test');
      expect(capitalizedString).toEqual('Test');
    });

    it('should do nothing when first letter is a number', function() {
      var capitalizedString = filters('CapitalizeFirstLetter')('0test');
      expect(capitalizedString).toEqual('0test');
    });

    it('should work when fist letter is already capitalized', function() {
      var capitalizedString = filters('CapitalizeFirstLetter')('Test');
      expect(capitalizedString).toEqual('Test');
    });

    it('should not fail when string is empty', function() {
      var capitalizedString = filters('CapitalizeFirstLetter')('');
      expect(capitalizedString).toEqual('');
    });

  });

});
