var klassApp = angular.module('klassApp', ['ngMaterial', 'ngRoute', 'klassesCtrl', 'klassCtrl', 'services', 'studentKlassesCtrl', 'klassRosterCtrl', 'studentKlassRosterCtrl', 'klassAboutCtrl','studentKlassAboutCtrl', 'studentKlassCtrl', 'ngLetterAvatar', 'assignmentsCtrl', 'studentAssignmentsCtrl', 'profileCtrl', 'studentAssignmentDetailsCtrl', 'assignmentDetailsCtrl', 'assignmentsToReviewCtrl', 'assignmentToReviewDetailsCtrl']);
//var klassApp = angular.module('klassApp', [ 'services', 'ngRoute']);

  klassApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
     
    $locationProvider.html5Mode(true);

    $routeProvider

        // home page for teachers
        .when('/demohome', {
            templateUrl: '/views/classes.html',
            controller: 'klassesCtrl',
             resolve: {
               factory: isTeacher           
             }      
        })
        // home page for teachers
        .when('/dashboard', {
            templateUrl: '/views/classes.html',
            controller: 'klassesCtrl',
             resolve: {
               factory: isTeacher           
             }      
        })
        // profile page during signup - required fields
        .when('/profile-signup', {
            templateUrl: '/views/profile-signup.html',
            controller: 'profileCtrl',
             resolve: {
                 factory: hasAccount,
                 user: function(services, $route){
                  return services.getUserId();
                }
             }      
        })
        // profile page
        .when('/profile', {
            templateUrl: '/views/profile.html',
            controller: 'profileCtrl',
             resolve: {
               //factory: isTeacher,
                 user: function(services, $route){
                  return services.getUserId();
                }
             }      
        })
        //home page for students
        .when('/studentdashboard', {
            templateUrl: '/views/studentClasses.html',
            controller: 'studentKlassesCtrl'
        })
        //individual class view for teachers
        .when('/class/:id', {
             templateUrl: '/views/class.html',
             controller: 'klassCtrl',
             resolve: {
               factory: isTeacher,
                user: function(services, $route){
                  return services.getUserId();
                },
                klassRecord: function(services, $route){
                 var klassId = $route.current.params.id;
                 return services.getKlass(klassId);
                },
                assignmentList: function(services, $route){
                  var klassId = $route.current.params.id;
                  return services.getAssignments(klassId);
                }              
             }
        })
         //individual class view for STUDENTS
        .when('/studentclass/:id', {
             templateUrl: '/views/studentClass.html',
             controller: 'studentKlassCtrl',
             resolve: {
                user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.id;
                 return services.getStudentKlass(klassId);
                },
                assignmentList: function(services, $route){
                  var klassId = $route.current.params.id;
                  return services.getStudentAssignments(klassId);
                }              
             }
        })
         //individual assignment view for TEACHERS
        .when('/class/:cid/assignment/:aid/details', {
             templateUrl: '/views/assignmentDetails.html',
             controller: 'assignmentDetailsCtrl',
             resolve: {
                user: function(services, $route){
                  return services.getUserId();
                },
                klassRecord: function(services, $route){
                 var klassId = $route.current.params.cid;
                 return services.getKlass(klassId);
                },
                assignmentRecord: function(services, $route){
                  var assignmentId = $route.current.params.aid;
                  return services.getAssignmentDetails(assignmentId);
                }              
             }
        })
         //individual assignment view for STUDENTS
        .when('/studentclass/:cid/assignment/:aid/details', {
             templateUrl: '/views/studentAssignmentDetails.html',
             controller: 'studentAssignmentDetailsCtrl',
             resolve: {
                user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.cid;
                 return services.getStudentKlass(klassId);
                },
                assignmentRecord: function(services, $route){
                  var assignmentId = $route.current.params.aid;
                  return services.getStudentAssignmentDetails(assignmentId);
                }              
             }
        })
         //list of studentassignments for TEACHER to review
        .when('/class/:cid/assignment/:aid/review/list', {
             templateUrl: '/views/assignmentsToReview.html',
             controller: 'assignmentsToReviewCtrl',
             resolve: {
                user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.cid;
                 return services.getKlass(klassId);
                },
          //      assignmentRecord: function(services, $route){
          //        var assignmentId = $route.current.params.aid;
           //       return services.getStudentAssignmentDetails(assignmentId);
           //     },            
                assignmentList: function(services, $route){
                  var assignmentId = $route.current.params.aid;
                  return services.getStudentAssignmentsToReview(assignmentId);
                }   
            }
        })
        //individual student assignment to review for TEACHERS
        .when('/class/:cid/assignment/:aid/review/details', {
             templateUrl: '/views/assignmentToReviewDetails.html',
             controller: 'assignmentToReviewDetailsCtrl',
             resolve: {
                user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.cid;
                 return services.getKlass(klassId);
                },
                assignmentRecord: function(services, $route){
                  var assignmentId = $route.current.params.aid;
                  return services.getStudentAssignmentDetails(assignmentId);
                }              
             }
        })
    //assignment view for teachers
        .when('/assignments', {
             templateUrl: '/views/assignments.html',
             controller: 'assignmentsCtrl',
             resolve: {
               factory: isTeacher,
                assignmentList: function(services, $route){
                  return services.getAllAssignments();
                }              
             }
        })
         // assignment view for STUDENTS
        .when('/studentassignments', {
             templateUrl: '/views/studentAssignments.html',
             controller: 'studentAssignmentsCtrl',
             resolve: {
                assignmentList: function(services, $route){
                  return services.getAllStudentAssignments();
                }              
             }
        })
    //list of students
        .when('/class/:id/students', {
             templateUrl: '/views/classRoster.html',
             controller: 'klassRosterCtrl',
             resolve: {
                factory: isTeacher,
                user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.id;
                 return services.getKlass(klassId);
                },
                studentList: function(services, $route){
                  var klassId = $route.current.params.id;
                  return services.getStudentsInKlass(klassId);
                }
             }
        })
    //list of students for STUDENTS
        .when('/studentclass/:id/students', {
             templateUrl: '/views/studentClassRoster.html',
             controller: 'studentKlassRosterCtrl',
             resolve: {
                user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.id;
                 return services.getStudentKlass(klassId);
                },
                studentList: function(services, $route){
                  var klassId = $route.current.params.id;
                  return services.getStudentsInKlass(klassId);
                }
             }
        })
    //about the class
        .when('/class/:id/about', {
             templateUrl: '/views/classAbout.html',
             controller: 'klassAboutCtrl',
             resolve: {
              factory: isTeacher,
              user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.id;
                 return services.getKlass(klassId);
                }
             }
        })
    //about the class - STUDENT VIEW
        .when('/studentclass/:id/about', {
             templateUrl: '/views/studentClassAbout.html',
             controller: 'studentKlassAboutCtrl',
             resolve: {
              user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.id;
                 return services.getStudentKlass(klassId);
                }
             }
        })
      .otherwise({
            //templateUrl: '/views/classes.html',
            //controller: 'klassesCtrl'
              //redirectTo: function() {
              //  window.location = "404.html";
              //  window.location.replace(url);

              //}
              redirectTo: '/dashboard'
             //templateUrl: '/views/404.html'//,
             //controller: 'AdminController'
        });

 //$locationProvider.html5mode({ enabled: true, baseLocation: false});
    }])

