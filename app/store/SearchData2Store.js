Ext.define('Sgis.store.SearchData2Store', {
	
	extend: 'Ext.data.Store',
		
	fields: ['id', 'branch_no', 'branch_name', 'area1', 'area2', 'address', 'geo_feature', 'depth', 'depth_depth'],

	autoLoad: true,

	remoteSort: true,
	
	pageSize: 15,

	proxy: {
		type: 'rest',
		url: '/resources/data/south/search-data2.json',
		reader: {
			type : 'json',
			rootProperty : 'items',
			successProperty : 'success',
			totalProperty : 'total'
		}
	}
});
