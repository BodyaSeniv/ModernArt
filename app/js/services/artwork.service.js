angular.module('app')
  .factory('Artwork', [
    '$resource', 'host',
    function ($resource, host) {
      var link = host + 'classes/Artwork/:action';
      return $resource(link, { action: '@action'}, {
        getAll: { method: 'GET',  params: { action: ''  } },
        create: { method: 'POST',  params: { action: ''  } },
        getOne: { method: 'GET',  params: { action: '@action'  } },
        delete: { method: 'DELETE', params: { action: '$resource.id' } },
        update: { method: 'PUT',  params: { action: '@action'  } },
      });
    }]);
