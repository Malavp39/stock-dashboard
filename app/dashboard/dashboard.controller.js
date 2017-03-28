(function(angular) {
	'use strict';

	angular.module('stk.dashboard')
		.controller('DashboardController', DashboardController);

	function DashboardController($interval, ProfileService, StockService) {
		var vm = this;

        vm.userProfileSymbols = [];
		vm.searchSymbol = searchSymbol;
		vm.addStockToProfile = addStockToProfile;
		vm.removeStockFromProfile = removeStockFromProfile;
		vm.$onInit = init;

		function init() {
			ProfileService.getAllUserProfiles().then(function(data) {
				vm.userStockDetails = data;
                getMultipleStock();
				$interval(getMultipleStock, 5000);
			});
		}

		function searchSymbol() {
			StockService.getSelectedStock(vm.searchText).then(function(data) {
				vm.selectedStock = data;
			});
		}

		function addStockToProfile() {
			var stock = {
				stockSymbol: vm.selectedStock.Symbol,
				sharesOwned: vm.sharesOwned
			};

			ProfileService.addStockToUserProfile(stock).then(function(result) {
				vm.userStockDetails.push(stock);
				getMultipleStock();
			});
		}

		function removeStockFromProfile(symbol) {
			ProfileService.removeStockFromUserProfile(symbol).then(function(result) {
                for(var i=0 ; i<vm.userStockDetails.length; i++)
                {
                    if(vm.userStockDetails[i].stockSymbol === symbol){
                        vm.userStockDetails.splice(i, 1);
                        getMultipleStock();
					}
                }
			});
		}

		function getMultipleStock() {
			var stockSymbols = [];
			if(vm.userStockDetails || vm.userStockDetails.length) {
				vm.userStockDetails.forEach(function (stock) {
					stockSymbols.push(stock.stockSymbol);
                });
				StockService.getMultipleStock(stockSymbols).then(function(data) {
					vm.userProfiles = data;
                    vm.userProfiles.forEach(function(stockProfile) {
                        stockProfile.sharesOwned = vm.userStockDetails.filter(function( obj ) {
                            return obj.stockSymbol === stockProfile.Symbol;
                        })[0].sharesOwned;
					});
				});
			}
		}
	}
})(angular);