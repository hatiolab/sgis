Ext.define('Sgis.view.west.WestTab2', {
	
	extend: 'Ext.container.Container',
	
	requires: [
		'Sgis.view.west.WestTab2Controller'
	],

	xtype: 'app-west-tab2',

	controller: 'app-west-tab2',
	
	title: '자료검색',
	
	autoScroll: true,
	
	bodyPadding: 10,
	
	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	
	items: [{
		xtype: 'panel',
		layout: 'accordion',
		items: [{
			title: '지역검색',
			items: [{
				xtype: 'form',
				padding: 10,
				layout: {
					type: 'vbox',
					align: 'stretch'
				},
				items: [{
					itemId: 'cmbArea1',
					xtype: 'combo',
					fieldLabel: '시도',
					store: Ext.create('Sgis.store.Area1Store'),
					displayField: 'name',
					valueField: 'id'
				}, {
					itemId: 'cmbArea2',
					xtype: 'combo',
					fieldLabel: '시군구',
					store: Ext.create('Sgis.store.Area2Store'),
					displayField: 'name',
					valueField: 'id'
				}, {
					itemId: 'cmbArea3',
					xtype: 'combo',
					fieldLabel: '읍면동',
					store: Ext.create('Sgis.store.Area3Store'),
					displayField: 'name',
					valueField: 'id'
				}]
			}]
		}, {
			title: '영역검색',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			bodyPadding: 10,
			items: [{
				xtype: 'button',
				text: '원형',
				flex: 1,
				margin: '0 10 0 0',
				handler: 'onAreaCircleClick'
			}, {
				xtype: 'button',
				text: '사각형',
				flex: 1,
				margin: '0 10 0 0',
				handler: 'onAreaRectClick'
			}, {
				xtype: 'button',
				text: '다각형',
				flex: 1,
				margin: '0 10 0 0',
				handler: 'onAreaPolygonClick'
			}, {
				xtype: 'button',
				text: '반경',
				flex: 1,
				margin: '0 10 0 0',
				handler: 'onAreaRadiusClick'
			}, {
				xtype: 'button',
				text: '선택해제',
				flex: 1,
				handler: 'onAreaDeselectClick'
			}]
		}, {
			title: '레이어',
			//hideCollapseTool: true,
			xtype: 'treepanel',
			controller: 'app-west-tab2',
			rootVisible: false,
			useArrows: true,
			bufferedRenderer: false,
			store : Ext.create('Sgis.store.Layer2TreeStore')
		}]
	}]

});