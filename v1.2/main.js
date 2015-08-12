/*
Link Calculator for Ingress
*/

// 位取りを定義
String.prototype.reverse=function(){return this.split('').reverse().join('')};
Number.prototype.commify=function(){return this.toString().reverse().replace(/(\d\d\d)(?=\d)(?!\d*\.)/g,'$1,').reverse()};


function AddEventListener(elementID, type, listener) {
	var element = document.getElementById(elementID);
    if( element.addEventListener ) {
        element.addEventListener( type, listener, false );
    }
    else if( element.attachEvent ) {
        element.attachEvent( 'on' + type,
            function() { listener.apply( element, arguments ); } );
    }
    else {
        // not support.
    }
}

function RemoveEventListener(elementID, type, listener) {
	var element = document.getElementById(elementID);
    if( element.removeEventListener ) {
        element.removeEventListener( type, listener, false );
    }
    else if( element.detachEvent ) {
        element.detachEvent( 'on' + type,
            function() { listener.apply( element, arguments ); } );
    }
    else {
        // not support.
    }
}

function ArraySortNumeric(prev,next){
	return next - prev;
}

function resonatorClick(e) {
	var elem = e.target;
	if (elem.textContent == 1) { elem.textContent = 8; elem.className = "cResoSlot R8"; }
	else { elem.textContent --; elem.className = "cResoSlot R" + elem.textContent; }
	funcResult();
}

function resonatorPress(elemID) {
	//console.log("catch longPress");
	var elem = document.getElementById(elemID);
	flag_press = 0;
	elem.textContent = 8; 
	elem.className = "cResoSlot R8";
	funcResult();
}

function modSlotClick(e) {
	var elem = e.target;
	if (elem.textContent.match(/^\s*$/i)) 	{ elem.textContent = "LA"; 		elem.className = "cModSlot LA"; 	}
	else if (elem.textContent == "LA") 		{ elem.textContent = "SBUL"; 	elem.className = "cModSlot SBUL"; 	}
	else if (elem.textContent == "SBUL") 	{ elem.textContent = "VRLA"; 	elem.className = "cModSlot VRLA"; 	}
	else if (elem.textContent == "VRLA") 	{ elem.textContent = " "; 		elem.className = "cModSlot none"; 	}
	funcResult();
}

function allReset() {
	flag_press = 0;
	for (var i=0; i<8; i++ ) {
		document.getElementById('Resonator0' + i).textContent = '8'; 
		document.getElementById('Resonator0' + i).className = "cResoSlot R8";
	}
	for (var i=0; i<4; i++ ) {
		document.getElementById('ModSlot0' + i).textContent = ''; 
		document.getElementById('ModSlot0' + i).className = "cModSlot none";
	}
	funcResult();
}

function touchHandler(e) {
  if (!handlerFlag) {
    for (var i=0; i<8; i++) {
    	RemoveEventListener('Resonator0' + i, "mousedown", mouseHandler);
    	RemoveEventListener('Resonator0' + i, "mouseup", mouseHandler);
    	RemoveEventListener('Resonator0' + i, "mouseout", mouseHandler);
    }
    for (var i=0; i<4; i++) {
    	RemoveEventListener('ModSlot0' + i, "click", modSlotClick);
    }
    RemoveEventListener('reset', "click", allReset);
    RemoveEventListener('map-open-button-div', "mouseup", mapOpen);	
    handlerFlag = true;
  }
	e.preventDefault();
	switch (e.type) {
		case "touchstart" :
			flag_press = 1;
			timerID = setTimeout(function(){resonatorPress(e.target.id)}, 500);
			break;
		case "touchcancel" :
			clearTimeout(timerID);
			timerID = 0;
			flag_press = 0;
			break;
		case "touchend" :
			clearTimeout(timerID);
			timerID = 0;
			if (flag_press == 1) { resonatorClick(e) }
			flag_press = 0;
			break;
	}
	console.log(e.type);
}

