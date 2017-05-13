var klassApp = angular.module('klassApp', ['ngRoute', 'klassesCtrl', 'klassCtrl', 'services', 'studentKlassesCtrl', 'klassRosterCtrl', 'klassAboutCtrl', 'studentKlassCtrl', 'ngLetterAvatar', 'assignmentsCtrl', 'studentAssignmentsCtrl']);
//var klassApp = angular.module('klassApp', [ 'services', 'ngRoute']);

  klassApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
     
    $locationProvider.html5Mode(true);

    $routeProvider

        // home page for teachers
        .when('/dashboard', {
            templateUrl: '/views/classes.html',
            controller: 'klassesCtrl',
             resolve: {
               factory: isTeacher           
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
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.id;
                 return services.getKlass(klassId);
                },
                assignmentList: function(services, $route){
                  var klassId = $route.current.params.id;
                  return services.getStudentAssignments(klassId);
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
    //about the class
        .when('/class/:id/about', {
             templateUrl: '/views/classAbout.html',
             controller: 'klassAboutCtrl',
             resolve: {
                user: function(services, $route){
                  return services.getUserId();
                },
               klassRecord: function(services, $route){
                 var klassId = $route.current.params.id;
                 return services.getKlass(klassId);
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
    }]);
  
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


//  .filter('startFrom', function(){
//
//    return function(data, start){
//         if (!data || !data.length) { return; }
//        return data.slice(start);
//    }

//  })

