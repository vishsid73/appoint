/**
 * Created with JetBrains WebStorm.
 * User: wb2
 * Date: 23/08/14
 * Time: 5:42 PM
 * To change this template use File | Settings | File Templates.
 */

var wbClient = angular.module("client",["proglobals","firebase"]);

angular.module("proglobals",[]).
    factory("global", [function($log){
        this.global = {
            fixedurl: "http://appoint.dev/app/",
            apiurl: "http://appoint.dev/api/"
        };
        return this.global;
    }]);


// a factory to create a re-usable Profile object
// we pass in a username and get back their synchronized data as an object
wbClient.factory("Profile", ["$firebase", function($firebase) {
    return function(curdate) {
        // create a reference to the user's profile
        var reff = new Firebase("https://wbappoint.firebaseio.com/").child(curdate);

        // return it as a synchronized object
        return $firebase(reff).$asObject();
    }
}]);

wbClient.controller("ProfileCtrl", ["$scope", "Profile",
    function($scope, Profile) {
        // create a 3-way binding to our Profile as $scope.profile
        Profile("physicsmarie").$bindTo($scope, "profile");
    }
]);

wbClient.controller("bookCtrl", function($scope,$firebase,global,$http, $log,Profile){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var today = yyyy+'-'+mm+'-'+dd;

    //var today = "2014-08-24";

    $scope.name;
    $scope.mobile;
    $scope.date;

    Profile(today).$bindTo($scope, "profile");


    var ref = new Firebase("https://wbappoint.firebaseio.com/");
    var sync = $firebase(ref);

    $scope.book = function(){
        $http({
            url: global.apiurl+"book",
            method: "POST",
            data: {'name': $scope.name, 'mobile': $scope.mobile, 'date': $scope.date}
        })
            .success(function (data, status, headers, config) {
                   //$scope.curtoken = data.result;
                   sync.$update($scope.date, {total: data.total});
            })
            .error(function (data, status, headers, config) {
                $log.log(status);
            });
    };
});