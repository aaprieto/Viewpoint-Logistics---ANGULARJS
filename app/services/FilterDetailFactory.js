(function(){
    
    var FilterDetailFactory = function($http){
      var filterdetailfactory = {};
        filterdetailfactory.getfilterdetailFactory = function(session_id, myview_code){ 
         
            return request = $http({
            method: "post",
            url: "app/assets/ae_tlch_xmlreq.php",
            data: "<ezware_request>" +
                    "<action>refreshData</action>" +
                    "<company>L1</company>" +
                    "<parameters>REFRESH,RETRIEVE|FILTERDETAIL|maves|012|" + myview_code + "|</parameters>" + 
                    "<sid>" +  session_id + "</sid>" +
                    "<version>1</version>" +
                    "</ezware_request>"
            });
        
        }
        return filterdetailfactory; 
    
    };
    FilterDetailFactory.$inject = ['$http'];
    angular.module('myApp')
     .factory('FilterDetailFactory',FilterDetailFactory);
}());