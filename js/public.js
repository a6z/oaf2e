/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */
function inherits(e,t){function i(){}i.prototype=t.prototype,e.superClass_=t.prototype,e.prototype=new i,e.prototype.constructor=e}function MarkerLabel_(e,t,i){this.marker_=e,this.handCursorURL_=e.handCursorURL,this.labelDiv_=document.createElement("div"),this.labelDiv_.style.cssText="position: absolute; overflow: hidden;",this.eventDiv_=document.createElement("div"),this.eventDiv_.style.cssText=this.labelDiv_.style.cssText,this.eventDiv_.setAttribute("onselectstart","return false;"),this.eventDiv_.setAttribute("ondragstart","return false;"),this.crossDiv_=MarkerLabel_.getSharedCross(t)}function MarkerWithLabel(e){e=e||{},e.labelContent=e.labelContent||"",e.initCallback=e.initCallback||function(){},e.labelAnchor=e.labelAnchor||new google.maps.Point(0,0),e.labelClass=e.labelClass||"markerLabels",e.labelStyle=e.labelStyle||{},e.labelInBackground=e.labelInBackground||!1,"undefined"==typeof e.labelVisible&&(e.labelVisible=!0),"undefined"==typeof e.raiseOnDrag&&(e.raiseOnDrag=!0),"undefined"==typeof e.clickable&&(e.clickable=!0),"undefined"==typeof e.draggable&&(e.draggable=!1),"undefined"==typeof e.optimized&&(e.optimized=!1),e.crossImage=e.crossImage||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png",e.handCursor=e.handCursor||"http"+("https:"===document.location.protocol?"s":"")+"://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur",e.optimized=!1,this.label=new MarkerLabel_(this,e.crossImage,e.handCursor),google.maps.Marker.apply(this,arguments)}inherits(MarkerLabel_,google.maps.OverlayView),MarkerLabel_.getSharedCross=function(e){var t;return"undefined"==typeof MarkerLabel_.getSharedCross.crossDiv&&(t=document.createElement("img"),t.style.cssText="position: absolute; z-index: 1000002; display: none;",t.style.marginLeft="-8px",t.style.marginTop="-9px",t.src=e,MarkerLabel_.getSharedCross.crossDiv=t),MarkerLabel_.getSharedCross.crossDiv},MarkerLabel_.prototype.onAdd=function(){var e,t,i,s,a,r,o,n=this,l=!1,g=!1,p=20,_="url("+this.handCursorURL_+")",v=function(e){e.preventDefault&&e.preventDefault(),e.cancelBubble=!0,e.stopPropagation&&e.stopPropagation()},h=function(){n.marker_.setAnimation(null)};this.getPanes().overlayImage.appendChild(this.labelDiv_),this.getPanes().overlayMouseTarget.appendChild(this.eventDiv_),"undefined"==typeof MarkerLabel_.getSharedCross.processed&&(this.getPanes().overlayImage.appendChild(this.crossDiv_),MarkerLabel_.getSharedCross.processed=!0),this.listeners_=[google.maps.event.addDomListener(this.eventDiv_,"mouseover",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(this.style.cursor="pointer",google.maps.event.trigger(n.marker_,"mouseover",e))}),google.maps.event.addDomListener(this.eventDiv_,"mouseout",function(e){!n.marker_.getDraggable()&&!n.marker_.getClickable()||g||(this.style.cursor=n.marker_.getCursor(),google.maps.event.trigger(n.marker_,"mouseout",e))}),google.maps.event.addDomListener(this.eventDiv_,"mousedown",function(e){g=!1,n.marker_.getDraggable()&&(l=!0,this.style.cursor=_),(n.marker_.getDraggable()||n.marker_.getClickable())&&(google.maps.event.trigger(n.marker_,"mousedown",e),v(e))}),google.maps.event.addDomListener(document,"mouseup",function(t){var i;if(l&&(l=!1,n.eventDiv_.style.cursor="pointer",google.maps.event.trigger(n.marker_,"mouseup",t)),g){if(a){i=n.getProjection().fromLatLngToDivPixel(n.marker_.getPosition()),i.y+=p,n.marker_.setPosition(n.getProjection().fromDivPixelToLatLng(i));try{n.marker_.setAnimation(google.maps.Animation.BOUNCE),setTimeout(h,1406)}catch(r){}}n.crossDiv_.style.display="none",n.marker_.setZIndex(e),s=!0,g=!1,t.latLng=n.marker_.getPosition(),google.maps.event.trigger(n.marker_,"dragend",t)}}),google.maps.event.addListener(n.marker_.getMap(),"mousemove",function(s){var _;l&&(g?(s.latLng=new google.maps.LatLng(s.latLng.lat()-t,s.latLng.lng()-i),_=n.getProjection().fromLatLngToDivPixel(s.latLng),a&&(n.crossDiv_.style.left=_.x+"px",n.crossDiv_.style.top=_.y+"px",n.crossDiv_.style.display="",_.y-=p),n.marker_.setPosition(n.getProjection().fromDivPixelToLatLng(_)),a&&(n.eventDiv_.style.top=_.y+p+"px"),google.maps.event.trigger(n.marker_,"drag",s)):(t=s.latLng.lat()-n.marker_.getPosition().lat(),i=s.latLng.lng()-n.marker_.getPosition().lng(),e=n.marker_.getZIndex(),r=n.marker_.getPosition(),o=n.marker_.getMap().getCenter(),a=n.marker_.get("raiseOnDrag"),g=!0,n.marker_.setZIndex(1e6),s.latLng=n.marker_.getPosition(),google.maps.event.trigger(n.marker_,"dragstart",s)))}),google.maps.event.addDomListener(document,"keydown",function(e){g&&27===e.keyCode&&(a=!1,n.marker_.setPosition(r),n.marker_.getMap().setCenter(o),google.maps.event.trigger(document,"mouseup",e))}),google.maps.event.addDomListener(this.eventDiv_,"click",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(s?s=!1:(google.maps.event.trigger(n.marker_,"click",e),v(e)))}),google.maps.event.addDomListener(this.eventDiv_,"dblclick",function(e){(n.marker_.getDraggable()||n.marker_.getClickable())&&(google.maps.event.trigger(n.marker_,"dblclick",e),v(e))}),google.maps.event.addListener(this.marker_,"dragstart",function(e){g||(a=this.get("raiseOnDrag"))}),google.maps.event.addListener(this.marker_,"drag",function(e){g||a&&(n.setPosition(p),n.labelDiv_.style.zIndex=1e6+(this.get("labelInBackground")?-1:1))}),google.maps.event.addListener(this.marker_,"dragend",function(e){g||a&&n.setPosition(0)}),google.maps.event.addListener(this.marker_,"position_changed",function(){n.setPosition()}),google.maps.event.addListener(this.marker_,"zindex_changed",function(){n.setZIndex()}),google.maps.event.addListener(this.marker_,"visible_changed",function(){n.setVisible()}),google.maps.event.addListener(this.marker_,"labelvisible_changed",function(){n.setVisible()}),google.maps.event.addListener(this.marker_,"title_changed",function(){n.setTitle()}),google.maps.event.addListener(this.marker_,"labelcontent_changed",function(){n.setContent()}),google.maps.event.addListener(this.marker_,"labelanchor_changed",function(){n.setAnchor()}),google.maps.event.addListener(this.marker_,"labelclass_changed",function(){n.setStyles()}),google.maps.event.addListener(this.marker_,"labelstyle_changed",function(){n.setStyles()})]},MarkerLabel_.prototype.onRemove=function(){var e;for(this.labelDiv_.parentNode.removeChild(this.labelDiv_),this.eventDiv_.parentNode.removeChild(this.eventDiv_),e=0;e<this.listeners_.length;e++)google.maps.event.removeListener(this.listeners_[e])},MarkerLabel_.prototype.draw=function(){this.setContent(),this.setTitle(),this.setStyles()},MarkerLabel_.prototype.setContent=function(){var e=this.marker_.get("labelContent");"undefined"==typeof e.nodeType?(this.labelDiv_.innerHTML=e,this.eventDiv_.innerHTML=this.labelDiv_.innerHTML):(this.labelDiv_.innerHTML="",this.labelDiv_.appendChild(e),e=e.cloneNode(!0),this.eventDiv_.innerHTML="",this.eventDiv_.appendChild(e))},MarkerLabel_.prototype.setTitle=function(){this.eventDiv_.title=this.marker_.getTitle()||""},MarkerLabel_.prototype.setStyles=function(){var e,t;this.labelDiv_.className=this.marker_.get("labelClass"),this.eventDiv_.className=this.labelDiv_.className,this.labelDiv_.style.cssText="",this.eventDiv_.style.cssText="",t=this.marker_.get("labelStyle");for(e in t)t.hasOwnProperty(e)&&(this.labelDiv_.style[e]=t[e],this.eventDiv_.style[e]=t[e]);this.setMandatoryStyles()},MarkerLabel_.prototype.setMandatoryStyles=function(){this.labelDiv_.style.position="absolute",this.labelDiv_.style.overflow="","undefined"!=typeof this.labelDiv_.style.opacity&&""!==this.labelDiv_.style.opacity&&(this.labelDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity='+100*this.labelDiv_.style.opacity+')"',this.labelDiv_.style.filter="alpha(opacity="+100*this.labelDiv_.style.opacity+")"),this.eventDiv_.style.position=this.labelDiv_.style.position,this.eventDiv_.style.overflow=this.labelDiv_.style.overflow,this.eventDiv_.style.opacity=.01,this.eventDiv_.style.MsFilter='"progid:DXImageTransform.Microsoft.Alpha(opacity=1)"',this.eventDiv_.style.filter="alpha(opacity=1)",this.setAnchor(),this.setPosition(),this.setVisible()},MarkerLabel_.prototype.setAnchor=function(){var e=this.marker_.get("labelAnchor");this.labelDiv_.style.marginLeft=-e.x+"px",this.labelDiv_.style.marginTop=-e.y+"px",this.eventDiv_.style.marginLeft=-e.x+"px",this.eventDiv_.style.marginTop=-e.y+"px"},MarkerLabel_.prototype.setPosition=function(e){var t=this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());"undefined"==typeof e&&(e=0),this.labelDiv_.style.left=Math.round(t.x)+"px",this.labelDiv_.style.top=Math.round(t.y-e)+"px",this.eventDiv_.style.left=this.labelDiv_.style.left,this.eventDiv_.style.top=this.labelDiv_.style.top,this.setZIndex()},MarkerLabel_.prototype.setZIndex=function(){var e=this.marker_.get("labelInBackground")?-1:1;"undefined"==typeof this.marker_.getZIndex()?(this.labelDiv_.style.zIndex=parseInt(this.labelDiv_.style.top,10)+e,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex):(this.labelDiv_.style.zIndex=this.marker_.getZIndex()+e,this.eventDiv_.style.zIndex=this.labelDiv_.style.zIndex)},MarkerLabel_.prototype.setVisible=function(){this.marker_.get("labelVisible")?this.labelDiv_.style.display=this.marker_.getVisible()?"block":"none":this.labelDiv_.style.display="none",this.eventDiv_.style.display=this.labelDiv_.style.display;var e=this.marker_.get("initCallback");e(this.labelDiv_)},inherits(MarkerWithLabel,google.maps.Marker),MarkerWithLabel.prototype.setMap=function(e){google.maps.Marker.prototype.setMap.apply(this,arguments),this.label.setMap(e)};

Array.prototype.column = function (k) { return this.map (function (t) { return k ? eval ("t." + k) : t; }); };
Array.prototype.diff = function (a, k) { return this.filter (function (i) { return a.column (k).indexOf (eval ("i." + k)) < 0; }); };
Array.prototype.max = function (k) { return Math.max.apply (null, this.column (k)); };
Array.prototype.min = function (k) { return Math.min.apply (null, this.column (k)); };

function getStorage (key) { return ((typeof (Storage) !== 'undefined') && (value = localStorage.getItem (key)) && (value = JSON.parse (value))) ? value : undefined; }
function setStorage (key, data) { if (typeof (Storage) !== 'undefined') { localStorage.setItem (key, JSON.stringify (data)); return true; } return false; }

$(function () {
  window.vars = {};
  window.vars.isLoad = false;
  window.vars.points = [];
  window.vars.timer = 1 * 1000;
  window.vars.Q = [];
  window.vars.$maps = $('#maps');
  window.vars.$mapMenu = $('#map_menu');
  window.vars.$markerMenu = $('#marker_menu');
  window.vars.$polylineMenu = $('#polyline_menu');
  window.vars.$length = $('#length');
  window.vars.$move = $('#move');
  window.vars.$speed = $('#speed');

  window.vars.marker = null;

  window.storages = {};
  window.storages.lastMaps = {
    storageKey: 'pokemon.last.maps',
    get: function () {
      var last = getStorage (this.storageKey);

      var zoom = last && last.zoom && !isNaN (last.zoom) ? last.zoom : 12;
      var lat  = last && last.lat &&  !isNaN (last.lat)  ? last.lat :  25.056678157775092;
      var lng  = last && last.lng &&  !isNaN (last.lng)  ? last.lng :  121.53488159179688;
    
      return {
        zoom: zoom,
        lat: lat,
        lng: lng,
      };
    },
    set: function (key, val) {
      var last = this.get ();
      if (!isNaN (val)) last[key] = val;
      setStorage (this.storageKey, last);
      return this;
    }
  };
  window.storages.lastMarker = {
    storageKey: 'pokemon.last.marker',
    get: function () {
      var last = getStorage (this.storageKey);

      var lat  = last && last.lat &&  !isNaN (last.lat)  ? last.lat :  25.056678157775092;
      var lng  = last && last.lng &&  !isNaN (last.lng)  ? last.lng :  121.53488159179688;
    
      return {
        lat: lat,
        lng: lng,
      };
    },
    set: function (key, val) {
      var last = this.get ();
      if (!isNaN (val)) last[key] = val;
      setStorage (this.storageKey, last);
      return this;
    }
  };

  window.funs = {};
  window.funs.ajaxError = function (result) { console.error (result.responseText); };
  window.funs.setLocation = function (latLng) {
    if (window.vars.isLoad) return false;
    window.vars.isLoad = true;

    $.ajax ({
      url: 'set.php',
      data: {
        lat: latLng.lat (),
        lng: latLng.lng ()
      },
      async: true, cache: false, dataType: 'json', type: 'post',
      beforeSend: function () {
        window.vars.isLoad = true;
      }
    })
    .done (function (result) {
      window.vars.isLoad = false;
      window.storages.lastMarker.set ('lat', latLng.lat ())
                                .set ('lng', latLng.lng ());
    }.bind (this))
    .fail (function (result) { window.funs.ajaxError (result); })
    .complete (function (result) {
      window.vars.isLoad = false;
    });
  }

  window.funs.getPixelPosition = function (obj) {
    var scale = Math.pow (2, obj.map.getZoom ());
    var nw = new google.maps.LatLng (
        obj.map.getBounds ().getNorthEast ().lat (),
        obj.map.getBounds ().getSouthWest ().lng ()
    );
    var worldCoordinateNW = obj.map.getProjection ().fromLatLngToPoint (nw);
    var worldCoordinate = obj.map.getProjection ().fromLatLngToPoint (obj.getPosition ());
    
    return new google.maps.Point (
        (worldCoordinate.x - worldCoordinateNW.x) * scale,
        (worldCoordinate.y - worldCoordinateNW.y) * scale
    );
  };

  window.funs.circlePath = function (r) {
    return 'M 0 0 m -' + r + ', 0 '+
           'a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 ' +
           'a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
  }

  window.funs.drawPath = function (polyline) {
    var prevPosition = polyline.prevMarker.getPosition ();
    var nextPosition = polyline.nextMarker.getPosition ();
    polyline.setPath ([prevPosition, nextPosition]);

    if (!polyline.hasPath && (polyline.prevMarker != polyline.nextMarker)) {
      polyline.hasPath = true;
      
      var m = window.funs.calculate ([prevPosition, nextPosition]);
      
      var unt = m / 3;
      var lat = (prevPosition.lat () - nextPosition.lat ()) / unt;
      var lng = (prevPosition.lng () - nextPosition.lng ()) / unt;

      for (var i = 0; i < unt; i++) {
        if (i == 0)
          window.vars.Q.push (polyline.nextMarker);
        else if (i == unt - 1)
          window.vars.Q.push (polyline.prevMarker);
        else 
          window.vars.Q.push (new google.maps.Marker ({map: window.vars.maps, draggable: true, position: new google.maps.LatLng (nextPosition.lat () + lat * i+ (Math.random () / 99999) * (Math.random () > 0.5 ? 1 : -1), nextPosition.lng () + lng * i+ (Math.random () / 99999) * (Math.random () > 0.5 ? 1 : -1)), icon: {path: window.funs.circlePath (5), strokeColor: 'rgba(247, 92, 79, .4)', strokeWeight: 1, fillColor: 'rgba(247, 92, 79, .95)', fillOpacity: 0.5}}));
      };
    }
    
  }

  window.funs.fromLatLngToPoint = function (map, latLng) {
    var scale = Math.pow (2, map.getZoom ());
    var topRight = map.getProjection ().fromLatLngToPoint (map.getBounds ().getNorthEast ());
    var bottomLeft = map.getProjection ().fromLatLngToPoint (map.getBounds ().getSouthWest ());
    var worldPoint = map.getProjection ().fromLatLngToPoint (latLng);
    return new google.maps.Point ((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
  }

  window.funs.formatFloat = function (num, pos) {
    var size = Math.pow (10, pos);
    return Math.round (num * size) / size;
  }
  window.funs.calculate = function (points) {
    if (google.maps.geometry.spherical)
      return google.maps.geometry.spherical.computeLength (points);
    return 0;
  }
  window.funs.calculateLength = function (points) {
    window.vars.$length.html (window.funs.formatFloat (window.funs.calculate (points) / 1000, 2));
  }
  window.funs.setPolyline = function () {
    for (var i = 0; i < window.vars.points.length; i++) {
      if (!window.vars.points[i].polyline) {
        var polyline = new google.maps.Polyline ({
          map: window.vars.maps,
          strokeColor: 'rgba(68, 77, 145, .6)',
          strokeWeight: 4,
          prevMarker: null,
          nextMarker: null,
        });

        polyline.addListener ('rightclick', function (e) {
          var point = window.funs.fromLatLngToPoint (window.vars.maps, e.latLng);

          window.vars.$polylineMenu.css ({ top: point.y, left: point.x })
                       .data ('lat', e.latLng.lat ())
                       .data ('lng', e.latLng.lng ())
                       .addClass ('show').get (0).polyline = polyline;
                              
        });
        window.vars.points[i].polyline = polyline;

      }
      
      window.vars.points[i].polyline.prevMarker = window.vars.points[i - 1] ? window.vars.points[i - 1] : window.vars.points[i];
      window.vars.points[i].polyline.nextMarker = window.vars.points[i];
      
      window.funs.drawPath (window.vars.points[i].polyline);
    }

    if (window.vars.points.length > 1) window.funs.calculateLength (window.vars.Q.map (function (t) { return t.getPosition (); }));
  }
  window.funs.initMarker = function (position, index) {
    var marker = new google.maps.Marker ({
        map: window.vars.maps,
        draggable: true,
        position: position,
        icon: {
            path: window.funs.circlePath (5),
            strokeColor: 'rgba(50, 60, 140, .4)',
            strokeWeight: 1,
            fillColor: 'rgba(68, 77, 145, .95)',
            fillOpacity: 0.5
          },
        polyline: null
      });

    google.maps.event.addListener (marker, 'drag', window.funs.setPolyline);

    // marker.addListener ('rightclick', function (e) {
    //   var pixel = window.funs.getPixelPosition (this);
    //   window.vars.$markerMenu.css ({ top: pixel.y, left: pixel.x }).addClass ('show').get (0).marker = marker;
    // });
    
    window.vars.points.splice (index > -1 ? index : window.vars.points.length, 0, marker);
    
    window.funs.setPolyline ();
  }

  

  google.maps.event.addDomListener (window, 'load', function () {

    var lastMaps = window.storages.lastMaps.get ();
    var lastMarker = window.storages.lastMarker.get ();
    window.vars.maps = new google.maps.Map (window.vars.$maps.get (0), {
      zoom: lastMaps.zoom, zoomControl: true, scrollwheel: true, scaleControl: true, mapTypeControl: false, navigationControl: true, streetViewControl: false, disableDoubleClickZoom: true,
      center: new google.maps.LatLng (lastMaps.lat, lastMaps.lng)}
      );

    window.vars.maps.mapTypes.set ('map_style', new google.maps.StyledMapType ([
      // {stylers: [{gamma: 0}, {weight: 1}] },
      {featureType: 'all', stylers: [{ visibility: 'on' }]},
      {featureType: 'administrative', stylers: [{ visibility: 'simplified' }]},
      {featureType: 'landscape', stylers: [{ visibility: 'simplified' }]},
      {featureType: 'poi', stylers: [{ visibility: 'simplified' }]},
      {featureType: 'road', stylers: [{ visibility: 'simplified' }]},
      {featureType: 'road.arterial', stylers: [{ visibility: 'simplified' }]},
      {featureType: 'transit', stylers: [{ visibility: 'simplified' }]},
      {featureType: 'water', stylers: [{ color: '#b3d1ff', visibility: 'simplified' }]},
      {elementType: "labels.icon", stylers:[{ visibility: 'off' }]}
      ]));
    window.vars.maps.setMapTypeId ('map_style');
    window.vars.marker = new MarkerWithLabel ({
      map: window.vars.maps,
      position: new google.maps.LatLng (lastMarker.lat, lastMarker.lng),
      draggable: true,
      raiseOnDrag: false,
      clickable: true,
      // labelContent: '1',
      // labelAnchor: new google.maps.Point (120 / 2, 140 - 25),
      // labelClass: "weather",
      // icon: {path: 'M 0 0'},
    });

    google.maps.event.addListener (window.vars.maps, 'idle', function () {
      window.storages.lastMaps.set ('zoom', window.vars.maps.zoom)
                          .set ('lat', window.vars.maps.center.lat ())
                          .set ('lng', window.vars.maps.center.lng ());
    });
    google.maps.event.addListener (window.vars.maps, 'dblclick', function (e) {
      window.vars.marker.setPosition (e.latLng)
      window.funs.setLocation (e.latLng);
    });

    google.maps.event.addListener (window.vars.maps, 'rightclick', function (e) {
      window.vars.$mapMenu.css ({ top: e.pixel.y, left: e.pixel.x })
              .data ('lat', e.latLng.lat ())
              .data ('lng', e.latLng.lng ()).addClass ('show');
    });

    google.maps.event.addListener (window.vars.maps, 'mousemove', function () {
      window.vars.$mapMenu.css ({ top: -100, left: -100 }).removeClass ('show');
      window.vars.$markerMenu.css ({ top: -100, left: -100 }).removeClass ('show');
      window.vars.$polylineMenu.css ({ top: -100, left: -100 }).removeClass ('show');
    });

    window.vars.$mapMenu.find ('.add_marker').click (function () {
      window.funs.initMarker (new google.maps.LatLng (window.vars.$mapMenu.data ('lat'), window.vars.$mapMenu.data ('lng')), 0);
      window.vars.$mapMenu.css ({ top: -100, left: -100 }).removeClass ('show');
    });

    window.vars.$markerMenu.find ('.del').click (function () {
      window.vars.points.splice (window.vars.points.indexOf (window.vars.$markerMenu.get (0).marker), 1);
      if (window.vars.$markerMenu.get (0).marker.polyline) window.vars.$markerMenu.get (0).marker.polyline.setMap (null);
      window.vars.$markerMenu.get (0).marker.setMap (null);
      
      window.funs.setPolyline ();
      window.vars.$markerMenu.css ({ top: -100, left: -100 }).removeClass ('show');
    });

    window.vars.$polylineMenu.find ('.add').click (function () {
      if (window.vars.$polylineMenu.get (0).polyline)
        window.funs.initMarker (new google.maps.LatLng (window.vars.$polylineMenu.data ('lat'), window.vars.$polylineMenu.data ('lng')), window.vars.points.indexOf (window.vars.$polylineMenu.get (0).polyline.nextMarker));

      window.vars.$polylineMenu.css ({ top: -100, left: -100 }).removeClass ('show');
    });

    google.maps.event.addListener (window.vars.marker, 'dragend', function (e) {
      window.funs.setLocation (e.latLng);
    });

    setInterval (function () {
      var move = window.vars.$move.find ('input').prop ('checked');
      var lastLatLng = window.vars.marker.position;
      var latLng = window.vars.marker.position;

      if (move && window.vars.Q.length) {
        var pop = window.vars.Q.shift ();
        latLng = pop.getPosition ();
        if (pop.polyline) pop.polyline.setMap (null);
        pop.setMap (null);
        window.funs.calculateLength (window.vars.Q.map (function (t) { return t.getPosition (); }));
      } else {
        var lat = latLng.lat () + (Math.random () / 99999) * (Math.random () > 0.5 ? 1 : -1);
        var lng = latLng.lng () + (Math.random () / 99999) * (Math.random () > 0.5 ? 1 : -1);
        latLng = new google.maps.LatLng (lat, lng);
      }
      window.vars.marker.setPosition (latLng); 
      window.funs.setLocation (latLng);
      window.vars.$speed.text (window.funs.formatFloat ((window.funs.calculate ([lastLatLng, latLng]) / (window.vars.timer / 1000)) / 0.27, 2));
    }, window.vars.timer);

// window.vars.$speed

  });
});