//var Klass = require('../../app/models/klass');

//angular.module('klassCtrl', ['ui.bootstrap'])
angular.module('studentKlassCtrl', ['ui.bootstrap', 'ngMaterial'])

.controller('studentKlassCtrl',  function($scope, $http, services, $modal, $log, $routeParams, klassRecord, assignmentList, $mdDialog, $mdSidenav, $location) {

	//$scope.klassName = klassRecord.name;
	var original = klassRecord.data;
	$scope.thisKlass = klassRecord.data;
	$scope.assignmentList = assignmentList.data;

	$log.log($scope.assignmentList);

	services.getUserId()
		.success(function(data) {
			$scope.userId = data._id;
			$scope.email = data.local.email;
			$scope.fname = data.firstName;
		});
	
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
	
	$scope.goAssignments = function(){
    $location.path('/studentassignments'); // path not hash
  };
	
	$scope.classView = function(id){
    $location.path('/studentclass/'+id); // path not hash
  };

	$scope.submitStudentAssignment = function(studentAssignmentId, index1) {
		services.submitStudentAssignment(studentAssignmentId);
		//$scope.assignmentList[index1].isSubmitted = true; 
		//$scope.assignmentList[index1].submittedDate = Date.now();
			};	
	
	$scope.masterAssignment = {
		name: null,
		description: null,
		klassId: $scope.thisKlass._id,
		due: null,
		isAnnouncement: null
	};
	
	$scope.newAssignment = angular.copy($scope.masterAssignment);

$scope.getItemsDueToday =  function(item) {
  var today = new Date();
	today.setHours(0,0,0,0);
	var today1 = today.toISOString();
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0,0,0,0);
  var tomorrow1 = tomorrow.toISOString();

  return tomorrow1 > item.assignmentId.due && item.assignmentId.due >= today1;
};

$scope.isDueToday =  function(dueDate) {
  var today = new Date();
	today.setHours(0,0,0,0);
	var today1 = today.toISOString();
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	tomorrow.setHours(0,0,0,0);
  var tomorrow1 = tomorrow.toISOString();
   
	if (tomorrow1 > dueDate && dueDate >= today1)
 		 return true;
	 else
		 return false;
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

  return nextday1 > item.assignmentId.due && item.assignmentId.due >= tomorrow1;
};
	
$scope.getDayTwoFromNow = function() {
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var twodays = new Date();
	twodays.setDate(twodays.getDate() + 2);

	return days[ twodays.getDay() ];

}	

$scope.getItemsDueNextDay =  function(item) {
  var twodays = new Date();
	twodays.setDate(twodays.getDate() + 2);
	twodays.setHours(0,0,0,0);
	var twodays1 = twodays.toISOString();
	var threedays = new Date();
	threedays.setDate(threedays.getDate() + 3);
	threedays.setHours(0,0,0,0);
  var threedays1 = threedays.toISOString();

  return threedays1 > item.assignmentId.due && item.assignmentId.due >= twodays1;
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
	
	$scope.commentData = {
		author: null,
		content: null
	};

	$scope.cancelComment = function() {
		// javascript to hide buttons again
		$('#demo').collapse({
			toggle: false
		})
	};

	//COMMENT ##################################
	$scope.addComment = function(assId, assIndex, assContent) {
		var newAssIndex = $scope.assignmentList.length;
		if (typeof assIndex == 'undefined') {
			assIndex = newAssIndex;
		}

		console.log('userId' + $scope.userId);
		var justnow = new Date().toISOString();

		$scope.commentData.author = $scope.userId;
		$scope.commentData.content = assContent;
		//$scope.commentData.posted = justnow;

		console.log('hello' + $scope.commentData.posted);

		services.addComment(assId, $scope.commentData);
		newComment = {
			author: {
				firstName: $scope.fname
			},
			content: assContent,
			posted: justnow
		};
		//	$scope.assignmentList[assIndex].comments.unshift(newComment);
		//now that we've added reverse filter, need to push:
		$scope.assignmentList[assIndex].assignmentId.comments.push(newComment);

		//$scope.assignmentList[assIndex].unshift(klass);

	};


});