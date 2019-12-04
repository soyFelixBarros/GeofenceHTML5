window.onload = function() {
  var startPos;
  var startPosLat;
  var startPosLong;
  var distance;
      
  if (navigator.geolocation) {
    //latitude, longitude
    var coordinates = [
      [-27.4552413,-58.9873352],
      [-27.4563524,-58.9873445],
      [-27.4564516,-58.9995527]
    ];

    navigator.geolocation.watchPosition(function(position) {
      $("#currentLat").text(position.coords.latitude);
      $("#currentLon").text(position.coords.longitude);
      
      coordinates.forEach(function(item, index, array) {
        distance = calculateDistance(item[0], item[1], position.coords.latitude, position.coords.longitude);
        let ul = $("#startLatLon");
        let className ='list-'+index;
        ul.find('li.'+className).remove(); // Eliminamos el li si existe
        ul.append('<li class="'+className+'">'+item[0]+', '+item[1]+'<br>Distancia: '+distance+' mts -> '+getMessage(distance)+'</li>'); // Agregamos el nuevo
      });
    });
  }
};

function getMessage(distance) {
  let message = '';
  if (distance > .00 && distance < .05) {
    message = 'está dentro de .00 y .05';
  }
  else if (distance > .05 && distance < .10) {
    message = 'está dentro de .05 y .10';
  }
  else if (distance > .10 && distance < .15) {
    message = 'está dentro de .10 y .15';
  }
  else if (distance > .15) {
    message = 'está muy lejos';
  }
  return message;
}
// Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
// http://www.movable-type.co.uk/scripts/latlong.html
// Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

Number.prototype.toRad = function() {
  return this * Math.PI / 180;
}
