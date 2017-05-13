angular.module('services', [])

	// super simple service
	// each function returns a promise object
	.factory('services', ['$http',function($http) {
		return {
			
      getUserId : function() {
			  return $http.get('/api/userid');
			},
			getKlasses : function() {
			  return $http.get('/api/klasses'); ///' + teacher_id);
			},
			getKlass : function(id) {
			  return $http.get('/api/klass/' + id); ///' + teacher_id);
			},
			createKlass : function(klassData) {
				return $http.post('/api/klass', klassData).success(function (results){
					return results;
        });
			},
		//	createKlass : function(klassData) {
		//		return $http.post('/api/klass', klassData);
		//	},
			deleteKlass : function(id) {
				return $http.delete('/api/klass/' + id);
			},
			resetKlassCode : function(id) {
				return $http.put('/api/klass/' + id + '/newcode').success(function (status){
	        return status.data;  });
			},		
			getAssignments : function(id) {
			  return $http.get('/api/assignments/' + id); //klass_id
			},
			getAllAssignments : function() {
			  return $http.get('/api/assignments/all'); //all for a student
			},
			getAssignment : function(id) {
			  return $http.get('/api/assignment/' + id); //assignment_id
			},
			getAllStudentAssignments : function() {
			  return $http.get('/api/studentassignments/all'); //all for a student
			},
			getStudentAssignments : function(id) {
			  return $http.get('/api/studentassignments/klass/' + id); //klass_id
			},
			submitStudentAssignment : function(id) {
				return $http.put('/api/studentassignment/' + id ).success(function (status){
	        return status.data;  });
			},
			createAssignment : function(assignmentData) {
				return $http.post('/api/assignment', assignmentData).then(function (results){
					return results;
        });
			},
			deleteAssignment : function(id) {
				return $http.delete('/api/assignment/' + id);
			},
			updateAssignment : function(id) {
				return $http.put('/api/assignment/' + id).then(function (status){
	                                return status.data;
                              });
			},
			addComment : function(id, commentData) { //id is assignmentId
				return $http.put('/api/assignment/' + id + '/comment', commentData).then(function (status){
	                                return status.data;
                              });
			},
			deleteComment : function(id, commentIndex) {
				return $http.put('/api/assignment/' + id + '/comment/' + commentIndex).then(function (status){
	                                return status.data;
                              });
			},
			getStudentsInKlass : function(id) {
			  return $http.get('/api/studentklass/klass/' + id); //klass_id
			},
			getKlassesForStudent : function(id) {
			  return $http.get('/api/studentklass/student/' + id); //student_id
			},
			addStudentToClass : function(data) {
				return $http.post('/api/studentklass', data).then(function (results){
					return results;
        });
			}
		}
	}])
//	    .service('imageService',['$q','$http',function($q,$http){
//        this.loadImages = function(){
//            return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
//        };
//    }])
;
