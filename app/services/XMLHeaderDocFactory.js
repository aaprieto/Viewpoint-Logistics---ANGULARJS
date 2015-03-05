(function(){
    
    var xmlHeaderDocFactory = function($http,XMLHeaderDocService){
      var xmheaderdocfactory = {};
        xmheaderdocfactory.getxmlheaderdoccode = function(session_id, mbcode){
            return request = $http({
            method: "post",
            url: "app/assets/ae_tlch_xmlreq.php",
            data: "<ezware_request>" +
                    "<action>refreshData</action>" +
                    "<company>L1</company>" +
                    "<parameters>REFRESH,RETRIEVE|GRIDHEADERDOC2|maves|" + mbcode +"|</parameters>" +
                    "<sid>" +  session_id + "</sid>" +
                    "<version>1</version>" +
                    "</ezware_request>"
        });
        }
        return xmheaderdocfactory;
    
    };
    xmlHeaderDocFactory.$inject = ['$http','XMLHeaderDocService'];
    angular.module('myApp')
     .factory('xmlHeaderDocFactory',xmlHeaderDocFactory);
}());