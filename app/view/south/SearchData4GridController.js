/**
* SearchData1GridController
*/
Ext.define('Sgis.view.south.SearchData4GridController', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.search_data4_grid',
	
	control: {
		'toolbar cycle': {
			change: 'reloadGrid'
		}
	},
	
	reloadGrid: function() {
		this.getView().getStore().load();
	}
});
