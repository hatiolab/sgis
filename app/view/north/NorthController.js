/**
* North Controller
*/
Ext.define('Sgis.view.north.NorthController', {
	extend: 'Ext.app.ViewController',

	alias: 'controller.app-north',

	control: {
		'#mapmode': {
			change: 'onMapModeChange'
		}
	},
	
	requires: [ 
	   		'Sgis.view.north.measure.MeasureWindow'
	],
	
	onClickAll: function () {
		SGIS.msg.alert('전체 Clicked!');
	},
	
	onClickMove: function () {
		SGIS.msg.alert('이동 Clicked!');
	},
	
	onClickZoomIn: function () {
		SGIS.msg.alert('확대 Clicked!');
	},
	
	onClickZoomOut: function () {
		SGIS.msg.alert('축소 Clicked!');
	},
	
	onClickPrev: function () {
		SGIS.msg.alert('이전 Clicked!');
	},
	
	onClickNext: function () {
		SGIS.msg.alert('다음 Clicked!');
	},
	
	onClickDelete: function () {
		SGIS.msg.alert('삭제 Clicked!');
	},
	
	onClickMeasure: function (button, e) {
		SGIS.popup('Sgis.view.north.measure.MeasureWindow', null, {modal:false, x:e.pageX-30, y:e.pageY+20});
	},
	
	onClickPrint: function () {
		SGIS.msg.alert('인쇄 Clicked!');
	},
	
	onClickPrev: function () {
		SGIS.msg.alert('이전 Clicked!');
	},
	
	onClickSave: function () {
		SGIS.msg.alert('저장 Clicked!');
	},
	
	onClickGray: function (button) {
		var me = thuis;
		if(button.pressed){
			document.getElementById("_mapDiv__layer0").style['-webkit-filter']="grayscale(100%)";
		}else{
			document.getElementById("_mapDiv__layer0").style['-webkit-filter']="";
			document.getElementById("_mapDiv__layer0").style.filter="''";
		}
	},

	onClickMapMode: function (button, e) {
		SGIS.msg.alert('맵 모드 ' + button.text + ' Clicked!');
	},
	
	onMapModeChange: function(button, item, eOpts) {
		SGIS.msg.alert('맵 모드 ' + button.text + ' Clicked!');
	},
	
	grayImage:function(imgObj){
		var canvas = document.createElement('canvas');
	    var canvasContext = canvas.getContext('2d');
	     
	    var imgW = imgObj.width;
	    var imgH = imgObj.height;
	    canvas.width = imgW;
	    canvas.height = imgH;
	     
	    canvasContext.drawImage(imgObj, 0, 0);
	    var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
	     
	    for(var y = 0; y < imgPixels.height; y++){
	        for(var x = 0; x < imgPixels.width; x++){
	            var i = (y * 4) * imgPixels.width + x * 4;
	            var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
	            imgPixels.data[i] = avg; 
	            imgPixels.data[i + 1] = avg; 
	            imgPixels.data[i + 2] = avg;
	        }
	    }
	    canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	    return canvas.toDataURL();
	}
});