function mouseHandler(e) {
  if (!handlerFlag) {
    for (var i=0; i<8; i++) {
    	RemoveEventListener('Resonator0' + i, "touchstart", touchHandler);
    	RemoveEventListener('Resonator0' + i, "touchend", touchHandler);
    	RemoveEventListener('Resonator0' + i, "touchcancel", touchHandler);
    }
    for (var i=0; i<4; i++) {
    	RemoveEventListener('ModSlot0' + i, "touchend", modSlotClick);
    }
    RemoveEventListener('reset', "touchend", allReset);
    RemoveEventListener('map-open-button-div', "touchend", mapOpen);	
    handlerFlag = true;
  }
	e.preventDefault();
	switch (e.type) {
		case "mousedown" :
			flag_press = 1;
			timerID = setTimeout(function(){resonatorPress(e.target.id)}, 500);
			break;
		case "mouseup" :
			clearTimeout(timerID);
			timerID = 0;
			if (flag_press == 1) { resonatorClick(e) }
			flag_press = 0;
			break;
		case "mouseout" :
			clearTimeout(timerID);
			timerID = 0;
			break;
	}
	console.log(e.type);
}

function FuncLoad() {
	getCookie();
	
for (var i=0; i<8; i++) {
	AddEventListener('Resonator0' + i, "touchstart", touchHandler);
	AddEventListener('Resonator0' + i, "touchend", touchHandler);
	AddEventListener('Resonator0' + i, "touchcancel", touchHandler);
	AddEventListener('Resonator0' + i, "mousedown", mouseHandler);
	AddEventListener('Resonator0' + i, "mouseup", mouseHandler);
	AddEventListener('Resonator0' + i, "mouseout", mouseHandler);
}
for (var i=0; i<4; i++) {
	AddEventListener('ModSlot0' + i, "touchend", modSlotClick);
	AddEventListener('ModSlot0' + i, "click", modSlotClick);
}
AddEventListener('reset', "touchend", allReset);
AddEventListener('reset', "click", allReset);
AddEventListener('map-open-button-div', "touchend", mapOpen);	
AddEventListener('map-open-button-div', "mouseup", mapOpen);	
AddEventListener('calc', "transitionend", calcTransitionFinish);
	
	funcResult();
	loadMapJS();
}

// map.js load
function loadMapJS(){	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "./map.js";
	document.body.appendChild(script);
  //console.log("loaded > ./map.js");
}

function setSlotCookie() {
	var rList = new Array(8);
	for (var i=0; i<8; i++) {
		rList[i] = document.getElementById('Resonator0' + i).textContent;
	}
	var mList = new Array(4);
	for (i=0; i<4; i++) {
		mList[i] = document.getElementById('ModSlot0' + i).textContent;
	}			
	var exp = new Date();
	exp.setTime(exp.getTime()+1000*60*60*24*1);
	var str = rList.join(',') + '+' + mList.join(',');
	var escstr = encodeURIComponent(str);
	document.cookie = "LinkCalc4Ingress=" + escstr + "; expires=" + exp.toGMTString();
}

function setLocationCookie(lat, lng) {
	if (map) {
		var exp = new Date();
		exp.setTime(exp.getTime()+1000*60*60*24*365);
		var str = lat + "," + lng;
		var escstr = encodeURIComponent(str);
		document.cookie = "LinkCalc4IngressLocation=" + escstr + "; expires=" + exp.toGMTString();
	}
}

function getCookie() {
    var cookieList = new Array();
    var allcookies = document.cookie;
    if( allcookies != '' ) {
        var cookies = allcookies.split( '; ' );
        for( var i = 0; i < cookies.length; i++ ) {
            var cookie = cookies[ i ].split( '=' );
            cookieList[cookie[0]] = decodeURIComponent(cookie[1]);
        }
		if (cookieList['LinkCalc4IngressLocation']) {
			cookieLatLng['lat'] = Number(cookieList['LinkCalc4IngressLocation'].split(',')[0]);
			cookieLatLng['lng'] = Number(cookieList['LinkCalc4IngressLocation'].split(',')[1]);
			cookieLatLng['function'] = "getCookie()";
		}
		if (cookieList['LinkCalc4Ingress']) {
			var rList = new Array(8);
			rList = cookieList['LinkCalc4Ingress'].split('+')[0].split(',');
			var mList = new Array(4);
			mList = cookieList['LinkCalc4Ingress'].split('+')[1].split(',');
			for (var i in rList) {
				var elem = document.getElementById("Resonator0" + i );
				elem.textContent = rList[i];
				elem.className = "cResoSlot R" + elem.textContent;
			}
			for (i in mList) {
				var elem = document.getElementById("ModSlot0" + i );
				elem.textContent = mList[i];
				if (elem.textContent.match(/^\s*$/i)) 	{ elem.className = "cModSlot none"; }
				else if (elem.textContent == "LA") 		{ elem.className = "cModSlot LA"; 	}
				else if (elem.textContent == "VRLA") 	{ elem.className = "cModSlot VRLA"; }
				else if (elem.textContent == "SBUL") 	{ elem.className = "cModSlot SBUL"; }
			}
		}
	}
}
		
