Ext.define('Sgis.store.LayerDynamicStore', {
	
	extend: 'Ext.data.Store',
		
	fields: [],

	autoLoad: true,

	remoteSort: true,
	
	pageSize: 15,

	proxy: {
		type: 'rest',
		url: '/resources/data/south/search-data1.json',
		reader: {
			type : 'json',
			rootProperty : 'items',
			successProperty : 'success',
			totalProperty : 'total'
		}
	}
});
