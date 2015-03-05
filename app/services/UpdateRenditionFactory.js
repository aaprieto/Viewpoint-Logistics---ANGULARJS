(function(){
    var UpdateRenditionFactory = function($http,XMLHeaderDocService){
      var updaterenditionfactory = {};  
         updaterenditionfactory.getupdaterenditionFactory = function(session_id, loc_arr_updrend){ 
           
             var rendition_head = '<rendition>';
             var rendition_tail = '</rendition>';
             var rendition_body;
             var string_detail;        
             var string_final;
             
             var finalRenditionXML;
             for(var i=0; i<loc_arr_updrend.length; i++){
                string_detail = string_detail + '<data>' +
                                                '<type>' + loc_arr_updrend[i]['type'] + '</type>' +
                                                '<columnname>' + loc_arr_updrend[i]['columnname'] + '</columnname>' +
                                                '<headertext>' + loc_arr_updrend[i]['headertext'] + '</headertext>' +
                                                '</data>';
             }

             
            finalRenditionXML = ('REFRESH,UPD_RENDITION,' + rendition_head +
                               '<mbdcode>' + XMLHeaderDocService.getmainboard +'</mbdcode>' +
                               '<usercode>maves</usercode>' +
                               '<rendcode>No Selection</rendcode>' +
                               '<renddesc>Temporary File for Column</renddesc>' +
                               '<default_rendition></default_rendition>' +
                               string_detail +
                               rendition_tail);
            
            return request = $http({
            method: "post",
            url: "app/assets/ae_tlch_xmlreq.php",
            data: "<ezware_request>" +
                    "<action>refreshData</action>" +
                    "<company>L1</company>" +
                    "<parameters>" + finalRenditionXML + "</parameters>" +
                    "<sid>" +  session_id + "</sid>" +
                    "<version>1</version>" +
                    "</ezware_request>"
            });
           
        
        }
       
         return updaterenditionfactory;
     
    };
    UpdateRenditionFactory.$inject = ['$http','XMLHeaderDocService'];
    angular.module('myApp')
     .factory('UpdateRenditionFactory',UpdateRenditionFactory);
}());



