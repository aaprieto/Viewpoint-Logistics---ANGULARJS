(function(){
  var ModalInstanceCtrl = function($scope,$modal, $modalInstance, items){


      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.launchnorow = function(action){

                  var dlg = null;

                switch(action){

                    case 'applymyview':
                       $modalInstance.dismiss('cancel');
                      break;
                    case 'panels':
                      openpanels("lg");
                      break;
                        
                    case 'selectall':
                      openselectall();
                      $modalInstance.dismiss('cancel');
                      break;
                    case 'unsort':
                      $modalInstance.dismiss('cancel');
                      break;    
                        
                    case 'commands':
                      $modalInstance.dismiss('cancel');
                      break;
                    case 'takeaction':
                      $modalInstance.dismiss('cancel');
                      break;
                    case 'administration':
                      openadministration("lg");
                      break;
                    case 'filter':
                      openfilter("lg");
                      break;
                    case 'sort':
                        opensort("lg");
                      break;

                    case 'undo':
                      $modalInstance.dismiss('cancel');
                      break;
                    case 'specials':
                     openspecials("lg");
                     break;
                    case 'spreadsheet':
                      openspreadsheet("lg");
                      break;
                    case 'xml':
                      openxml("lg");
                      break;
                    case 'query':
                      $modalInstance.dismiss('cancel');
                      break;

                }; // end switch

      };

      function opensort(size){
        var modalInstance = $modal.open({
          templateUrl: 'app/views/sortContent.html',
          controller: 'SortInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            } 
          }
        }).result.then(function(result) {
          var arr_ret_sort = [];
              arr_ret_sort[0] = 'sort'; 
              arr_ret_sort[1] = result;

                $modalInstance.close(arr_ret_sort);
        });
      };
      function openfilter(size){

        var modalInstance = $modal.open({
          templateUrl: 'app/views/filterContent.html',
          controller: 'FilterInstanceCtrl',
          size: size,
          resolve: { 
            items: function () {
              return $scope.items;
            } 
          }
        }).result.then(function(result) {
                var arr_ret_filter = [];
              arr_ret_filter[0] = 'filter';
              arr_ret_filter[1] = result;  
                $modalInstance.close(arr_ret_filter); 
                                //$scope.arr_xmlhdc_sorted[rowRenderIndex]['sortedvalues'] = result;

                                 // $scope.message = "You said " + result;
        });
      };
      
      function openspecials(size){
                  var modalInstance = $modal.open({
                  templateUrl: 'app/views/specialsContent.html',
                  controller: 'SpecialsInstanceCtrl',
                  size: size,
                  resolve: {   
                    items: function () {
                      return $scope.items;
                    } 
                  }
                });
      };
      

      
      function openspreadsheet(size){
        var modalInstance = $modal.open({
          templateUrl: 'app/views/spreadsheetsContent.html',
          controller: 'SpreadsheetsInstanceCtrl', 
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            } 
          }
        }).result.then(function(result) {
                var arr_ret_filter = [];
              arr_ret_filter[0] = 'spreadsheet';
              arr_ret_filter[1] = result;  
                $modalInstance.close(arr_ret_filter); 
                                
        });
      };
      
      
      
      
      function openxml(size){
                  var modalInstance = $modal.open({
                  templateUrl: 'app/views/xmlContent.html',
                  controller: 'XmlInstanceCtrl',  
                  size: size,
                  resolve: {   
                    items: function () {
                      return $scope.items;
                    } 
                  }
                });
           
      };
      
      
      
      
      function openselectall(){
                    var arr_ret_sort = [];
                    arr_ret_sort[0] = 'selectall'; 
                    $modalInstance.close(arr_ret_sort);
                   
           
      };
      
  
      function openadministration(size){
                  var modalInstance = $modal.open({
                  templateUrl: 'app/views/administrationContent.html',
                  controller: 'AdministrationInstanceCtrl',  
                  size: size,
                  resolve: {   
                    items: function () {
                      return $scope.items;
                    } 
                  }
                }).result.then(function(result) {
                        var arr_ret_sort = [];
                        arr_ret_sort[0] = 'redefinepanelsandsort'; 
                        arr_ret_sort[1] = result;

                        $modalInstance.close(arr_ret_sort); 
                });
           
      };
      
      
       function openpanels(size){
        var modalInstance = $modal.open({
          templateUrl:'app/views/panelsContent.html',
          controller: 'PanelsInstanceCtrl',
          size: size,
          resolve: {
            
          }
        }).result.then(function(result) {
            var arr_ret_sort = [];
              arr_ret_sort[0] = 'panel'; 
              arr_ret_sort[1] = result;

                $modalInstance.close(arr_ret_sort);
        });
      };
      
      
      
      
    };
      ModalInstanceCtrl.$inject = ['$scope', '$modal', '$modalInstance', 'items'];
    angular.module('myApp') 
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

}());

