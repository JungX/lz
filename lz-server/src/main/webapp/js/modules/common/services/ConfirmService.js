/**
 * Created by zhaoyang on 16/11/8.
 */
define(
	function () {
		return ['$q', 'ModalService', '$sce', ConfirmService];
		function ConfirmService($q, ModalService, $sce) {
			return {
				open: function (title, message) {
				   var deferred = $q.defer();
                       ModalService.showModal({
                          templateUrl: "js/modules/common/templates/confirm.html",
                          inputs: {
                              title: title,
                              message: message
                          },
                          controller: function ($scope, close, title, message) {
                              $scope.title = title;
                              $scope.message = $sce.trustAsHtml(message);
                              $scope.ok = function() {
                                  close(true);
                              };
                              $scope.cancel = function() {
                                  close(false);
                              };
                          }
                          }).then(function (modal) {
                              modal.close.then(function (result) {
                                  if(result) {
                                      deferred.resolve();
                                  } else {
                                      deferred.reject();
                                  }
                              });
                          });
                          return deferred.promise;
				}
			};
		}
	});