(function(){
    
    var myViewFactory = function($http,XMLHeaderDocService){
      var myviewfactory = {};
        myviewfactory.getmyviewfactory = function(session_id,mb_code){ 
         
            return request = $http({
            method: "post",
            url: "app/assets/ae_tlch_xmlreq.php",
            data: "<ezware_request>" +
                    "<action>refreshData</action>" +
                    "<company>L1</company>" +
                    "<parameters>REFRESH,RETRIEVE|MYVIEWS|maves|" + mb_code +"|</parameters>" +
                    "<sid>" +  session_id + "</sid>" +
                    "<version>1</version>" +
                    "</ezware_request>"
        }); 
        
        }
        return myviewfactory;
    
    };
    myViewFactory.$inject = ['$http','XMLHeaderDocService'];
    angular.module('myApp')
     .factory('myViewFactory',myViewFactory);
}());