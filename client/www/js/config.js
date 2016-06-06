angular.module('controlePresenca')
  .constant('AUTH_EVENTS', {
    notAuthenticated: 'auth-not-authenticated'
  })
  .constant('API_ENDPOINT', {
    url: 'http://localhost:9804/controlePresenca'
  });
