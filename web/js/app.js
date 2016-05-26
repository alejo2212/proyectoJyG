(function () {
    "use strict";
    angular.module('system', [//dependencies here
        'ngResource', 'datatables'
    ])
            .service('Usuarios', function ($http) {
                // creacion del metodo publico getAll
                this.getAll = function (success, failure) {
                    $http.get('http://localhost/proyectoJyG/web/consulta.php')
                            .success(success)
                            .error(failure);
                }
            })
//            .service('Ciudades', function ($http) {
//                // creacion del metodo publico getAll
//                this.getAll = function (success, failure) {
//                    $http.get('http://localhost/proyectoJyG/web/index.php/localizacion/ciudades')
//                            .success(success)
//                            .error(failure);
//                }
//            })
//            .controller('ciudades', function ($scope, DTOptionsBuilder) {
//
//                $scope.dtOptions = DTOptionsBuilder.newOptions()
//                        .withDisplayLength(5)
//                        .withOption('bLengthChange', false);
//            })
            .controller('adminUser', function ($scope, Usuarios) {

//                $scope.dtOptions = DTOptionsBuilder.newOptions()
//                        .withDisplayLength(5)
//                        .withOption('bLengthChange', false);

                Usuarios.getAll(function (data) {
                    $scope.users = data.users;
//          $scope.currentCategory = data.categories[0];
//          $scope.bookmarks = Bookmark.query();
                });

                $scope.showWindow = function () {
//          $scope.modalForm.$setPristine();
//          $scope.modalForm.$setUntouched();
                    $('#myModal').modal('show');
                }

                $scope.save = function () {
//          if ($scope.modalForm.$valid) {
//            if (!usuario.id) {
//              var record = new system();
//
//              record.id = 20;
//              record.user_name = usuario.usuario;
//              record.password = usuario.password;
//              record.actived = 't';
//              record.created_at = 'now()';
//
//              record.$save(function (response) {
//                $scope.usuario.push(record);
//              });
//            }
                    $('#myModal').modal('hide');
//          }
                }
            })

})();