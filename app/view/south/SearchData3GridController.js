/**
* SearchData1GridController
*/
Ext.define('Sgis.view.south.SearchData3GridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.search_data3_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	reloadGrid: function() {
		this.getView().getStore().load();
	}
});
