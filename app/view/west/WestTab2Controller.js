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
	
	onArea1Change: function(combo, newValue, oldValue, eOpts) {
		SGIS.msg.alert(newValue + ' Selected!');
	},
	
	onArea2Change: function(combo, newValue, oldValue, eOpts) {
		SGIS.msg.alert(newValue + ' Selected!');
	},
	
	onArea3Change: function(combo, newValue, oldValue, eOpts) {
		SGIS.msg.alert(newValue + ' Selected!');
	},

	onAreaCircleClick: function() {
		SGIS.msg.alert('원형 Clicked!');
	},
	
	onAreaRectClick: function() {
		SGIS.msg.alert('사각형 Clicked!');
	},
	
	onAreaPolygonClick: function() {
		SGIS.msg.alert('다각형 Clicked!');
	},
	
	onAreaRadiusClick: function() {
		SGIS.msg.alert('반경 Clicked!');
	},
	
	onAreaDeselectClick: function() {
		SGIS.msg.alert('선택해제 Clicked!');
	},
	
	onCheckChanged: function(node, checked, eOpts) {
		if(!node.get('leaf')) {
			this.checkAllChildren(node, checked);
		} else {
			var view = this.getView();
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
				var view = me.getView();
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
