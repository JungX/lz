define([], function () {
    return ['$scope', '$state', 'AlertService', 'HttpFileService','TestService',TestCtrl];

    function TestCtrl($scope, $state, AlertService,HttpFileService,TestService) {


        //提交
        $scope.submit = function () {
            $scope.upload($scope.file);
        };

        $scope.upload = function (file) {
            HttpFileService.upload('test/import/',file,{}).then(function () {
                AlertService.info("success");
            })
        };

        $scope.clean = function(){
            TestService.clean().then(function () {
                AlertService.info("success");
            });
        }



    }
});