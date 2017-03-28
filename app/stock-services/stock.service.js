(function(angular) {
	'use strict';

	angular.module('stk.stockService')
		.service('StockService', StockService);

	function StockService($http, $q) {
		var self = this;
		var API_BASE = 'http://query.yahooapis.com/v1/public/yql';
		var defaults = {
			format: 'json',
			diagnostics: true,
			env: 'store://datatables.org/alltableswithkeys',
			callback: ''
		};

		self.getSelectedStock = getSelectedStock;
		self.getMultipleStock = getMultipleStock;

		function getSelectedStock(symbol) {
			var query = 'select * from yahoo.finance.quotes where symbol in ("' + symbol + '")';
			var params = angular.extend({}, defaults, {
				q: query
			});

			return $http.get(API_BASE, { params: params }).then(function(result) {
						return result.data.query.results.quote;
					});
		}

		function getMultipleStock(symbols) {
			var queue = [];
			var response = [];
			symbols.forEach(function(symbol) {
				queue.push(getSelectedStock(symbol));
			});

			return $q.all(queue).then(function(results) {
				return results;
			});
		}
	}
	
})(angular);
