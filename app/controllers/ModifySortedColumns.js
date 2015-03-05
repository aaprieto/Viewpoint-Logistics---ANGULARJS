(function(){
  var ModifySortedColumns = function($scope, $modalInstance, loc_sortvalues ){

            $scope.currentsettinglabel = loc_sortvalues;

            if (loc_sortvalues == 'Ascending'){
                $scope.currentsettinglabel = 'Current Setting is ' + loc_sortvalues + ': Change to Descending';
            } else {
                $scope.currentsettinglabel = 'Current Setting is ' + loc_sortvalues + ': Change to Ascending';
            }


      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

       $scope.changeSortedValues = function () {
          if (loc_sortvalues == 'Ascending'){
                 $modalInstance.close('Descending');
            } else {
               $modalInstance.close('Ascending');
            }
       
      };


   }; 
     ModifySortedColumns.$inject = ['$scope', '$modalInstance','loc_sortvalues'];
      
    
    angular.module('myApp') 
    .controller('ModifySortedColumns', ModifySortedColumns);

}()); 
