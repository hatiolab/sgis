/**
* LayerDynamicGridController
*/
Ext.define('Sgis.view.south.LayerDynamicGridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.layer_dynamic_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	constructor: function(map) {
		var me = this;
		me.callParent();
		Sgis.getApplication().addListener('searchComplte', me.searchComplteHandler, me);
    },
    
	reloadGrid: function() {
		var toolbar = this.getView().down(' toolbar');
		var pageSize = toolbar.down('#btnCountPerPage').getText();
		pageSize = parseInt(pageSize);
		var year = toolbar.down('#btnYear').getText();
		var quarter = toolbar.down('#btnQuarter').getText();
		
		var params = {
			nodeId : this.getView().dynamicId,
			pageSize : pageSize,
			year : year,
			quarter : quarter
		};
		
		console.log(params);
		
		// TODO 확인 필요 
		Sgis.getApplication().fireEvent('searchParameters', this.getView().nodeId, params);
	},
	
    searchComplteHandler: function(results) {
		var result = results[0];
		console.log(result);
		var grid = this.getView();
		var store = grid.getStore();
		
		if(store == null || !store.fields) {
			var data = this.getLayerDataAll(result);
			grid.reconfigureDynamicGrid(data[0], data[1]);			
		} else {
			var data = this.getLayerData(result);
			store.setData(data);
			store.load();
		}

    },
	
	getLayerDataAll : function(results) {
		var headers = this.getLayerMetadata(results);
		var dataList = this.getLayerData(results);
		return [headers, dataList];		
	},
	
	/**
	 * Get Layer Columns Information
	 */
	getLayerMetadata : function(results) {
		var fields = results.field;
		var headers = [];
		
		for(var i = 0 ; i < fields.length ; i++) {
			var header = {
				text: fields[i].fnm,
				dataIndex: fields[i].fid,
				hidden: (fields[i].flag === false) ? true : false
			};
			
			headers.push(header);
		}
		
		return headers;
	},
	
	/**
	 * Get Layer Data
	 */
	getLayerData : function(results) {
		var headers = results.field;
		var datum = results.datas;
		var dataList = [];
		
		for(var i = 0 ; i < datum.length ; i++) {
			var data = {};
			
			for(var j = 0 ; j < headers.length ; j++) {
				data[headers[j].fid] = datum[i][headers[j].fid];
			}
			
			dataList.push(data);
		}
		
		return dataList;
	}
});
