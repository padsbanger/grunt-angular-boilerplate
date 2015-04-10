app.filter('CapitalizeFirstLetter', ['$filter',
  function($filter) {
    return function(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    };
  }
]);