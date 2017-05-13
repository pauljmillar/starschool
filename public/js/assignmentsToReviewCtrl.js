//var Klass = require('../../app/models/klass');

//angular.module('klassCtrl', ['ui.bootstrap'])
angular.module('assignmentsToReviewCtrl', ['ui.bootstrap', 'ngMaterial'])

.controller('assignmentsToReviewCtrl',  function($scope, $http, services, $modal, $log, $routeParams, user, klassRecord, assignmentList, $mdDialog, $mdSidenav, $location) {

$scope.assignmentList = assignmentList.data;
$scope.user = user.data;
$scope.thisKlass = klassRecord.data;
	

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