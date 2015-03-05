(function(){
  var CreateNewMyView = function($scope, $modal, $modalInstance,XMLHeaderDocService){
       
      
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
      
         $scope.baseonexistingmyview = function($event){
            //console.log("We are the world!");
             
                          var modalInstance = $modal.open({
                            templateUrl: 'app/views/selectMyViewsList.html',
                            controller: 'SelectMyViewsCtrl',  
                           size:'lg',
                            resolve: { 
                              loc_values: function () { 
                                //return loc_dispname; 
                              }
                            }
                          }).result.then(function(result) {
                                //console.log("Since youve been gone: " + result);
                                 // $scope.message = "You said " + result;
                          });
              
             
             
             
         }
         $scope.redefinepanelsandcolumns = function($event){
         
           
                          var modalInstance = $modal.open({
                            templateUrl: 'app/views/redefinePanelsandColumnsContent.html',
                            controller: 'RedefinePanelsAndColumnsCtrl', 
                            size:'lg',
                            resolve: { 
                              loc_values: function () { 
                                //return loc_dispname; 
                                  
                                  
                                  return test =XMLHeaderDocService.getuserrenditionlist();
                                  
                                  // return XMLHeaderDocService.getuserrenditionlist();
                              }
                            }
                          }).result.then(function(result) {
                                
                              
                                 $modalInstance.close(result);
                              
                                //console.log("Since youve been gone: " + result);
                                 // $scope.message = "You said " + result;
                          });
              
         }
         
      
         $scope.opendisplayactiongrid = function ($event) {
            console.log("hello world!");   
         }
    };
      CreateNewMyView.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('CreateNewMyView', CreateNewMyView);

}()); 


