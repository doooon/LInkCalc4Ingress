/*
Link Calculator for Ingress ver.1.4.1FC1.1
*/

// 位取りを定義
String.prototype.reverse=function(){return this.split('').reverse().join('')};
Number.prototype.commify=function(){return this.toString().reverse().replace(/(\d\d\d)(?=\d)(?!\d*\.)/g,'$1,').reverse()};

// グローバル変数
var cookieList = new Array();


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

function ArraySortNumeric(prev,next){
	return next - prev;
}

function resonatorClick(e) {
	var elem = e.target;
	if (elem.textContent == 1) { elem.textContent = 8; elem.className = "cResoSlot R8"; }
	else { elem.textContent --; elem.className = "cResoSlot R" + elem.textContent; }
	//document.getElementById('preset').getElementsByTagName('option')[0].selected = true;
	funcResult();
}

function resonatorPress(elemID) {
	//console.log("catch longPress");
	var elem = document.getElementById(elemID);
	flag_press = 0;
	elem.textContent = 8; 
	elem.className = "cResoSlot R8";
	//document.getElementById('preset').getElementsByTagName('option')[0].selected = true;
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

function presetChange(e) {
	var elem = e.target;
	if (elem.selectedIndex==0) {
		if (cookieList['LinkCalc4Ingress'].split('+')[2]) {
			var presetval = cookieList['LinkCalc4Ingress'].split('+')[2];
			document.getElementById('preset').getElementsByTagName('option')[presetval].selected = true;
		} 
	} else if (elem.selectedIndex==1) {
		document.getElementById('Resonator00').textContent = '8'; 
		document.getElementById('Resonator00').className = "cResoSlot R8";
		document.getElementById('Resonator01').textContent = '8'; 
		document.getElementById('Resonator01').className = "cResoSlot R8";
		document.getElementById('Resonator02').textContent = '8'; 
		document.getElementById('Resonator02').className = "cResoSlot R8";
		document.getElementById('Resonator03').textContent = '8'; 
		document.getElementById('Resonator03').className = "cResoSlot R8";
		document.getElementById('Resonator04').textContent = '8'; 
		document.getElementById('Resonator04').className = "cResoSlot R8";
		document.getElementById('Resonator05').textContent = '8'; 
		document.getElementById('Resonator05').className = "cResoSlot R8";
		document.getElementById('Resonator06').textContent = '8'; 
		document.getElementById('Resonator06').className = "cResoSlot R8";
		document.getElementById('Resonator07').textContent = '8'; 
		document.getElementById('Resonator07').className = "cResoSlot R8";
	} else if (elem.selectedIndex==2) {
		document.getElementById('Resonator00').textContent = '8'; 
		document.getElementById('Resonator00').className = "cResoSlot R8";
		document.getElementById('Resonator01').textContent = '8'; 
		document.getElementById('Resonator01').className = "cResoSlot R8";
		document.getElementById('Resonator02').textContent = '8'; 
		document.getElementById('Resonator02').className = "cResoSlot R8";
		document.getElementById('Resonator03').textContent = '8'; 
		document.getElementById('Resonator03').className = "cResoSlot R8";
		document.getElementById('Resonator04').textContent = '8'; 
		document.getElementById('Resonator04').className = "cResoSlot R8";
		document.getElementById('Resonator05').textContent = '8'; 
		document.getElementById('Resonator05').className = "cResoSlot R8";
		document.getElementById('Resonator06').textContent = '8'; 
		document.getElementById('Resonator06').className = "cResoSlot R8";
		document.getElementById('Resonator07').textContent = '7'; 
		document.getElementById('Resonator07').className = "cResoSlot R7";
	} else if (elem.selectedIndex==3) {
		document.getElementById('Resonator00').textContent = '8'; 
		document.getElementById('Resonator00').className = "cResoSlot R8";
		document.getElementById('Resonator01').textContent = '8'; 
		document.getElementById('Resonator01').className = "cResoSlot R8";
		document.getElementById('Resonator02').textContent = '8'; 
		document.getElementById('Resonator02').className = "cResoSlot R8";
		document.getElementById('Resonator03').textContent = '8'; 
		document.getElementById('Resonator03').className = "cResoSlot R8";
		document.getElementById('Resonator04').textContent = '8'; 
		document.getElementById('Resonator04').className = "cResoSlot R8";
		document.getElementById('Resonator05').textContent = '8'; 
		document.getElementById('Resonator05').className = "cResoSlot R8";
		document.getElementById('Resonator06').textContent = '7'; 
		document.getElementById('Resonator06').className = "cResoSlot R7";
		document.getElementById('Resonator07').textContent = '7'; 
		document.getElementById('Resonator07').className = "cResoSlot R7";
	} else if (elem.selectedIndex==4) {
		document.getElementById('Resonator00').textContent = '8'; 
		document.getElementById('Resonator00').className = "cResoSlot R8";
		document.getElementById('Resonator01').textContent = '8'; 
		document.getElementById('Resonator01').className = "cResoSlot R8";
		document.getElementById('Resonator02').textContent = '8'; 
		document.getElementById('Resonator02').className = "cResoSlot R8";
		document.getElementById('Resonator03').textContent = '8'; 
		document.getElementById('Resonator03').className = "cResoSlot R8";
		document.getElementById('Resonator04').textContent = '8'; 
		document.getElementById('Resonator04').className = "cResoSlot R8";
		document.getElementById('Resonator05').textContent = '7'; 
		document.getElementById('Resonator05').className = "cResoSlot R7";
		document.getElementById('Resonator06').textContent = '7'; 
		document.getElementById('Resonator06').className = "cResoSlot R7";
		document.getElementById('Resonator07').textContent = '7'; 
		document.getElementById('Resonator07').className = "cResoSlot R7";
	} else if (elem.selectedIndex==5) {
		document.getElementById('Resonator00').textContent = '8'; 
		document.getElementById('Resonator00').className = "cResoSlot R8";
		document.getElementById('Resonator01').textContent = '8'; 
		document.getElementById('Resonator01').className = "cResoSlot R8";
		document.getElementById('Resonator02').textContent = '8'; 
		document.getElementById('Resonator02').className = "cResoSlot R8";
		document.getElementById('Resonator03').textContent = '8'; 
		document.getElementById('Resonator03').className = "cResoSlot R8";
		document.getElementById('Resonator04').textContent = '7'; 
		document.getElementById('Resonator04').className = "cResoSlot R7";
		document.getElementById('Resonator05').textContent = '7'; 
		document.getElementById('Resonator05').className = "cResoSlot R7";
		document.getElementById('Resonator06').textContent = '7'; 
		document.getElementById('Resonator06').className = "cResoSlot R7";
		document.getElementById('Resonator07').textContent = '7'; 
		document.getElementById('Resonator07').className = "cResoSlot R7";
	} else if (elem.selectedIndex==6) {
		document.getElementById('Resonator00').textContent = '8'; 
		document.getElementById('Resonator00').className = "cResoSlot R8";
		document.getElementById('Resonator01').textContent = '8'; 
		document.getElementById('Resonator01').className = "cResoSlot R8";
		document.getElementById('Resonator02').textContent = '8'; 
		document.getElementById('Resonator02').className = "cResoSlot R8";
		document.getElementById('Resonator03').textContent = '7'; 
		document.getElementById('Resonator03').className = "cResoSlot R7";
		document.getElementById('Resonator04').textContent = '7'; 
		document.getElementById('Resonator04').className = "cResoSlot R7";
		document.getElementById('Resonator05').textContent = '7'; 
		document.getElementById('Resonator05').className = "cResoSlot R7";
		document.getElementById('Resonator06').textContent = '6'; 
		document.getElementById('Resonator06').className = "cResoSlot R6";
		document.getElementById('Resonator07').textContent = '6'; 
		document.getElementById('Resonator07').className = "cResoSlot R6";
	} else if (elem.selectedIndex==7) {
		document.getElementById('Resonator00').textContent = '8'; 
		document.getElementById('Resonator00').className = "cResoSlot R8";
		document.getElementById('Resonator01').textContent = '8'; 
		document.getElementById('Resonator01').className = "cResoSlot R8";
		document.getElementById('Resonator02').textContent = '7'; 
		document.getElementById('Resonator02').className = "cResoSlot R7";
		document.getElementById('Resonator03').textContent = '7'; 
		document.getElementById('Resonator03').className = "cResoSlot R7";
		document.getElementById('Resonator04').textContent = '6'; 
		document.getElementById('Resonator04').className = "cResoSlot R6";
		document.getElementById('Resonator05').textContent = '6'; 
		document.getElementById('Resonator05').className = "cResoSlot R6";
		document.getElementById('Resonator06').textContent = '6'; 
		document.getElementById('Resonator06').className = "cResoSlot R6";
		document.getElementById('Resonator07').textContent = '6'; 
		document.getElementById('Resonator07').className = "cResoSlot R6";
	} else if (elem.selectedIndex==8) {
		document.getElementById('Resonator00').textContent = '8'; 
		document.getElementById('Resonator00').className = "cResoSlot R8";
		document.getElementById('Resonator01').textContent = '7'; 
		document.getElementById('Resonator01').className = "cResoSlot R7";
		document.getElementById('Resonator02').textContent = '6'; 
		document.getElementById('Resonator02').className = "cResoSlot R6";
		document.getElementById('Resonator03').textContent = '6'; 
		document.getElementById('Resonator03').className = "cResoSlot R6";
		document.getElementById('Resonator04').textContent = '5'; 
		document.getElementById('Resonator04').className = "cResoSlot R5";
		document.getElementById('Resonator05').textContent = '5'; 
		document.getElementById('Resonator05').className = "cResoSlot R5";
		document.getElementById('Resonator06').textContent = '4'; 
		document.getElementById('Resonator06').className = "cResoSlot R4";
		document.getElementById('Resonator07').textContent = '4'; 
		document.getElementById('Resonator07').className = "cResoSlot R4";
		
		// 1agent Mod slot
		{
			var modList = new Array(4);
			modList[0] = document.getElementById("ModSlot00").textContent;
			modList[1] = document.getElementById("ModSlot01").textContent;
			modList[2] = document.getElementById("ModSlot02").textContent;
			modList[3] = document.getElementById("ModSlot03").textContent;
			
			var modCount = 0;
			for (var i=0 in modList) {
				if (modList[i].match(/^(VRLA|SBUL|LA)$/)) modCount++;
			}
			
			if (modCount == 4) {
				for (var i=modList.length-1; i>=0; i--) {
					if (modList[i].match(/^LA$/) && modCount > 2) {
						document.getElementById('ModSlot0' + i).textContent = ''; 
						document.getElementById('ModSlot0' + i).className = "cModSlot none";
						modCount--;
					}
				}
			}
			if (modCount == 4) {
				for (var i=modList.length-1; i>=0; i--) {
					if (modList[i].match(/^SBUL$/) && modCount > 2) {
						document.getElementById('ModSlot0' + i).textContent = ''; 
						document.getElementById('ModSlot0' + i).className = "cModSlot none";
						modCount--;
					}
				}
			}
			if (modCount == 4) {
				for (var i=modList.length-1; i>=0; i--) {
					if (modList[i].match(/^VRLA$/) && modCount > 2) {
						document.getElementById('ModSlot0' + i).textContent = ''; 
						document.getElementById('ModSlot0' + i).className = "cModSlot none";
						modCount--;
					}
				}
			}
			if (modCount == 3) {
				for (var i=modList.length-1; i>=0; i--) {
					if (modList[i].match(/^LA$/) && modCount > 2) {
						document.getElementById('ModSlot0' + i).textContent = ''; 
						document.getElementById('ModSlot0' + i).className = "cModSlot none";
						modCount--;
					}
				}
			}
			if (modCount == 3) {
				for (var i=modList.length-1; i>=0; i--) {
					if (modList[i].match(/^SBUL$/) && modCount > 2) {
						document.getElementById('ModSlot0' + i).textContent = ''; 
						document.getElementById('ModSlot0' + i).className = "cModSlot none";
						modCount--;
					}
				}
			}
			if (modCount == 3) {
				for (var i=modList.length-1; i>=0; i--) {
					if (modList[i].match(/^VRLA$/) && modCount > 2) {
						document.getElementById('ModSlot0' + i).textContent = ''; 
						document.getElementById('ModSlot0' + i).className = "cModSlot none";
						modCount--;
					}
				}
			}
		} // 1agent Mod slot
	}	// else if (elem.selectedIndex==8)
	funcResult();
}

function allReset(e) {
	e.preventDefault();
	if (e.type === "mouseup" || e.type === "touchend") {
		flag_press = 0;
		for (var i=0; i<8; i++ ) {
			document.getElementById('Resonator0' + i).textContent = '8'; 
			document.getElementById('Resonator0' + i).className = "cResoSlot R8";
		}
		for (var i=0; i<4; i++ ) {
			document.getElementById('ModSlot0' + i).textContent = ''; 
			document.getElementById('ModSlot0' + i).className = "cModSlot none";
		}
		//document.getElementById('preset').getElementsByTagName('option')[0].selected = true;
		funcResult();
	}
}

function touchHandler(e) {
	e.preventDefault();
	switch (e.type) {
		case "touchstart" :
			flag_press = 1;
			timerID = setTimeout(function(){resonatorPress(e.target.id)}, 500);
			break;
		case "touchend" :
			clearTimeout(timerID);
			timerID = 0;
			if (flag_press == 1) { resonatorClick(e) }
			flag_press = 0;
			break;
		case "touchcancel" :
			clearTimeout(timerID);
			timerID = 0;
			flag_press = 0;
			break;
	}
}

function mouseHandler(e) {
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
}

function modTouchHandler(e) {
	e.preventDefault();
	switch (e.type) {
		case "touchstart" :
			flag_press = 1;
			break;
		case "touchend" :
			if (flag_press == 1) resonatorClick(e);
			flag_press = 0;
			break;
		case "touchcancel" :
			flag_press = 0;
			break;
	}
}

function modMouseHandler(e) {
	e.preventDefault();
	switch (e.type) {
		case "mousedown" :
			flag_press = 1;
			break;
		case "mouseup" :
			if (flag_press == 1) modSlotClick(e);
			flag_press = 0;
			break;
		case "mouseout" :
			break;
	}
}

function FuncLoad() {
	getCookie();
	
	//if(window.TouchEvent){
	if(isTouchDevice){
		for (var i=0; i<8; i++) {
			AddEventListener('Resonator0' + i, "touchstart", touchHandler);
			AddEventListener('Resonator0' + i, "touchend", touchHandler);
			AddEventListener('Resonator0' + i, "touchcancel", touchHandler);
		}
		for (var i=0; i<4; i++) {
			AddEventListener('ModSlot0' + i, "touchstart", modTouchHandler);
			AddEventListener('ModSlot0' + i, "touchend", modTouchHandler);
			AddEventListener('ModSlot0' + i, "touchcancel", modTouchHandler);
			//AddEventListener('ModSlot0' + i, "touchend", modSlotClick);
		}
		AddEventListener('reset', "touchstart", allReset);
		AddEventListener('reset', "touchend", allReset);
		AddEventListener('map-open-button-div', "touchstart", mapOpen);	
		AddEventListener('map-open-button-div', "touchend", mapOpen);	
	}else{
		for (var i=0; i<8; i++) {
			AddEventListener('Resonator0' + i, "mousedown", mouseHandler);
			AddEventListener('Resonator0' + i, "mouseup", mouseHandler);
			AddEventListener('Resonator0' + i, "mouseout", mouseHandler);
		}
		for (var i=0; i<4; i++) {
			AddEventListener('ModSlot0' + i, "mousedown", modMouseHandler);
			AddEventListener('ModSlot0' + i, "mouseup", modMouseHandler);
			AddEventListener('ModSlot0' + i, "mouseout", modMouseHandler);
			//AddEventListener('ModSlot0' + i, "click", modSlotClick);
		}
		AddEventListener('reset', "mousedown", allReset);
		AddEventListener('reset', "mouseup", allReset);
		AddEventListener('map-open-button-div', "mousedown", mapOpen);	
		AddEventListener('map-open-button-div', "mouseup", mapOpen);	
	}
	AddEventListener('preset', "change", presetChange);
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
	var presetval = document.getElementById('preset').selectedIndex;
	var exp = new Date();
	exp.setTime(exp.getTime()+1000*60*60*24*1);
	var str = rList.join(',') + '+' + mList.join(',') + '+' + presetval;
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
			if (cookieList['LinkCalc4Ingress'].split('+')[2]) {
				var presetval = cookieList['LinkCalc4Ingress'].split('+')[2];
				document.getElementById('preset').getElementsByTagName('option')[presetval].selected = true;
			}
		}
	}
}
		
