/**
 * Created with JetBrains WebStorm.
 * User: wb2
 * Date: 23/08/14
 * Time: 5:42 PM
 * To change this template use File | Settings | File Templates.
 */

var wbClient = angular.module("client",['proglobals']);

angular.module("proglobals",[]).
    factory("global", [function($log){
        this.global = {
            fixedurl: "http://appoint.dev/app/",
            apiurl: "http://appoint.dev/api/"
        };
        return this.global;
    }]);

//for rest url encoded parameters
wbClient.config(function ($httpProvider) {
    $httpProvider.defaults.transformRequest = function (data) {
        var str = [];
        for (var p in data) {
            data[p] !== undefined && str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
        }
        return str.join('&');
    };
    $httpProvider.defaults.headers.put['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded; charset=UTF-8';
});





wbClient.controller("bookCtrl", function($scope,global,$http, $log){
    $scope.name;
    $scope.mobile;
    $scope.date;
    $scope.curtoken;
    $scope.book = function(){
        $http({
            url: global.apiurl+"book",
            method: "POST",
            data: {'name': $scope.name, 'mobile': $scope.mobile, 'date': $scope.date}
        })
            .success(function (data, status, headers, config) {
                   $scope.curtoken = data.result;
            })
            .error(function (data, status, headers, config) {
                $log.log(status);
            });
    };
});