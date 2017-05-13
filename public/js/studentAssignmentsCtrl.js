
angular.module('studentAssignmentsCtrl', ['ui.bootstrap', 'ngMaterial'])

.controller('studentAssignmentsCtrl',  function($scope, $http, services, $modal, $log, $routeParams, assignmentList, $mdDialog, $mdSidenav, $location) {

$scope.assignmentList = assignmentList.data;


$scope.getItemsDueToday =  function(item) {
  var today = new Date();
	today.setHours(0,0,0,0);
	var today1 = today.toISOString();
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0,0,0,0);
  var tomorrow1 = tomorrow.toISOString();

  return tomorrow1 > item.due && item.due >= today1;
};

$scope.getItemsDueTomorrow =  function(item) {
  var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0,0,0,0);
	var tomorrow1 = tomorrow.toISOString();
	var nextday = new Date();
	nextday.setDate(nextday.getDate() + 2);
	nextday.setHours(0,0,0,0);
  var nextday1 = nextday.toISOString();

  return nextday1 > item.due && item.due >= tomorrow1;
};
	
	services.getUserId()
		.success(function(data) {
			$scope.user = data;
			$scope.userId = data._id;
			$scope.email = data.local.email;
			$scope.fname = data.firstName;
		});
//for side nav menu	
	services.getKlassesForStudent()
		.success(function(data2) {
			$scope.message = 'getKlassesForStudent ran';
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


	
	//for left side nav
	$scope.openLeftMenu = function() {
				$mdSidenav('left').toggle();
			};	
	
//for logout menu
	var originatorEv;
		$scope.openMenu = function($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};
	



});