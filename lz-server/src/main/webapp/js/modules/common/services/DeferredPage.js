define(['angular'], function (angular) {
	return ['RestService', 'Loading', '$timeout', DeferredPage];
	function DeferredPage(RestService, Loading, $timeout) {
		var DeferredPage = function (url, pageSize) {
			this.loadedPages = {};
			this.total = -1;
			this.pageSize = pageSize;
			this.url = url;
			this.query;
			this.collectionQuery;
			this.params;
			this.sortField;
			this.sortDesc = false;
			this.debug = false;
			this.lodding = Loading.start();
			this.and = false;

			this.setQuery = function (query) {
				this.query = query;
				return this;
			};

			this.setCollectionQuery = function (collectionQuery) {
				this.collectionQuery = collectionQuery;
				return this;
			};

			this.setParams = function (params) {
				this.params = params;
				return this;
			};

			this.setSortField = function (sortField) {
				this.sortField = sortField;
				return this;
			};

			this.isSortDesc = function (sortDesc) {
				this.sortDesc = sortDesc;
				return this;
			};

			this.isAnd = function (and) {
				this.and = and;
				return this;
			};

			this.isDebug = function (debug) {
				this.debug = debug;
				return this;
			};

			this.getLength = function () {
				return this.total;
			};

			this.getItemAtIndex = function (index) {
				var pageNumber = Math.floor(index / this.pageSize);
				var page = this.loadedPages[pageNumber];
				if (page) {
					return page[index % this.pageSize];
				} else if (page !== null) {
					this.fetchPage(pageNumber, this);
				}
			};

			this.fetchPage = function (pageNumber, obj) {
				this.loadedPages[pageNumber] = null;
				$timeout(angular.noop, 300).then(angular.bind(this, function () {
					this.loadedPages[pageNumber] = [];
					var start = pageNumber == 0 ? 0 : (pageNumber * this.pageSize);
					var condition = {
						start: start,
						number: this.pageSize,
						and: this.and,
						query: this.query,
						collectionQuery: this.collectionQuery,
						sortField: this.sortField,
						sortDesc: this.sortDesc,
						params: this.params
					};
					RestService.post(obj.url, condition).then(function (data) {
						if (obj.total == -1) {
							obj.total = data.total;
						}
						if (obj.debug) {
							console.dir(data);
						}
						for (var i in data.values) {
							if (!data.values[i].id) {
								console.dir(data.values[i]);
							}
							obj.loadedPages[pageNumber].push(data.values[i]);
						}
						obj.lodding.close();
					});
				}));
			};

			this.start = function () {
				this.fetchPage(0, this);
				return this;
			}
		};
		return {
			get: function (url, pageSize) {
				return new DeferredPage(url, pageSize);
			}
		}
	}
});