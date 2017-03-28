(function (angular) {
    'use strict';

    angular.module('stk.profileService')
        .service('ProfileService', ProfileService);

    function ProfileService($http) {
        var self = this;
        var API_BASE = 'http://localhost:8080/stock/';
        var defaults = {};

        self.getAllUserProfiles = getAllUserProfiles;
        self.addStockToUserProfile = addStockToUserProfile;
        self.removeStockFromUserProfile = removeStockFromUserProfile;

        function getAllUserProfiles() {
            return $http.get(API_BASE + 'getAll').then(function (result) {
                return result.data;
            });
        }

        function addStockToUserProfile(stock) {
            return $http.post(API_BASE + 'create', stock).then(function (result) {
                return result.data;
            });
        }

        function removeStockFromUserProfile(symbol) {
            return $http.delete(API_BASE + symbol).then(function (result) {
                return result;
            });
        }
    }

})(angular);
