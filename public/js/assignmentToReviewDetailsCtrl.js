
angular.module('assignmentToReviewDetailsCtrl', ['ui.bootstrap', 'ngMaterial'])

.controller('assignmentToReviewDetailsCtrl',  function($scope, $http, services, $modal, $log, $routeParams, user, assignmentRecord, klassRecord, $mdDialog, $mdSidenav, $location) {

$scope.user = user.data;
$scope.thisAssignment = assignmentRecord.data;
$scope.thisKlass = klassRecord.data;

if ($scope.thisAssignment.work) $scope.statusMessage = 'draft saved';
if ($scope.thisAssignment.isSubmitted) $scope.statusMessage = 'turned in';

	$scope.changeView = function(view){
    $location.path('/'+view); // path not hash
  };
	
	$scope.goReviewList = function(){
    	$location.path('/class/'+ $scope.thisKlass._id + '/assignment/' + $scope.thisAssignment.assignmentId._id + '/review/list'); // path not hash
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
	
		$scope.updateAssignment = function(upd){
			var assUpd = {};
			assUpd.klassId = $scope.thisKlass.klassId._id;
			assUpd.studentId = $scope.userId;
			assUpd.work = $scope.thisAssignment.work;
			assUpd.note = $scope.thisAssignment.note;
			
			
			if (upd == 'save') {
				assUpd.draft = true;
				services.submitStudentAssignment($scope.thisAssignment._id, assUpd)
					.success(function(data) {
						$scope.statusMessage = 'draft saved';
				});		
			} else { 
			
				assUpd.isSubmitted = true;
				assUpd.pointsOn = $scope.thisKlass.klassId.pointsOn;
				assUpd.points = $scope.thisAssignment.assignmentId.points;
							
				services.submitStudentAssignment($scope.thisAssignment._id, assUpd)
					.success(function(data) {
						$scope.statusMessage = 'turned in';
				});	
			}	
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