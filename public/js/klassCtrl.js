//var Klass = require('../../app/models/klass');

//angular.module('klassCtrl', ['ui.bootstrap'])
angular.module('klassCtrl', ['ui.bootstrap', 'ngMaterial'])

.controller('klassCtrl',  function($scope, $http, services, $modal, $log, $routeParams, klassRecord, assignmentList, user, $mdDialog, $mdSidenav, $location) {

	//$scope.klassName = klassRecord.name;
	var original = klassRecord.data;
	$scope.thisKlass = klassRecord.data;
	//$scope.klass = angular.copy(original);
	//$scope.klassName2 = original.name;
	//$scope.klassName3 =   $routeParams.id;
	$scope.assignmentList = assignmentList.data;
			$scope.user = user.data;
			$scope.userId = user.data._id;
			$scope.email = user.data.local.email;
			$scope.fname = user.data.firstName;
	
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

	$scope.isDueTodayOrLate = function(dueDate) {
		var today = new Date();
		today.setHours(0, 0, 0, 0);
		var today1 = today.toISOString();
		var tomorrow = new Date();
		tomorrow.setDate(tomorrow.getDate() + 1);
		tomorrow.setHours(0, 0, 0, 0);
		var tomorrow1 = tomorrow.toISOString();

//changed to highlight anything due today or in the past: 4/7/17
		//if (tomorrow1 > dueDate && dueDate >= today1)
		if (dueDate <= tomorrow1)
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

  return nextday1 > item.due && item.due >= tomorrow1;
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

  return threedays1 > item.due && item.due >= twodays1;
};
	
//done outside in resolve
//	services.getUserId()
//		.success(function(data) {
//			$scope.userId = data._id;
//			$scope.email = data.local.email;
//			$scope.fname = data.firstName;
//		});
	
	//populate leaderboard
	services.getStudentsInKlass($scope.thisKlass._id)
		.success(function(data) {
			$scope.leaderboard = data;
		});
	
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

	
	$scope.masterAssignment = {
		name: null,
		description: null,
		klassId: $scope.thisKlass._id,
		due: null,
		isAnnouncement: null,
		numComplete: 0,
		numNotComplete: 0
	};
	
	$scope.newAssignment = angular.copy($scope.masterAssignment);

/**
$scope.addAssignment = function(asgnName) {
		$scope.newAssignment.klassId = $scope.klassCollection._id;
		$scope.newAssignment.name = asgnName;
		console.log('newAssignment.name' + $scope.newAssignment.name);

		var newAsgn = {
			name: $scope.newAssignment.name,
			klassId: $scope.newAssignment.klassId
		};
		services.createAssignment(newAsgn);
		//newComment = {author: {firstName: $scope.fname}, content: assContent, posted: justnow};
		$scope.assignmentList.unshift(newAsgn);
		$scope.newAssignment.name = '';
	};
***/
	
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
		$scope.assignmentList[assIndex].comments.push(newComment);

		//$scope.assignmentList[assIndex].unshift(klass);

	};

	// making these 2 independent, as getKlasses can use the userid from passport.  So it can fire without waiting for the result of getUserId


	//services.getKlasses()
	//	.success(function(data2) {
	//		$scope.message='getKlasses ran';
	//		$scope.klassList = data2;
	//		//$scope.loading = false;
	//});



	//$scope.isClean = function() {
	//  return angular.equals(original, $scope.eventRecord);
	//}
	//$scope.klass = new Klass(); //You can instantiate resource class

	//$scope.createKlass = function(klassRecord) {
	//	  klassRecord.teacherId = $scope.userId;
	//	console.log($scope.userId);
	//   services.createKlass(klassRecord);
	// };
	//$scope.deleteKlass = function(id) {
	//    services.deleteKlass(id);
	//  };

	//for modal =========================================
	//$scope.klass = {
	//    name: 'name',
	//    shortDesc: null,
	//    longDesc: null,
	//	  teacherId: null
	//};

	//Angular Material Modal

	//ASSIGNMENT ########################		
	$scope.showAssignment = function(ev) {
		$mdDialog.show({
				controller: DialogAssignmentController,
				templateUrl: 'dialog.assignment.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
				locals: {
					nas: $scope.newAssignment,
					alist: $scope.assignmentList,
					master: $scope.masterAssignment,
					isAnn: false
				}
			})
			.then(function(answer) {
				//$scope.status = 'You said the information was "' + answer + '".';
			$scope.newAssignment = angular.copy($scope.masterAssignment);
			}, function() {
			$scope.newAssignment = angular.copy($scope.masterAssignment);
				$scope.status = 'You cancelled the dialog.';
			});
	};

	//ANNOUNCEMENT ########################
	$scope.showAnnouncement = function(ev) {
		$mdDialog.show({
				controller: DialogAssignmentController,
				templateUrl: 'dialog.announcement.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
				locals: {
					nas: $scope.newAssignment,
					alist: $scope.assignmentList,
					master: $scope.masterAssignment,
					isAnn: true
				}
			})
			.then(function() {
				//$scope.status = 'You said the information was "' + answer + '".';
			$scope.newAssignment = angular.copy($scope.masterAssignment);
			}, function() {
			$scope.newAssignment = angular.copy($scope.masterAssignment);
				//$scope.status = 'You cancelled the dialog.';
			});
	};
 

	function DialogAssignmentController($scope, $mdDialog, $log, nas, alist, master, isAnn) {

		//$scope.newAssignment = angular.copy(nas);
		$scope.newAssignment = nas;
		$scope.newAssignment.isAnnouncement = isAnn;
		$scope.assignmentList = alist;
		
		//$scope.masterAssignment = master;

		//$scope.newAssignment.isAnnouncement = isAnn;
		//$scope.newAssignment.name = nas.name;
		//$scope.newAssignment.description = nas.description;
		//$scope.newAssignment.due = nas.due;
		//$scope.newAssignment.klassId = nas.klassId;

		$scope.hide = function() {
			$mdDialog.hide();
		}; 

		$scope.cancel = function() {
			$mdDialog.cancel();
		}; 

		$scope.goAssignment = function() {

			if ($scope.newAssignment.name.length == 0) {
				//do nothing
			} else {
			  services.createAssignment($scope.newAssignment)
				.then(function(data) {
					console.log('createAssignment data:' + JSON.stringify(data) + ' id:' + data.data._id);
					$log.log('createAssignment data:' + JSON.stringify(data) + ' id:' + data.data._id)
						//set id of klass just created
					$scope.newAssignment._id = data.data._id;
				  $scope.newAssignment.numNotComplete = data.data.numNotComplete;
				  $scope.newAssignment.numComplete = 0;
				  if (!$scope.newAssignment.isAnnouncement) {$scope.newAssignment.due = $scope.newAssignment.due.toISOString();}
					$scope.assignmentList.unshift($scope.newAssignment);

				});
			$mdDialog.hide();
			}
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