
var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    


var refresh = function() {
  console.log("Hello World from controller");
  $http.get('/contactlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.contactlist = response;
    $scope.contact = "";
  });
};

refresh();

$scope.addContact = function() {
  console.log($scope.contact._id);
  if ($scope.contact._id===undefined) {
    $http.post('/contactlist', $scope.contact).success(function(response) {
      console.log(response);
      refresh();
    });
  }
  else {
      console.log('put function initiated');
      $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
  }
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};  

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);