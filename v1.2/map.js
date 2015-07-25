/*
Link Calculator for Ingress
*/
var map;
var marker;
var circle;
var infowindow;

function initialize(lat, lng, range) {
	var myLatlng = new google.maps.LatLng(lat, lng);				
	var mapOptions = {
		center: myLatlng,
		zoom: getZoomLevel(range)
	    //,scrollwheel: false
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	
	/*
	google.maps.ControlPosition
	TOP_CENTER, TOP_LEFT, TOP_RIGHT, LEFT_TOP, RIGHT_TOP, LEFT_CENTER, RIGHT_CENTER, LEFT_BOTTOM, RIGHT_BOTTOM, BOTTOM_CENTER, BOTTOM_LEFT, BOTTOM_RIGHT
	*/

	// Add custom button
	var mapBackButtonDiv = document.createElement('div');
	var mapBackButton = new funcMapBackButton(mapBackButtonDiv, map);
	mapBackButtonDiv.index = 1;
	map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(mapBackButtonDiv);
				
	// Add custom button
	var mapCurrentLocationButtonDiv = document.createElement('div');
	var mapCurrentLocationButton = new funcMapCurrentLocationButton(mapCurrentLocationButtonDiv, map);
	mapCurrentLocationButtonDiv.index = 1;
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(mapCurrentLocationButtonDiv);
				
	// Add custom button
	var mapMarkerButtonDiv = document.createElement('div');
	var mapMarkerButton = new funcMapDropMarkerButton(mapMarkerButtonDiv, map);
	mapMarkerButtonDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapMarkerButtonDiv);
}

function relocateMarker(lat, lng) {
	var latLng = {};
	latLng['lat'] = lat;
	latLng['lng'] = lng;
	marker.setPosition(latLng);
	//marker.setAnimation();
	marker.setAnimation( google.maps.Animation.DROP );
	circle.setCenter(latLng);
	//setTimeout(function(){circle.setCenter(latLng)}, 300);
	setLocationCookie(lat, lng);
	//marker.setZIndex(2);
}
		
function newMarkerAndCircle(latLng, range) {
	marker = new google.maps.Marker({
		map:map,
		draggable:true,
		animation: google.maps.Animation.DROP,
		position: latLng,
		zIndex: 10
	});
	
	setTimeout(
		function (){
			circle = new google.maps.Circle({
				strokeColor: '#ff0000',
				strokeOpacity: 0.6,
				strokeWeight: 2,
				fillColor: '#ff0000',
				fillOpacity: 0.10,
				map: map,
				center: marker.getPosition(),
				radius: range	// 半径(m)
			});
			
			// info window
			infowindow = new google.maps.InfoWindow({
				content: "r " + document.getElementById('result').innerHTML
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
			infowindow.open(map,marker);

	
			// marker moved refresh
			google.maps.event.addListener(marker, 'dragend', function(){
				marker.setAnimation( google.maps.Animation.DROP );
				circle.setCenter(marker.getPosition());
				setLocationCookie(marker.getPosition().lat(), marker.getPosition().lng());
			});
			// Circle with Marker move 
			// circle.bindTo("center", marker, "position");
		}
		,1000
	);
	
	setLocationCookie(marker.getPosition().lat(), marker.getPosition().lng());
	
	/*
	// press & hold relocate marker
	if(window.TouchEvent){
		console.log("window.TouchEvent is true");
		google.maps.event.addListener(map, 'mousedown', function(e) {
			timerID = setTimeout(function(){ relocateMarker(e.latLng['A'], e.latLng['F']) }, 1000);
		});
		google.maps.event.addListener(map, 'mouseup', function() {
			clearTimeout(timerID);
		});
	} else {
		console.log("window.TouchEvent is false");
		google.maps.event.addListener(map, 'mousedown', function(e) {
			timerID = setTimeout(function(){ relocateMarker(e.latLng['A'], e.latLng['F']) }, 1000);
		});
		google.maps.event.addListener(map, 'mouseup', function() {
			clearTimeout(timerID);
		});
	}
	*/
	
}

function funcMapDropMarkerButton(controlDiv, map) {
	// add close button on map
	var controlUI = document.createElement('div');
	controlUI.id = 'map-marker-button-div';
	controlUI.title = 'drop marker';
	controlUI.innerText = '';
	controlDiv.appendChild(controlUI);

	if(window.TouchEvent){
		google.maps.event.addDomListener(controlUI, 'touchend', function(e) {
			relocateMarker(map.getCenter().lat(), map.getCenter().lng());
		} );
	} else {
		google.maps.event.addDomListener(controlUI, 'click', function(e) {
			relocateMarker(map.getCenter().lat(), map.getCenter().lng());
		} );
	}

}

function funcMapBackButton(controlDiv, map) {
	// add close button on map
	var controlUI = document.createElement('div');
	controlUI.id = 'map-close-button-div';
	controlUI.title = 'Click to calc board';
	controlUI.innerText = 'BACK';
	controlDiv.appendChild(controlUI);

	if(window.TouchEvent){
		google.maps.event.addDomListener(controlUI, 'touchend', mapClose);
	} else {
		google.maps.event.addDomListener(controlUI, 'click', mapClose);
	}

}

function funcMapCurrentLocationButton(controlDiv, map) {
	// add current position button on map
	var controlUI = document.createElement('div');
	controlUI.id = 'map-current-location-button-div';
	controlUI.title = 'Move current location.';
	//controlUI.innerText = '⦿';
	controlUI.innerHTML = '';
	controlDiv.appendChild(controlUI);

	if(window.TouchEvent){
		google.maps.event.addDomListener(
			controlUI, 'touchend', getCurrentLocation
		);
	} else {
		google.maps.event.addDomListener(
			controlUI, 'click', getCurrentLocation
		);
	}
}
				
function getCurrentLocation (){			
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position){
				var latLng = {};
				latLng['lat'] = position.coords.latitude;
				latLng['lng'] = position.coords.longitude;
				latLng['place'] = "current location";
				map.panTo(latLng);
				relocateMarker(latLng['lat'], latLng['lng']);
			}, 
			function(error){
				var err_msg = "";
				switch(error.code) {
					case 1:
						err_msg = "位置情報の利用が許可されていません";
						break;
					case 2:
						err_msg = "デバイスの位置が判定できません";
						break;
					case 3:
						err_msg = "タイムアウトしました";
						break;
				}
				alert(err_msg);
				
				getCookie();
				
				var latLng = {};					
				latLng = getDefaultLatLng();					

				map.panTo(latLng);
				relocateMarker(latLng['lat'], latLng['lng']);
			}
		);
	}
}

