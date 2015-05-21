/**
* West Tab2 Controller
*/
Ext.define('Sgis.view.west.WestTab2Controller', {
	
	extend: 'Ext.app.ViewController',
	
	alias: 'controller.app-west-tab2',
	
	control: {
		'#cmbArea1': {
			change: 'onArea1Change'
		},
		'#cmbArea2': {
			change: 'onArea2Change'
		},
		'#cmbArea3': {
			change: 'onArea3Change'
		},
		'treepanel': {
			checkchange: 'onCheckChanged'
		}		
	},
	
	constructor: function(map) {
		var me = this;
		me.callParent();
		Sgis.getApplication().addListener('drawComplte', me.drawComplteHandler, me);
    },
	
	onArea1Change: function(combo, newValue, oldValue, eOpts) {
		var view2 = Ext.getCmp('cmbArea2')
		var store2 = view2.getStore();
		store2.clearFilter();
		store2.filter(function(item){
			return (item.id+"").substring(0,2) == newValue;
		})
		
		var store3 = Ext.getCmp('cmbArea3').getStore();
		store3.clearFilter();
		store3.filter({
		    property: 'id',
		    value: 'none'
		})
		
		view2.reset();
	},
	
	onArea2Change: function(combo, newValue, oldValue, eOpts) {
		var view3 = Ext.getCmp('cmbArea3')
		var store3 = view3.getStore();
		store3.clearFilter();
		store3.filter(function(item){
			try{
				return (item.id+"").substring(0,4) == newValue.substring(0,4);
			}catch(e){
				return false;
			}
			
		})
		view3.reset();
	},
	
	onArea3Change: function(combo, newValue, oldValue, eOpts) {
		
	},

	onAreaCircleClick: function(button, e) {
		Sgis.getApplication().fireEvent('searchBtnClick', {drawType:'CIRCLE', state:button.pressed});
	},
	
	onAreaRectClick: function(button, e) {
		Sgis.getApplication().fireEvent('searchBtnClick', {drawType:'EXTENT', state:button.pressed});
	},
	
	onAreaPolygonClick: function(button, e) {
		Sgis.getApplication().fireEvent('searchBtnClick', {drawType:'POLYGON', state:button.pressed});
	},
	
	onAreaRadiusClick: function(button, e) {
		Sgis.getApplication().fireEvent('searchBtnClick', {drawType:'POINT', state:button.pressed});
	},
	
	drawComplteHandler: function(){
		var btnAr  = Ext.getCmp('btnHBox').items.items;
		Ext.each(btnAr, function(btn, index) {
			btn.setPressed(false);
		});
	},
	
	onCheckChanged: function(node, checked, eOpts) {
		if(!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		} else {
			var view = Ext.getCmp("layerTree2");
			if(view.xtype == 'treepanel') {
				Sgis.getApplication().fireEvent('searchLayerOnOff', view.getChecked());
				this.layerSearchData(node, checked);
			}
		}
	},
	
	checkAllChildren: function(node, checked) {		
		var me = this;
		var children = node.childNodes;
		
		Ext.each(children, function(child, index) {
			child.set('checked', checked);
			me.layerSearchData(child, checked);
			
			if(index == children.length - 1) {
				var view = Ext.getCmp("layerTree2");
				if(view.xtype == 'treepanel') {
					Sgis.getApplication().fireEvent('searchLayerOnOff', view.getChecked());
				}
			}
		});
	},
	
	layerSearchData: function(node, checked) {
		var nodeId = node.get('id');
		nodeId = parseInt(nodeId);
		
		if(!isNaN(nodeId)) {
			var viewName = 'Sgis.view.south.SearchData' + nodeId + 'Grid';
			if(checked) {
				SGIS.addSearchGrid(viewName, {title : node.get('text')});
			} else {
				SGIS.removeSearchGrid(viewName);
			}
		}
	}
});
