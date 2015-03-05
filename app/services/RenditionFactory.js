(function(){
    
    var RenditionFactory = function($http,XMLHeaderDocService){
      var renditionfactory = {};
        renditionfactory.getrenditionFactory = function(session_id){ 
          
            return request = $http({
            method: "post",
            url: "app/assets/ae_tlch_xmlreq.php",
            data: "<ezware_request>" +
                    "<action>refreshData</action>" +
                    "<company>L1</company>" +
                    "<parameters>REFRESH,RENDITION," + XMLHeaderDocService.getmainboard() +",maves,MASTER</parameters>" +
                    "<sid>" +  session_id + "</sid>" +
                    "<version>1</version>" +
                    "</ezware_request>"
            });
        
        }
        return renditionfactory;
    
    };
    RenditionFactory.$inject = ['$http','XMLHeaderDocService'];
    angular.module('myApp')
     .factory('RenditionFactory',RenditionFactory);
}());