function getDefaultLatLng() {
	var latLng = {};					
	if ('lat' in cookieLatLng) 	{ 
		latLng['lat'] = Number(cookieLatLng['lat']);
		latLng['lng'] = Number(cookieLatLng['lng']);
		latLng['place'] = "cookieLatLng";
	} else {
		// default latLng Sakurajima
		latLng['lat'] = 31.588636;
		latLng['lng'] = 130.658511;
		latLng['place'] = "Sakurajima";
		
		// default latLng Koukyo@Tokyo
		latLng['lat'] = 35.685099;
		latLng['lng'] = 139.752803;
		latLng['place'] = "Koukyo@Tokyo";
		
		// debug
		latLng['lat'] = 31.0;
		latLng['lng'] = 0.0;
		latLng['place'] = "debug";
	}
	return latLng;
}
		
function getZoomLevel(range) {
	var zoomlevel = 7;
	if 		(range >= 5242880)	{ zoomlevel = 2 }
	else if (range >= 2621440) 	{ zoomlevel = 2 }
	else if (range >= 1310720) 	{ zoomlevel = 3 }
	else if (range >= 655360) 	{ zoomlevel = 4 }
	else if (range >= 327680) 	{ zoomlevel = 5 }
	else if (range >= 163840) 	{ zoomlevel = 6 }
	else if (range >= 81920) 	{ zoomlevel = 7 }
	else if (range >= 40960) 	{ zoomlevel = 8 }
	else if (range >= 20480) 	{ zoomlevel = 9 }
	else if (range >= 10240) 	{ zoomlevel = 10 }
	else if (range >= 5120) 	{ zoomlevel = 11 }
	else if (range >= 2560) 	{ zoomlevel = 12 }
	else if (range >= 1280) 	{ zoomlevel = 13 }
	else if (range >= 640) 		{ zoomlevel = 14 }
	else if (range >= 320) 		{ zoomlevel = 15 }
	else if (range >= 160) 		{ zoomlevel = 16 }
	else if (range >= 0) 		{ zoomlevel = 17 }
	return zoomlevel;
}

// mapオープン
function newMarkerOfMapOpen() {
	// 初回のみ
	if(marker == undefined) { setTimeout( function(){ newMarkerAndCircle(getDefaultLatLng(), amplifiedLinkRange_km*1000) }, 600) }
	
	// googleMap circle range change
	if (circle) {circle.setRadius(amplifiedLinkRange_km*1000)}
	// googleMap zoom change
	if (map) {map.setZoom(getZoomLevel(amplifiedLinkRange_km*1000))}
}
if(window.TouchEvent){
	AddEventListener('map-open-button-div', "touchend", newMarkerOfMapOpen);
} else {
	AddEventListener('map-open-button-div', "mouseup", newMarkerOfMapOpen);
}

var latLng = getDefaultLatLng();					
initialize(latLng['lat'], latLng['lng'], amplifiedLinkRange_km*1000); 


// map のセンタークロスを描画 + mapのresult位置を調整
window.addEventListener( "resize", function(){setCenterCross(getWindowCenter())}, false )
setCenterCross(getWindowCenter());

