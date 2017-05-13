//var Klass = require('../../app/models/klass');

//angular.module('klassCtrl', ['ui.bootstrap'])
angular.module('studentKlassesCtrl', ['ui.bootstrap'])

//  .controller('klassesCtrl', ['$scope','$http','services', '$modal', '$log', function($scope, $http, services, $modal, $log) {
.controller('studentKlassesCtrl', function($scope, $http, services, $modal, $log, $timeout, $mdSidenav, $mdDialog, $location) {


	$scope.joinCode = '';

	// making these 2 independent, as getKlasses can use the userid from passport.  So it can fire without waiting for the result of getUserId
	services.getUserId()
		.success(function(data) {
			$scope.user = data;
			$scope.userId = data.id;
			$scope.email = data.local.email;
		});

	services.getKlassesForStudent()
		.success(function(data2) {
			$scope.klassList = data2;
			$log.log(data2);
			//$scope.loading = false;
		});

	 
	$scope.changeView = function(view){
    $location.path('/'+view); // path not hash
  };

	$scope.classView = function(id){
		if ($scope.user.userType == "student")
    	$location.path('/studentclass/' + id);
		else 
    	$location.path('/class/' + id);
  };
	
	$scope.goAssignments = function() {
		if ($scope.user.userType == "student")
    	$location.path('/studentassignments');
		else 
    	$location.path('/assignments'); 	};

	$scope.goProfile = function(){
    $location.path('/profile'); // path not hash
  };
	
	$scope.goHome = function(){
		if ($scope.user.userType == "student")
    	$location.path('/studentdashboard');
		else 
    	$location.path('/dashboard');  
	};


	
	$scope.openLeftMenu = function() {
		$mdSidenav('left').toggle();
	};
	

	
	var originatorEv;
	$scope.openMenu = function($mdOpenMenu, ev) {
		originatorEv = ev;
		$mdOpenMenu(ev);
	};
	/***
				$scope.showPrompt = function(ev) {
					// Appending dialog to document.body to cover sidenav in docs app
					var confirm = $mdDialog.prompt()
						.title('Create a class')
						.textContent('Invite students later')
						.placeholder('Class name')
						.ariaLabel('Class name')
						.initialValue('')
						.targetEvent(ev)
						.ok('Create!')
						.cancel('Cancel');

					    $mdDialog.show(confirm).then(function(result) {
								$log.log('Submiting user info.'); // kinda console logs this statement
								services.createKlass({name: result, shortDesc: 'Add Section', longDesc: 'Add Description here', numStudents: 0})
									.then(function(data) {

										// add new klass to view
										$scope.klassList.unshift({name: result, shortDesc: 'Add Section', longDesc: 'Add Description here', numStudents: 0});
									});
					    }, function() {
								//dismissed modal, nothing to do
							}
					   );
				};
				**/
	//    $mdDialog.show(confirm).then(function(result) {
	//      $scope.status = 'You decided to name your dog ' + result + '.';
	//    }, function() {
	//      $scope.status = 'You didn\'t name your dog.';
	//    });



	//$scope.isClean = function() {
	//  return angular.equals(original, $scope.eventRecord);
	//}
	//$scope.klass = new Klass(); //You can instantiate resource class

	//$scope.createKlass = function(klassRecord) {
	//	  klassRecord.teacherId = $scope.userId;
	//	console.log($scope.userId);
	//   services.createKlass(klassRecord);
	// };
	$scope.deleteKlass = function(id) {
		services.deleteKlass(id);
	};

	//for modal =========================================
	$scope.masterStudentKlass = {
		klassId: {
			name: null,
			shortDesc: null,
			longDesc: null,
			teacherId: null,
			numStudents: 0
		}
	};

	$scope.klass = angular.copy($scope.masterStudentKlass);

	/**
	   $scope.open = function() {

							$modal.open({
								templateUrl: 'myModalContent.html', // loads the template
								backdrop: true, // setting backdrop allows us to close the modal window on clicking outside the modal window
								windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
								size: 'sm',
								controller: function($scope, $modalInstance, $log, klass, klassList) {
									$scope.klass = klass;
									$scope.klassList = klassList;
									$scope.submit = function() {
										$log.log('Submiting user info.'); // kinda console logs this statement
										$log.log(klass);
										//klass.teacherId = $scope.userId;
										//teacherId is set in route at mongo call
										services.createKlass(klass)
											.then(function(data) {

												// add new klass to view
												$scope.klassList.unshift(klass);
												// $scope.klassList = data;
											});

										$modalInstance.dismiss('cancel'); // dismiss(reason) - a method that can be used to dismiss a modal, passing a reason
									}
									$scope.cancel = function() {
										$modalInstance.dismiss('cancel');
									};
								},
								resolve: {
									klass: function() {
										return angular.copy($scope.klass);
									},
									klassList: function() {
										return $scope.klassList;
									}
								}
							}); //end of modal.open
						};
***/

	//Angular Material Modal
	$scope.showAdvanced = function(ev) {
		$mdDialog.show({
				controller: DialogController,
				templateUrl: 'dialog.join.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
				locals: {
					k: $scope.klass,
					klist: $scope.klassList
				}
			})
			.then(function(answer) {
				//$scope.klass = angular.copy($scope.masterKlass);
				$scope.joinCode = '';
			}, function() {
				//$scope.klass = angular.copy($scope.masterKlass);
				$scope.joinCode = '';
			});
	};

	function DialogController($scope, $mdDialog, $log, k, klist) {

		$scope.klass = k;
		$scope.klassList = klist;
		$scope.joinError = '';

		$scope.hide = function() {
			$mdDialog.hide();
		};

		$scope.cancel = function() {
			$mdDialog.cancel();
		};

		$scope.join = function() {

			services.addStudentToClass({
					joinCode: $scope.joinCode
				})
				.then(function(data) {
					if (data.data.error) {
						$log.log('error:' + JSON.stringify(data) );
						$scope.joinError = 'Sorry, could not join this class: ' + $scope.joinCode;
					} else {
						$log.log('addStudentToClass data:' + JSON.stringify(data) + ' id:' + data.data._id)
							//set id of klass just created
						$scope.klass.klassId._id = data.data._id;
						$scope.klass.klassId.name = data.data.name;
						$scope.klass.klassId.shortDesc = data.data.shortDesc;
						$scope.klass.klassId.longDesc = data.data.longDesc;
						$scope.klass.klassId.teacherId = data.data.teacherId;
						$scope.klass.klassId.numStudents = data.data.numStudents;

						// add new klass to view
						$scope.klassList.unshift($scope.klass);
						$mdDialog.hide();
						
					}
				});

		};
	}

	//$scope.saveEvent = function(eventRecord) {
	//$location.path('/');
	//  if (mongoID == 0) {
	//    Todos.createEvent(eventRecord);
	//  } else {
	//    Todos.updateEvent(mongoID, eventRecord);
	//  }
	//$location.path('/admin/');

});