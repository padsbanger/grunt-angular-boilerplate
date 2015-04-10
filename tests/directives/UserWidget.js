'use strict';

describe('User widget directive', function () {
  var scope, element, template;

  beforeEach(module('app', 'views/templates/user.html'));

  beforeEach(inject(function ($rootScope, $compile, $templateCache, $filter) {

    scope = $rootScope.$new();

    template = $templateCache.get('views/templates/user.html');
    $templateCache.put('views/templates/user.html', template);

    scope.data =   {
      name: 'Bob',
      alliance: 'United Knights',
      status: 'enemy',
      date: '19.06.14'
    },

    element = $compile('<user-widget data=data>')(scope);

    scope.$digest();
  }));

  it('should contain field name', function() {
    expect(element.find('h4').text()).toContain('Bob');
  });

});
