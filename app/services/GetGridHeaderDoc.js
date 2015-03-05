(function(){
    var GetGridHeaderDoc = function($http,XMLHeaderDocService){
     
      var getgridheaderdocfactory = {};  
         getgridheaderdocfactory.getgridheaderDocFactory = function(session_id){ 
           
            
            return request = $http({
            method: "post",
            url: "app/assets/ae_tlch_xmlreq.php",
            data: "<ezware_request>" +
                    "<action>refreshData</action>" +
                    "<company>L1</company>" +
                    "<parameters>" + "REFRESH,RETRIEVE|GRIDHEADERDOC2|maves|" + XMLHeaderDocService.getmainboard() +"|No Selection|" + "</parameters>" +
                    "<sid>" +  session_id + "</sid>" +
                    "<version>1</version>" +
                    "</ezware_request>"
            });   
           
        
        }
       
         return getgridheaderdocfactory;
     
    };
    GetGridHeaderDoc.$inject = ['$http','XMLHeaderDocService'];
    angular.module('myApp')
     .factory('GetGridHeaderDoc',GetGridHeaderDoc);
}());