function mapOpen() {
	setTimeout(function(){document.getElementById('calc').style.top = "100%"}, 400);
}

function mapClose() {
	document.getElementById('calc').style.top = "0%";
	document.getElementById('calc').style.height = "100%";
}

function calcTransitionFinish(){
	if (document.getElementById('calc').style.top == "100%") {
		document.getElementById('calc').style.height = "0%";
	}
}

function funcResult() {
	var outLink = 8;
	
	var resoList = new Array(8);
	resoList[0] = Number(document.getElementById("Resonator00").textContent);
	resoList[1] = Number(document.getElementById("Resonator01").textContent);
	resoList[2] = Number(document.getElementById("Resonator02").textContent);
	resoList[3] = Number(document.getElementById("Resonator03").textContent);
	resoList[4] = Number(document.getElementById("Resonator04").textContent);
	resoList[5] = Number(document.getElementById("Resonator05").textContent);
	resoList[6] = Number(document.getElementById("Resonator06").textContent);
	resoList[7] = Number(document.getElementById("Resonator07").textContent);
	
	var modList = new Array(4);
	modList[0] = document.getElementById("ModSlot00").textContent;
	modList[1] = document.getElementById("ModSlot01").textContent;
	modList[2] = document.getElementById("ModSlot02").textContent;
	modList[3] = document.getElementById("ModSlot03").textContent;
	
	var modNList = new Array(4);

	var averageLevel = eval(resoList.join("+"))/8;
	var rawLinkRange_km = 160 * (averageLevel * averageLevel * averageLevel * averageLevel) / 1000;
	
	for (var i in modList) {
		if (modList[i].match(/^VRLA$/i)) { 	// very rare LinkAmp
			modNList[i] = 7;
		} else if (modList[i].match(/^SBUL$/i)) { // softbank Ultra Link
			modNList[i] = 5;
			outLink += 8;
		} else if (modList[i].match(/^LA$/i)) { // rare LinkAmp
			modNList[i] = 2;
		}
	}
	
	// ソート
	modNList.sort(ArraySortNumeric);
	
	var rate = 0;
	for (var j in modNList) {
		if (j == 0) { rate += (modNList[j]*1.00) }
		else if (j == 1) { rate += (modNList[j]*0.25) }
		else if (j == 2) { rate += (modNList[j]*0.125) }
		else if (j == 3) { rate += (modNList[j]*0.125) }
	}
	if (rate == 0) { rate = 1 }
	
	// Potal Level
	document.getElementById('potalLevel').textContent = "LINK RANGE " + "(P" + Math.floor(averageLevel) + ")";
	
	// result
	amplifiedLinkRange_km = rawLinkRange_km * rate;
	document.getElementById('result').textContent = Number(amplifiedLinkRange_km.toFixed(3)).commify() + ' km' 
	
	// discription
	document.getElementById('discription').innerHTML = rawLinkRange_km.toFixed(3) + ' km' + ' ×' + rate.toFixed(2) + '<br>\n';
	document.getElementById('discription').innerHTML = document.getElementById('discription').innerHTML + 'Max Outbound Links = ' + outLink;
	
	// cookie set
	setSlotCookie();
	
	// googleMap circle range change
	//if (circle) {circle.setRadius(amplifiedLinkRange_km*1000)}
	
	// googleMap zoom change
	//if (map) {map.setZoom(getZoomLevel(amplifiedLinkRange_km*1000))}
}
	
function getWindowCenter() {
	//console.log("------- getWindowCenter() ---------");
	//console.log("window.innerWidth = " + window.innerWidth + ", " + "window.innerHeight = " + window.innerHeight);
	var center = {};
	center['x'] = document.getElementById('map-canvas').offsetWidth / 2;
	center['y'] = document.getElementById('map-canvas').offsetHeight / 2;
	return center;
}

function setCenterCross(centerXY) {
	var result = {};
	result['x'] = Number((centerXY['x'] - 11).toFixed(0));	
	result['y'] = Number((centerXY['y'] - 11).toFixed(0));	
	document.getElementById('centerCross-canvas').style.top = result['y'] + "px";
	document.getElementById('centerCross-canvas').style.left = result['x'] + "px";
}
	
