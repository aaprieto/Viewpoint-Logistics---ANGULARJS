(function(){
    
    var UserRenditionFactory = function($http,XMLHeaderDocService){
      var userrenditionfactory = {};
        userrenditionfactory.getuserrenditionFactory = function(session_id, myview_code){ 
         
            return request = $http({
            method: "post",
            url: "app/assets/ae_tlch_xmlreq.php",
            data: "<ezware_request>" +
                    "<action>refreshData</action>" +
                    "<company>L1</company>" +
                    "<parameters>REFRESH,RENDITION," + XMLHeaderDocService.getmainboard() +",maves," + myview_code  + "</parameters>" +
                    "<sid>" +  session_id + "</sid>" +
                    "<version>1</version>" +
                    "</ezware_request>"
            });
        
        }
        return userrenditionfactory;
    
    };
    UserRenditionFactory.$inject = ['$http','XMLHeaderDocService'];
    angular.module('myApp')
     .factory('UserRenditionFactory',UserRenditionFactory);
}());