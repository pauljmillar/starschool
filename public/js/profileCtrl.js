
angular.module('profileCtrl', ['ui.bootstrap'])

.controller('profileCtrl', function($routeParams, $scope, $http, services, $modal, $log, $timeout, $mdSidenav, $mdDialog, user, $location) {

	    $scope.user = user.data;
			//if google sign-in (rather than signup) send directly to dashboard
	   // if (user.data.firstName) {
		//	if ($scope.user.userType == "student")
    //			$location.path('/studentdashboard');
		//		else 
    //			$location.path('/dashboard');
		//	}
	
			$scope.user = user.data;
			$scope.userId = user.data._id;
			$scope.email = user.data.local.email;
			$scope.fname = user.data.firstName;

	$scope.isReadOnly = true;

	$scope.setEditMode = function() {
			$scope.isReadOnly = false;
	};
	
		$scope.cancelEditMode = function() {
			$scope.isReadOnly = true;
				//if ($scope.user.userType == "student")
    		//	$location.path('/studentdashboard');
				//else 
    		//	$location.path('/dashboard');
	};
	services.getKlasses()
		.success(function(data2) {
			$scope.klassList = data2;
	});
	//services.getKlassesForStudent()
	//	.success(function(data2) {
	//		$scope.klassList = data2;
	//});
	

	
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

	
	$scope.updateProfile = function(){
		if ($scope.user._id == '58cab7d8796c46353244cf54')
			$scope.user.local.email = 'demo2@demo.com';
		
		$scope.user.email = $scope.user.local.email;
		services.updateProfile($scope.user)
			.success(function(data2) {
				$scope.isReadOnly = true;
			if ($scope.user.userType == "student")
    			$location.path('/studentdashboard');
				else 
    			$location.path('/dashboard');
			});
	};
	
	$scope.openLeftMenu = function() {
		$mdSidenav('left').toggle();
	};

	var originatorEv;
	$scope.openMenu = function($mdOpenMenu, ev) {
		originatorEv = ev;
		$mdOpenMenu(ev);
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





});