.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('deep-orange');
});
  
  klassApp.filter('reverse', function() {
  return function(items) {
    if (!angular.isArray(items)) {return items;}
    else {return items.slice().reverse();}
  };
});

var isTeacher = function ($q, $rootScope, $location, $http) {

var ful = $location.path();
var t;

if (ful.lastIndexOf("/") > 0) {
    t = ful.substring(1, ful.indexOf("/", 1));
} else {
    t = ful.substring(1);
}

var n = ful.replace(t, "student"+t);

  
var deferred = $q.defer();
    $http.get("/api/userid")
        .success(function (response) {
            var userType = response.userType;
            if (userType == 'student') { $location.path(n); }
            else {deferred.resolve(true);}
        })
        .error(function () {
            deferred.reject();
           // $location.path($location.path());
         });
    return deferred.promise;
};


var hasAccount = function ($q, $rootScope, $location, $http) {

  
var deferred = $q.defer();
    $http.get("/api/userid")
        .success(function (response) {
            var firstName = response.firstName;
            if (response.firstName) { 
              if (response.userType == 'student')
                $location.path('/studentdashboard');
              else
                $location.path('/dashboard');
            }
            else {deferred.resolve(true);}
        })
        .error(function () {
            deferred.reject();
           // $location.path($location.path());
         });
    return deferred.promise;
};


//  .filter('startFrom', function(){
//
//    return function(data, start){
//         if (!data || !data.length) { return; }
//        return data.slice(start);
//    }

//  })

