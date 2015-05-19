Ext.define('Sgis.view.south.SearchData5Grid', {

	extend : 'Ext.grid.Panel',
	
	requires: [
		'Sgis.store.SearchData5Store',
		'Sgis.view.south.SearchData5GridController'
	],
	
	xtype: 'search_data5_grid',
	
	controller: 'search_data5_grid',

	title: '지하수 관정정보',
	
	store : Ext.create('Sgis.store.SearchData5Store'),

	flex : 1,
		
	autoScroll : true,
		
	rowLines : true,
		
	columnLines : true,
	
	columns : [ { 
		dataIndex : 'id',
		flex : 1,
		text : '일련번호'
	}, { 
		dataIndex : 'branch_no',
		flex : 1,
		text : '지점번호'
	}, { 
		dataIndex : 'branch_name',
		flex : 1,
		text : '지점명'
	}, { 
		dataIndex : 'area1',
		flex : 1,
		text : '시도'
	}, { 
		dataIndex : 'area2',
		flex : 1,
		text : '시군구'
	}, { 
		dataIndex : 'address',
		flex : 1,
		text : '주소'
	}, { 
		dataIndex : 'geo_feature',
		flex : 1,
		text : '지질'
	}, { 
		dataIndex : 'depth',
		flex : 1,
		text : '심도'
	}, { 
		dataIndex : 'depth_depth',
		flex : 1,
		text : '심도깊이'
	} ],
	
	tbar: {
		xtype: 'toolbar',
		items: [{
			xtype: 'label',
			text: '연도',
			padding: '0 10 0 10'
		}, {
			itemId: 'btnYear',
			xtype: 'cycle',
			showText: true,
			menu : {
				items: [{
					text: '2010',
					checked: true
				}, {
					text: '2011'
				}, {
					text: '2012'
				}, {
					text: '2013'
				}, {
					text: '2014'
				}]
			}
		}, {
			xtype: 'label',
			text: '분기',
			padding: '0 10 0 30'
		}, {
			itemId: 'btnQuarter',
			xtype: 'cycle',
			showText: true,
			menu : {
				items: [{
					text: '전체',
					checked: true
				}, {
					text: '상반기'
				}, {
					text: '하반기'
				}]
			}
		}, '->', {
			xtype: 'label',
			text: '페이지 당 데이터 개수',
			padding: '0 10 0 00'
		}, {
			itemId: 'btnCountPerPage',
			xtype: 'cycle',
			showText: true,
			menu : {
				items: [{
					text: '15',
					checked: true
				}, {
					text: '30'
				}, {
					text: '50'
				}]
			}
		}]
	},
	
	bbar : {
		xtype : 'pagingtoolbar',
		cls : 'pagingToolbar',
		store : this.store,
        displayInfo: true,
        displayMsg: '{0} - {1} of {2}',
        emptyMsg: '데이터가 없습니다.'
	},
	
	initComponent : function() {
		this.callParent();
		var pagingtoolbar = this.down(' pagingtoolbar');
		pagingtoolbar.bindStore(this.store);
		var toolbar = this.down(' toolbar');
		
		this.store.on('beforeload', function(store, operation, opts) {
			var pageSize = toolbar.down('#btnCountPerPage').getText();
			pageSize = parseInt(pageSize);
			store.setPageSize(pageSize);
			var extraParams = store.getProxy().getExtraParams() || {};
			extraParams.year = toolbar.down('#btnYear').getText();
			extraParams.quarter = toolbar.down('#btnQuarter').getText();
			store.getProxy().setExtraParams(extraParams);
		}, this);
	}
});
