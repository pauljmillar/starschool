
angular.module('klassRosterCtrl', ['ui.bootstrap'])

.controller('klassRosterCtrl', function($routeParams, $scope, $http, services, $modal, $log, $timeout, $mdSidenav, $mdDialog, studentList, klassRecord, user, $location) {


	$scope.studentList = studentList.data;
	$scope.thisKlass = klassRecord.data;
	
	$log.log('studentList:' + JSON.stringify(studentList.data) );
	$log.log('thisKlass:' + JSON.stringify(klassRecord.data) );
			$scope.user = user.data;
			$scope.userId = user.data._id;
			$scope.email = user.data.local.email;
			$scope.fname = user.data.firstName;

	// making these 2 independent, as getKlasses can use the userid from passport.  So it can fire without waiting for the result of getUserId
//	services.getUserId()
	//	.success(function(data) {
	//		$scope.userId = data.id;
	//		$scope.email = data.local.email;
	//	});

	services.getKlasses()
		.success(function(data2) {
			$scope.klassList = data2;
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
	
	$scope.resetKlassCode = function() {
		services.resetKlassCode($scope.thisKlass._id)
			.success(function(data) {
			$scope.thisKlass.joinCode = data.joinCode;
		});
	}
	
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