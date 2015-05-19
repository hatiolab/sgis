/**
* SearchData1GridController
*/
Ext.define('Sgis.view.south.SearchData2GridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.search_data2_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	reloadGrid: function() {
		this.getView().getStore().load();
	}
});
