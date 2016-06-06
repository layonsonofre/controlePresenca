angular.module('controlePresenca.controllers', ['controlePresenca.services'])

.controller('SignInCtrl', function($scope, AuthService, $ionicPopup, $state) {
  $scope.usuario = {
    email: '',
    senha: ''
  };
  $scope.login = function() {
    console.log($scope.usuario);
    AuthService.login($scope.usuario).then(function(msg) {
      $state.go('controlePresenca.eventos');
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Falha ao acessar',
        template: errMsg
      });
    });
  };
})

.controller('EventosCtrl', function($scope, AuthService, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    AuthService.logout();
  };

  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('auth.signin');
  };
})

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('auth.signin');
    var alertPopup = $ionicPopup.alert({
      title: 'Sessão encerrada',
      template: 'Você precisa realizar o login novamente.'
    });
  });
})

// .controller('SignInCtrl', function($rootScope, $scope, API, $window) {
//   if ($rootScope.isSessionActive()) {
//     $window.location.href = ('#/controlePresenca/eventos');
//   }
//   $scope.user = {
//     email: "",
//     senha: ""
//   };
//
//   $scope.validateUser = function() {
//     var email = this.user.email;
//     var senha = this.user.senha;
//     if (!email || !senha) {
//       $rootScope.notify("As informações de acesso não foram válidas");
//       return false;
//     }
//     $rootScope.show('Por favor, espere enquanto te autenticamos');
//     API.signin({
//       'email': email,
//       'senha': senha
//     }).success(function(data) {
//       console.log(data);
//       $rootScope.setToken(email); // create a session kind of thing on the client side
//       $rootScope.hide();
//       $window.location.href = ('#/controlePresenca/eventos');
//     }).error(function(error) {
//       console.log("error: " + error);
//       $rootScope.hide();
//       $rootScope.notify("Nome de usuário ou senha inválidos");
//     });
//   }
// })
//
// .controller('RegisterCtrl', function($rootScope, $scope, API, $window) {
//   $scope.user = {
//     email: "",
//     senha: "",
//     nomeUsuario: ""
//   };
//
//   $scope.createUser = function() {
//     var email = this.user.email;
//     var senha = this.user.senha;
//     var nomeUsuario = this.user.nomeUsuario;
//     if (!email || !senha || !nomeUsuario) {
//       $rootScope.notify("Por favor, insira dados válidos");
//       return false;
//     }
//     $rootScope.show('Por favor, espere enquanto te registramos');
//     API.register({
//       email: email,
//       senha: senha,
//       nomeUsuario: nomeUsuario
//     }).success(function(data) {
//       $rootScope.setToken(email);
//       $rootScope.hide();
//       $window.location.href = ('#/controlePresenca/eventos');
//     }).error(function(error) {
//       $rootScope.hide();
//       if (error.error && error.error.code == 11000) {
//         $rootScope.notify("Um usuário já está cadastrado com este email");
//       } else {
//         $rootScope.notify("Algo deu errado. Por favor, tente novamente!");
//       }
//     });
//   }
// })
//
// .controller('EventosCtrl', function($scope, Eventos) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});
//   $scope.eventos = Eventos.all();
//   $scope.remove = function(evento) {
//     Eventos.remove(evento);
//   };
//   $scope.detalhes = function(eventoId) {
//     window.location = '#/tab/eventos/' + eventoId;
//   }
// })

.controller('DetalhesEventoCtrl', function($scope, $stateParams, Eventos) {
  $scope.evento = Eventos.get($stateParams.eventoId);
})

.controller("LerPresencaCtrl", function($scope, $cordovaBarcodeScanner) {
  $scope.scanBarcode = function() {
    $cordovaBarcodeScanner.scan().then(function(imageData) {
      alert(imageData.text);
      console.log("Barcode Format -> " + imageData.format);
      console.log("Cancelled -> " + imageData.cancelled);
    }, function(error) {
      console.log("An error happened -> " + error);
    });
  };
});