function mapOpen(e) {
	e.preventDefault();
	if (e.type === "mouseup" || e.type === "touchend") {
		setTimeout(function(){document.getElementById('calc').style.top = "100%"}, 400);
	}
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
	for (var i in modNList) {
		if (i == 0) { rate += (modNList[i]*1.00) }
		else if (i == 1) { rate += (modNList[i]*0.25) }
		else if (i == 2) { rate += (modNList[i]*0.125) }
		else if (i == 3) { rate += (modNList[i]*0.125) }
	}
	if (rate == 0) { rate = 1 }
	
	// Potal Level
	document.getElementById('potalLevel').textContent = "LINK RANGE " + "(P" + Math.floor(averageLevel) + ")";
	
	// result
	amplifiedLinkRange_km = rawLinkRange_km * rate;
	document.getElementById('result').innerHTML = Number(amplifiedLinkRange_km.toFixed(3)).commify() + ' km';
	
	// discription
	document.getElementById('discription').innerHTML = rawLinkRange_km.toFixed(3) + ' km' + ' ×' + rate.toFixed(2) + '<br>\n';
	document.getElementById('discription').innerHTML = document.getElementById('discription').innerHTML + 'Max Outbound Links = ' + outLink;
	
	// preset
	{
		var agentn = 0;
		var reso8n = 0;
		var reso7n = 0;
		var reso6n = 0;
		var reso5n = 0;
		var reso4n = 0;
		for (var i=0 in resoList) {
			if (resoList[i]==8) reso8n++;
			else if (resoList[i]==7) reso7n++;
			else if (resoList[i]==6) reso6n++;
			else if (resoList[i]==5) reso5n++;
			else if (resoList[i]==4) reso4n++;
		}
		agentn = reso8n;
		if (agentn < reso7n) agentn = reso7n;
		var n = Math.ceil(reso6n / 2);
		if (agentn < n) agentn = n;
		n = Math.ceil(reso5n / 2);
		if (agentn < n) agentn = n;
		n = Math.ceil(reso4n / 4);
		if (agentn < n) agentn = n;
		
		var modCount = 0;
		for (var i=0 in modList) {
			if (modList[i].match(/^(VRLA|SBUL|LA)$/)) modCount++;
		}
		if (modCount > 2 && agentn == 1)  agentn = 2;
		
		if (agentn==8) {
			document.getElementById('preset').getElementsByTagName('option')[1].selected = true;
		} else if (agentn==7) {
			document.getElementById('preset').getElementsByTagName('option')[2].selected = true;
		} else if (agentn==6) {
			document.getElementById('preset').getElementsByTagName('option')[3].selected = true;
		} else if (agentn==5) {
			document.getElementById('preset').getElementsByTagName('option')[4].selected = true;
		} else if (agentn==4) {
			document.getElementById('preset').getElementsByTagName('option')[5].selected = true;
		} else if (agentn==3) {
			document.getElementById('preset').getElementsByTagName('option')[6].selected = true;
		} else if (agentn==2) {
			document.getElementById('preset').getElementsByTagName('option')[7].selected = true;
		} else if (agentn==1) {
			document.getElementById('preset').getElementsByTagName('option')[8].selected = true;
		}
	}
		
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
	/*
	center['x'] = window.innerWidth / 2;
	center['y'] = window.innerHeight / 2;
	*/
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

var isTouchDevice = ( function() {
  var ua = navigator.userAgent;
  if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
    return true;
  } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
    return true;
  } else {
    return false;
  }
})();