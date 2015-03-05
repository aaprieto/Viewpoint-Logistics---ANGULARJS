(function(){
    
    var datagridListFactory = function($http,XMLHeaderDocService){
      var datagridlistfactory = {};
        datagridlistfactory.getlist = function(session_id,mb_code, rendcode){
            return  request = $http({
                    method: "post",  
                    url: "app/assets/ae_tlch_xmlreq.php",
                    data: "<ezware_request>" +
                    "<action>refreshData</action>" + 
                    "<company>L1</company>" +
                    "<parameters>REFRESH," + mb_code +"," + rendcode + "</parameters>" +
                    "<sid>"  +  session_id + "</sid>" +
                    "<version>1</version>" +   
                    "</ezware_request>"
                });
               
        }
        return datagridlistfactory;
    
    };
    datagridListFactory.$inject = ['$http','XMLHeaderDocService'];
    angular.module('myApp')
     .factory('datagridListFactory',datagridListFactory);
}());