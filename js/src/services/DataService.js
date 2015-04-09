'use strict';

app.factory('DataService', [

  function() {

    var data = [{
      name: 'Jim',
      alliance: 'Immortal',
      status: 'ally',
      date: '21.06.14'
    },
    {
      name: 'Bob',
      alliance: 'United Knights',
      status: 'enemy',
      date: '19.06.14'
    },
    {
      name: 'Jill',
      alliance: 'Frozen Banners',
      status: 'vassal',
      date: '12.05.14'
    },
    {
      name: 'Jane',
      alliance: 'Balsamiq Kings',
      status: 'nap',
      date: '02.05.14'
    },
     {
      name: 'Joan',
      alliance: 'Killer Robots',
      status: 'enemy',
      date: '27.04.14'
    }];

    return {
      getData: function() {
        return data;
      }
    };
  }
]);