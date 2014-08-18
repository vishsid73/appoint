/**
 * Created with JetBrains WebStorm.
 * User: anuruddh
 * Date: 8/16/14
 * Time: 6:02 PM
 * To change this template use File | Settings | File Templates.
 */

var ProLogin = angular.module("prologin",['proglobals','ngResource']);
var wbAppoint = angular.module("wbappoint",[]);
//var wbProcess = angular.module("proces",['proglobals','ngRoute', 'proces.directives', 'ui.bootstrap', 'uiHandsontable']);
//var wbUProcess = angular.module("uProces", ['proglobals','ngRoute', 'ui.bootstrap', 'uiHandsontable']);

wbAppoint.controller('test', function($scope){
    $scope.sid = "siddharth";

});


angular.module("proglobals",[]).
    factory("global", [function($log){
        this.global = {
            fixedurl: "http://appoint.dev/app/",
            apiurl: "http://appoint.dev/api/"
        };
        return this.global;
    }]);

//for rest url encoded parameters
ProLogin.config(function ($httpProvider) {
    $httpProvider.defaults.transformRequest = function (data) {
        var str = [];
        for (var p in data) {
            data[p] !== undefined && str.push(encodeURIComponent(p) + '=' + encodeURIComponent(data[p]));
        }
        return str.join('&');
    };
    $httpProvider.defaults.headers.put['Content-Type'] = $httpProvider.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded; charset=UTF-8';
});

ProLogin.controller("loginCtrl",function($scope,$log,$http,global){
    $scope.result = "";
    $scope.username = "";
    $scope.password = "";
    $scope.loginbtn = function(){
        $http({
            url: global.apiurl+"login",
            method: "POST",
            data: {'user': $scope.username, 'pass': $scope.password}
        }).success(function (data, status, headers, config) {
                // assign  $scope.persons here as promise is resolved here
                //$log.log(data);
                if(data.result == "success"){
                    sessionStorage.setItem("user",$scope.username );
                    sessionStorage.setItem("type",data.user_type );
                    sessionStorage.setItem("user_id",data.user_id );
                    sessionStorage.setItem("result",1);
                    $log.log($scope.username,$scope.password, data.user_type, data.user_id);
                    if(data.user_type == "admin")
                        window.location.href=global.fixedurl+"admin.html";
                    else if(data.user_type == "emp" || data.user_type == "Typing" || data.user_type == "QC" )
                        window.location.href=global.fixedurl+"index.html";
                }
                else{
                    sessionStorage.setItem("result",-1);
                    $scope.result = 'Wrong Username & Password! ';
                }
            }).error(function (data, status, headers, config) {
                $scope.status = status;
                $log.log(status);
            });

    }

});