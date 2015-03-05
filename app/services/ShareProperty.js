    (function(){
    var sharedPropertyServices = function($modal, $scope){
             var s_xmlheaderdoc = [];
             var c_sortedcolumns = [];   

        return {
            getxmlheaderdoc: function () { 
                return s_xmlheaderdoc;
            },
            setxmlheaderdoc: function(value) {
                s_xmlheaderdoc = value;
            },
            getsortedcolumns: function () { 
                return c_sortedcolumns;
            },
            setsortedcolumns: function(value) {
                c_sortedcolumns = value;
            }




        };
    };
    sharedPropertyServices.$inject = ['$modal', '$scope'];
    angular.module('myApp')
     .service('sharedPropertyServices',sharedPropertyServices);
    }());


 
/*
(function(){
    var sessionFactory = function($http){
         var sessionidfactory = {};
        sessionidfactory.getsesid = function(){
                    
          var xml_req = "<ezware_request>" +
                            "<action>login</action>" +
                            "<password>VG9yMjBNYXAxNDAw</password>" +
                            "<user>bWF2ZXM=</user>" +
                            "<version>1</version>" +
                            "</ezware_request>";
                return request = $http({
                    method: "post",
                    url: "app/assets/ae_tlch_xmlreq.php",
                    data: xml_req
                });  
        }
        return sessionidfactory;
    };
    sessionFactory.$inject = ['$http'];
    angular.module('myApp')
     .factory('sessionFactory',sessionFactory);
}());
*/








/*
angular.module('myApp', [])
    .service('sharedProperties', function () {
        var property = 'First';

        return {
            getProperty: function () {
                return property;
            },
            setProperty: function(value) {
                property = value;
            }
        };
    });
*/




