var api = 'http://localhost:8082/branch/';
var app = angular.module('compie', ['gm']);

app.controller('MainCtrl', function($scope, $http) {
  $scope.lat = 0;
  $scope.lng = 0;
  
  if($scope.lat) {
  	console.log($scope.lat);
  }
  $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      var location = $scope.autocomplete.getPlace().geometry.location;
      $scope.lat = location.lat();
      $scope.lng = location.lng();
      $scope.$apply();
  });

  $scope.onSubmit = function() {
  	$http.get(api + $scope.lat + '/' + $scope.lng).then(function(data) {
  		$scope.data = data.data;
  		$scope.data.sort(function(a, b) {
  			return a.distance - b.distance;
  		})
  	}, function(error) {
  		console.log(error);
  	});
  }
});
