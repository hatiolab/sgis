Ext.define('Sgis.map.SearchLayerAdmin', {
	map:null, 
	toolbar:null,
	gsvc:null,
	selectLayerInfo:{},
	geometry:null,
	sourceGraphicLayer:null,
	targetGraphicLayer:null,
	highlightGraphicLayer:null,
	layer1Url: 'http://cetech.iptime.org:6080/arcgis/rest/services/Layer1_new/MapServer',
	layer2Url: 'http://cetech.iptime.org:6080/arcgis/rest/services/Layer2/MapServer',
	area1Arr:[],
	timerId:null,
	spSearchBool:true,
	layers:[],
	layerDisplayFiledInfo:{},
	
	filterInfo:{
		"1" :[{GWMYR:['2010']}, {GWMOD:['상반기', '하반기']}],
		"2" :[{GWMYR:['2010']}, {GWMOD:['상반기', '하반기']}],
		"3" :[{QLTWTR_ANALS_YEAR:['2010']}, {QLTWTR_ANALS_QU:['1분기', '2분기', '3분기', '4분기']}],
		"4" :[{QLTWTR_ANALS_YEAR:['2010']}, {QLTWTR_ANALS_QU:['1분기', '2분기', '3분기', '4분기']}],
		"5" :[{YEAR:['2010',]}],
		"9" :[{등록년도:['2010']}, {등록반기:['상반기', '하반기']}],
		"10" :[{SSYR:['2010']}],
		"11" :[{YEAR:['2013']}, {EXAMIN_PNTTM:['하반기']}],
		"13" :[{YEAR:['1차년도']}],
		"14" :[{YEAR:['1차년도']}],
		"15" :[{SYEAR:['2013']}]
	},
	
	constructor: function(map) {
		var me = this;
		me.map = map;
		me.toolbar = new esri.toolbars.Draw(me.map, {showTooltips:false});
		dojo.connect(me.toolbar, "onDrawEnd", function(evt){
			me.map.setMapCursor("default");
			me.addToMap(evt);
		});
		me.sourceGraphicLayer = new esri.layers.GraphicsLayer();
		me.sourceGraphicLayer.id="sourceGraphic";
		me.map.addLayer(me.sourceGraphicLayer);
		me.targetGraphicLayer = new esri.layers.GraphicsLayer();
		me.targetGraphicLayer.id="targetGraphic";
		me.map.addLayer(me.targetGraphicLayer);
		
		me.highlightGraphicLayer = new esri.layers.GraphicsLayer();
		me.highlightGraphicLayer.id="highlightGraphic";
		me.map.addLayer(me.highlightGraphicLayer);
		
		me.getLayerDisplayFiledInfo();
		
		Sgis.getApplication().addListener('searchLayerOnOff', me.searchLayerOnOfffHandler, me);
		Sgis.getApplication().addListener('searchBtnClick', me.searchBtnClickfHandler, me);
    },
    
    addToMap:function(evt){
		var me = this;
		var symbol;
        me.toolbar.deactivate();
        symbol = new esri.symbol.SimpleFillSymbol();
        
        if(evt.type=='extent'){
        	me.geometry = new esri.geometry.Extent(evt);
        }else if(evt.type=='point'){
        	symbol = new esri.symbol.SimpleMarkerSymbol();
        	me.geometry = new esri.geometry.Point(evt);
        	me.bufferDisplayAndXY();
        }else if(evt.type=='polygon'){
        	me.geometry = new esri.geometry.Polygon(evt);
        }
        
        var graphic = new esri.Graphic(me.geometry, symbol);
        me.sourceGraphicLayer.clear();
        me.sourceGraphicLayer.add(graphic);
        Sgis.getApplication().fireEvent('drawComplte', null);
        me.spSearch();
	},
    
    searchBtnClickfHandler:function(btnInfo){
    	var me = this;
    	me.sourceGraphicLayer.clear();
		me.targetGraphicLayer.clear();
		me.highlightGraphicLayer.clear();
    	if(btnInfo.state){
    		me.toolbar.activate(esri.toolbars.Draw[btnInfo.drawType]);
    		me.map.setMapCursor("default");
    	}else{
    		me.toolbar.deactivate();
    	}
    },
    
    searchLayerOnOfffHandler:function(selectInfo){
    	var me = this;
    	me.layers = [];
    	if(selectInfo.length==0){
    		me.targetGraphicLayer.clear();
    		me.highlightGraphicLayer.clear();
    		return;
    	}
    	Ext.each(selectInfo, function(selectObj, index) {
    		if(selectObj.data.layerId && !isNaN(selectObj.data.layerId)){
    			me.layers.push(selectObj);
    		}
    		if(selectInfo.length==index+1){
    			me.spSearch();
    		}
		});
    },
    
    getLayerDisplayFiledInfo:function(){
		var me = this;
		var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/17");
		var query = new esri.tasks.Query();
		query.returnGeometry = false;
		query.where = "1=1";
		query.outFields = ["*"];
		queryTask.execute(query,  function(results){
			var attr = results.features;
			Ext.each(results.features, function(obj, index) {
				var attr = obj.attributes
				if(!me.layerDisplayFiledInfo[attr.ServiceID]){
					me.layerDisplayFiledInfo[attr.ServiceID] = [];
					me.layerDisplayFiledInfo[attr.ServiceID].push({fnm:"OBJECTID", fid:"OBJECTID", flag:false})
				}
				me.layerDisplayFiledInfo[attr.ServiceID].push({fnm:attr.Grid_NM, fid:attr.Column_NM});
			});
		});
		dojo.connect(queryTask, "onError", function(err) {
			alert(err);
		});
	},
    
    spSearch:function(filterObject){
		var me = this;
		me.targetGraphicLayer.clear();
		me.highlightGraphicLayer.clear();
		
		if(me.sourceGraphicLayer.graphics.length==0 || !me.geometry){
			return;
		}
		
		var exeComplteCnt = 0;
		var complteData = [];
		Ext.each(me.layers, function(layerInfo, index) {
			if(layerInfo){
				var layer = layerInfo.data
				var filterBool = false;
				if(filterObject && filterObject.layerId==layer.layerId){
					filterBool = true;
				}
				var resultData = {};
				resultData.title = layer.text;
				var datas = [];
				resultData.field = me.layerDisplayFiledInfo[layer.layerId];
				
				resultData.filter = me.filterInfo[layer.layerId];
				resultData.filterCallback = me.spSearch;
				resultData.filterCallbackScope = me;
				
				resultData.layerId = layer.layerId;
				resultData.text = layer.text;
				resultData.datas = datas;
				resultData.clickCallback = me.highlightGraphic;
				resultData.clickCallbackScope = me;
				
				var queryTask = new esri.tasks.QueryTask(me.layer1Url + "/" + layer.layerId);
				var query = new esri.tasks.Query();
				query.returnGeometry = true;
				query.outSpatialReference = {"wkid":102100};
				query.geometry = me.geometry;
				if(filterBool){
					query.where = filterObject.where;
				}
				query.outFields = ["*"];
				queryTask.execute(query,  function(results){
					if(results.features.length==0){
						exeComplteCnt++;
						complteData.push(resultData);
						if(exeComplteCnt==me.layers.length){
							Sgis.getApplication().fireEvent('searchComplte', complteData);
						}
					}
					else
					{
						Ext.each(results.features, function(obj, index) {
							var pictureMarkerSymbol;
							if(layer=='5'){
								pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(layer.iconInfo , 12, 12);
							}else{
								pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol(layer.iconInfo , 16, 16);
							}
							obj.setSymbol(pictureMarkerSymbol);
				    		me.targetGraphicLayer.add(obj);
				    		datas.push(obj.attributes);
				    		obj.attributes._layerName_ = layer.text;
				    		obj.attributes._layerId_ = layer.layerId;
				    		if(results.features.length==index+1){
				    			exeComplteCnt++;
				    			complteData.push(resultData);
								if(exeComplteCnt==me.layers.length){
									Sgis.getApplication().fireEvent('searchComplte', complteData);
								}
				    		}
						});
					}
					
				});
				dojo.connect(queryTask, "onError", function(err) {
					alert("spSearch : " + err);
				});
			}
		});
	}
});