function arrange(col, row, refresh)
{
	var offset = 0;
	var toolbars = document.getElementsByClassName("toolbar");
	if (toolbars && toolbars.length > 0)
		offset = toolbars[0].offsetHeight;
	var title = document.getElementById("title");
	var width = window.innerWidth;
	var isTablet = window.makitConnecter.getIsTablet();
	var height =  (isTablet ? window.innerHeight - 95 : window.innerHeight -115);
	if(isTablet){
		if(window.makitConnecter.getIsTablet31()){
			height = window.innerHeight - 10;
		}
	}
	var isDocFromGeo = window.makitConnecter.isDocformGeoMap();
	if(isDocFromGeo){
		height = height - 40;
	}
	var elem = document.getElementById("contents");
	if(window.makitConnecter.getIsChartTitleAvailable(contentId)){
		title.style.height = 25;
		offset += 14;
		elem.style.height = (height - offset) + "px";
	}
	else{
		title.style.height = 0;
		elem.style.height = (height - offset) + "px";
	}
	elem.style.width = width + "px";
	var len = elem.children.length;
	var childElem;
	for (var i = 0; i < len; i++)
	{
		childElem = elem.children[i];
		childElem.style.width = (100 / col)  + "%";
		childElem.style.height = (100 / row) + "%";
		
		if (refresh)
			$MA(childElem.id).refresh();
	}
}

function updateCSS(theme,fn) {
	var css;
	var head = document.getElementsByTagName('head')[0];
	var length=head.children.length;	
	
	//clear the theme css
	for (var i = 0; i <length ; i++)
	{
		elem = head.children[i];
		if (elem.className == 'ui-theme')
		{
			head.removeChild(elem);
			length--;
			i--;
		}
	}
	
	//create the new theme css link
	css = document.createElement('link');
	css.setAttribute('rel', 'Stylesheet');
	css.setAttribute('type', 'text/css');
	css.setAttribute('class', 'ui-theme');

	if (theme.toLowerCase()=="default")
		css.setAttribute('href', '../css/' + theme + '.css');
	else	
		css.setAttribute('href', 'css/themes/' + theme + '.css');
	
	//check whether the file is loaded
	var sheet, cssRules;	
	
	if ( 'sheet' in css ) {
      sheet = 'sheet'; cssRules = 'cssRules';
	}
	else {
      sheet = 'styleSheet'; cssRules = 'rules';
	}
	
	var interval_id = setInterval( function() { // start checking
          try {
             if ( css[sheet] && css[sheet][cssRules].length ) { // SUCCESS!
                clearInterval( interval_id );
                clearTimeout( timeout_id );
                fn.call(window, true, css ); // fire the callback
             }
          } catch( e ) {} finally {}
       }, 10 ),
       timeout_id = setTimeout( function() {    // start counting till fail
          clearInterval( interval_id );  //failed
          clearTimeout( timeout_id );
          head.removeChild( css );        
          fn.call( window, false, css ); // fire the callback with failing
       }, 15000 );     // how long to wait

	head.appendChild(css);
}


window.addEventListener(navigator.userAgent.indexOf("iPad") > 0 ? "orientationchange" : "resize", function() {
	var chartType = window.makitConnecter.getChartType(contentId);
	var oriantation = window.makitConnecter.getOrientation();
	console.log('oriantation == '+ oriantation);
	if(chartType != 'pie'){
		console.log('Chart type is not equal to PIE');
	}
	else{
		console.log('Chart type is  equal to PIE');
	}
	
	if(chartType != 'pie'){
		console.log('Chart type is not equal to PIE inside  if statement');
		if(chartType != 'bubble'){
			var isDocFromGeo = window.makitConnecter.isDocformGeoMap();
			
			if(oriantation){
				var isTablet = window.makitConnecter.getIsTablet();
				if(isTablet){
					if(isDocFromGeo){
						var isGeoDocFullscreen =  window.makitConnecter.isGeofullscreen();
						if(isGeoDocFullscreen){
							$MA("chart_1").showRangeSelectorView(true);
						}else{
							$MA("chart_1").showRangeSelectorView(false);
						}
					}else{
						$MA("chart_1").showRangeSelectorView(true);
					}
					
				}
				else{
					$MA("chart_1").showRangeSelectorView(false);
					
				}
			}
			else{
				if(isDocFromGeo){
					var isGeoDocFullscreen =  window.makitConnecter.isGeofullscreen();
					if(isGeoDocFullscreen){
						$MA("chart_1").showRangeSelectorView(true);
					}else{
						$MA("chart_1").showRangeSelectorView(false);
					}
				}else{
					$MA("chart_1").showRangeSelectorView(true);
				}
				
			}
		}
	}
	else{
		var styleObj = {};
		if(oriantation){
			console.log('Landscape view orientation');
			var styleObj = {};
			styleObj.showValueOnPieChart  = true ;
			/*
			 This will enable the  Measure value in the Pie chart bubble
			 define top if needed in top
			*/
			styleObj.position = "top";
			$MA("chart_1").setValueBubbleStyle(styleObj);
			$MA("chart_1").setLegend("left");
			$MA("chart_1").refresh();
		}
		else{
			console.log('Portrait view orientation');
			var styleObj = {};
			styleObj.showValueOnPieChart  = true ;
			/*
			 This will enable the  Measure value in the Pie chart bubble
			 define top if needed in top
			*/
			styleObj.position = "top";
			$MA("chart_1").setValueBubbleStyle(styleObj);
			$MA("chart_1").setLegend("bottom");
			$MA("chart_1").refresh();
		}
		
	}
		onOrientationChanged();
	}, false);

$MA.setImagesFolder("../images/");