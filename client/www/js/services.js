angular.module('controlePresenca.services', [])
  .service('AuthService', function($q, $http, API_ENDPOINT) {
    var LOCAL_TOKEN_KEY = 'ejec2016';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }
    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }
    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;

      $http.defaults.headers.common.Authorization = authToken;
    }
    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }
    // var register = function(user) {
    //   return $q(function(resolve, reject) {
    //     $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
    //       if (result.data.success) {
    //         resolve(result.data.msg);
    //       } else {
    //         reject(result.data.msg);
    //       }
    //     });
    //   });
    // };
    var login = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/auth/login', user).then(function(result) {
          if(result.data.success) {
            storeUserCredentials(result.data.token);
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };
    var logout = function() {
      destroyUserCredentials();
    };

    loadUserCredentials();
    return {
      login: login,
      // register: register,
      logout: logout,
      isAuthenticated: function() { return isAuthenticated; }
    };
  })

  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (res) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
        }[res.status], res);
        return $q.reject(res);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })

  .factory('API', function($rootScope, $http, $ionicLoading, $window) {
    var base = "http://localhost:9804";
    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        context: text ? text : 'Carregando aplicativo',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };
    $rootScope.hide = function() {
      $ionicLoading.hide();
    };

    $rootScope.logout = function() {
      $rootScope.setToken("");
      $window.location.href = '#/auth/signin';
    };

    $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTimeout(function() {
        $rootScope.hide();
      }, 1999);
    };

    $rootScope.doRefresh = function(tab) {
      if (tab == 1)
        $rootScope.$broadcast('fetchAll');
      else
        $rootScope.$broadcast('fetchCompleted');

      $rootScope.$broadcast('scroll.refreshComplete');
    };

    $rootScope.setToken = function(token) {
      return $window.localStorage.token = token;
    };

    $rootScope.getToken = function() {
      return $window.localStorage.token;
    };

    $rootScope.isSessionActive = function() {
      return $window.localStorage.token ? true : false;
    };
    return {
      signin: function(form) {
        return $http.post(base + '/controlePresenca/auth/login', form);
      },
      register: function(form) {
        return $http.post(base + '/controlePresenca/auth/register', form);
      },
      eventos: function(email) {
        return $http.get(base + '/controlePresenca/evento', {
          method: 'GET',
          params: {
            token: email
          }
        });
      },
      relatorio: function(_id, email) {
        return $http.get(base + '/controlePresenca/evento/detalhes/' + _id, {
          method: 'GET',
          params: {
            token: email
          }
        });
      },
      periodos: function(_id, email) {
        return $http.get(base + '/controlePresenca/evento/periodos/' + _id, {
          method: 'GET',
          params: {
            token: email
          }
        });
      },
      novoEvento: function(form, email) {
        return $http.post(base + '/controlePresenca/evento/', form, {
          method: 'POST',
          params: {
            token: email
          }
        });
      },
      novoPeriodo: function(_id, form, email) {
        _
        return $http.post(base + '/controlePresenca/evento/periodo/' + id, form, {
          method: 'POST',
          params: {
            token: email
          }
        });
      },
      lancarPresenca: function(_id, form, email) {
        return $http.post(base + '/controlePresenca/evento/periodo/presenca/' + _id, form, {
          method: 'POST',
          params: {
            token: email
          }
        });
      },
      removerEvento: function(_id, email) {
        return $http.delete(base + '/controlePresenca/evento/' + _id, {
          method: 'DELETE',
          params: {
            token: email
          }
        });
      },
      removerPeriodo: function(_id, form, email) {
        return $http.delete(base + '/controlePresenca/evento/periodo/' + _id, form, {
          method: 'DELETE',
          params: {
            token: email
          }
        });
      }
    }
  });
