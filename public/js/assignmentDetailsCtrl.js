
angular.module('assignmentDetailsCtrl', ['ui.bootstrap', 'ngMaterial'])

.controller('assignmentDetailsCtrl',  function($scope, $http, services, $modal, $log, $routeParams, user, assignmentRecord, klassRecord, $mdDialog, $mdSidenav, $location) {

$scope.user = user.data;
$scope.thisAssignment = assignmentRecord.data;
$scope.thisKlass = klassRecord.data;
	 
$scope.isReadOnly = true;
$scope.dt = new Date($scope.thisAssignment.due);
$scope.pt = $scope.thisAssignment.awardUponSubmit;

$scope.setEditMode = function() {
	$scope.isReadOnly = false;
};
	
$scope.cancelEditMode = function() {
	$scope.isReadOnly = true;
};
	
	$scope.updateAssignment = function(){
		services.updateAssignment($scope.thisAssignment)
			.success(function(data2) {
				$scope.isReadOnly = true;

			});
	};	

  $scope.showDeleteConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete?')
          .textContent('Once deleted, you cannot bring it back.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('DELETE')
          .cancel('CANCEL');

    $mdDialog.show(confirm).then(function() {
			services.deleteAssignment($scope.thisAssignment._id)
				.success(function(data2) {

				   $location.path('/class/' + $scope.thisKlass._id); 
				});    
			}, function() {
      $scope.statusMessage = 'You decided to cancel.';
    });
  };	
	
if ($scope.thisAssignment.work) $scope.statusMessage = 'draft saved';
if ($scope.thisAssignment.isSubmitted) $scope.statusMessage = 'turned in';

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