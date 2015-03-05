
(function(){
    var sessionFactory = function($http,XMLHeaderDocService){
         var sessionidfactory = {};
        sessionidfactory.getsesid = function(){
                    /*  Work mode */
                    
          var xml_req = "<ezware_request>" +
                            "<action>login</action>" +
                            "<password>VG9yMjBNYXAxNDAw</password>" +
                            "<user>bWF2ZXM=</user>" +
                            "<version>1</version>" +
                            "</ezware_request>";
                            /* for  Local (Work from home) */
                            //var xml_req =  "<ezware_request><action>login</action><password>bWF2ZXMx</password><user>bWF2ZXM=</user><version>1</version></ezware_request>";
                return request = $http({
                    method: "post",
                    url: "app/assets/ae_tlch_xmlreq.php",
                    data: xml_req
                });  
        }
        return sessionidfactory;
    };
    sessionFactory.$inject = ['$http','XMLHeaderDocService'];
    angular.module('myApp')
     .factory('sessionFactory',sessionFactory);
}());
