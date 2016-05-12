angular.module('controlePresenca.services', [])
  .factory('API', function($rootScope, $http, $ionicLoading, $window) {
      var base = "http://localhost:9804";
      $rootScope.show = function(text) {
        $rootScope.loading = $ionicLoading.show({
          context: text ? text : 'Vai um café enquanto carregamos o aplicativo para você?',
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
        signin: function (form) {
          return $http.post(base+'/controlePresenca/auth/login', form);
        },
        register: function (form) {
          return $http.post(base+'/controlePresenca/auth/register', form);
        },
        eventos: function (email) {
          return $http.get(base+'/controlePresenca/evento', {
            method: 'GET',
            params: {
              token: email
            }
          });
        },
        relatorio: function(_id, email) {
          return $http.get(base+'/controlePresenca/evento/detalhes/'+_id, {
            method: 'GET',
            params: {
              token: email
            }
          });
        },
        periodos: function(_id, email) {
          return $http.get(base+'/controlePresenca/evento/periodos/'+_id, {
            method: 'GET',
            params: {
              token: email
            }
          });
        },
        novoEvento: function(form, email) {
          return $http.post(base+'/controlePresenca/evento/', form, {
            method: 'POST',
            params: {
              token: email
            }
          });
        },
        novoPeriodo: function(_id, form, email) {_
          return $http.post(base+'/controlePresenca/evento/periodo/' + id, form, {
            method: 'POST',
            params: {
              token: email
            }
          });
        },
        lancarPresenca: function(_id, form, email) {
          return $http.post(base+'/controlePresenca/evento/periodo/presenca/'+_id, form, {
            method: 'POST',
            params: {
              token: email
            }
          });
        },
        removerEvento: function(_id, email) {
          return $http.delete(base+'/controlePresenca/evento/'+_id, {
            method: 'DELETE',
            params: {
              token: email
            }
          });
        },
        removerPeriodo: function(_id, form, email) {
          return $http.delete(base+'/controlePresenca/evento/periodo/'+_id, form, {
            method: 'DELETE',
            params: {
              token: email
            }
          });
        }
      }
    });
    //
    // .factory('Eventos', function() {
    //   var eventos = [{
    //     id: 0,
    //     nome: 'Semana da Física 2016',
    //     img: '../img/adam.jpg'
    //   }, {
    //     id: 1,
    //     nome: 'Semana da Física 2015',
    //     img: '../img/ben.png'
    //   }];
    //   return {
    //     all: function() {
    //       return eventos;
    //     },
    //     remove: function(evento) {
    //       eventos.splice(eventos.indexOf(evento), 1);
    //     },
    //     get: function(eventoId) {
    //       for (var i = 0; i < eventos.length; i++) {
    //         if (eventos[i].id === parseInt(eventoId)) {
    //           return eventos[i];
    //         }
    //       }
    //       return null;
    //     }
    //   };
    // })
    //
    // .factory('Periodos', function() {
    //   var periodos = [{
    //     id: 0,
    //     data: '15/15/2015',
    //     horarioInicio: '20h20',
    //     horarioFim: '21h20',
    //     descricao: 'Palestra do Reitor'
    //   }, {
    //     id: 1,
    //     data: '15/15/2015',
    //     horarioInicio: '21h30',
    //     horarioFim: '22h30',
    //     descricao: 'Palestra da EJEC'
    //   }];
    //   return {
    //     all: function() {
    //       return periodos;
    //     },
    //     remove: function(periodo) {
    //       periodos.splice(periodos.indexOf(periodo), 1);
    //     },
    //     get: function(periodoId) {
    //       for (var i = 0; i < periodos.length; i++) {
    //         if (periodos[i].id === parseInt(periodoId)) {
    //           return periodos[i];
    //         }
    //       }
    //       return null;
    //     }
    //   };
    // });
