//declarar un array que nos indique los asientos con false cuando están vacíos
//ocupados = true.
var airlineSeats = [false, false, false, false, false, false, false, false, false, false];

//contador que nos ayudará a rastrear el número de asientos ocupados.
var busySeats = 0;

var paintSeats = function(array) {
  var containerSeats = document.getElementById("seats");

  for (var i = 0; i < array.length; i++) {
    var seat = document.createElement("div");
    seat.className = 'seats';

    //del primer elemento al cuarto nuestro array va a ser primera clase
    if (i < 4) {
      seat.style.backgroundColor = "purple";
    } else {
      seat.style.backgroundColor = "yellow";
    }
    containerSeats.appendChild(seat);
  }
};

var reserve = function() {
  var btn = document.getElementById('btn');
  btn.addEventListener('click', chooseZone);
};

var chooseZone = function() {
  var choice = prompt(
    "¿En qué zona prefieres reservar? \n 1. Primera Clase \n 2. Clase Económica. \n \n Por favor ingresa el número de preferencia");

  if (choice == 1) {
    checkFirstClassZone();
  } else if (choice == 2) {
    checkEconomicZone();
  } else {
    alert("Por favor ingresa un número válido");
  }
};

var checkFirstClassZone = function() {
  var zone = 'Primera Clase';
  //recorre del elemento 0 al elemento 3 y verifica cuales están disponiblels.
  for (var index = 0; index < 4; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeats(index);
      paintTickets(index, zone);
      busySeats++;
      ////Al reservar un asiento no necesitamos seguir recorriendo nuestro arreglo
      break;
    } else if (index == 3 && airlineSeats[index] == true) {
      reasignEconomicZone();
    }
  }
};

var checkEconomicZone = function() {
  var zone = 'Clase Económica';
  //recorre del elemento 4 al 10 y verifica la disponibilidad.
  for (var index = 4; index < 10; index++) {
    if (airlineSeats[index] == false) {
      airlineSeats[index] = true;
      reserveSeats(index);
      paintTickets(index, zone);
      busySeats++;
      //Al reservar un asiento no necesitamos seguir recorriendo nuestro arreglo
      break;
    } else if (index == 9 && airlineSeats[index] == true) {
      reasignFirstClassZone();
    }
  }

};

var reserveSeats = function(indexToPaint) {
  var seats = document.getElementsByClassName("seats");
  seats[indexToPaint].textContent = "Ocupado";
};

var reasignEconomicZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm('Ya no quedan asientos disponibles en Primera Clase :( \n  ¿Quieres reservar en Clase Económica?')
    if (reasign == true) {
      checkEconomicZone();
    } else {
      nextFlight();
    }
  }
};

var reasignFirstClassZone = function(zone) {
  if (busySeats == 10) {
    noSeats();
    nextFlight();
  } else {
    var reasign = confirm('Ya no quedan asientos disponibles en Clase Económica :( \n  ¿Quieres reservar en Primera Clase?')
    if (reasign == true) {
      checkFirstClassZone();
    } else {
      nextFlight();
    }
  }
};

var paintTickets = function(index, zone) {
  var containerTickets = document.getElementById("tickets");
  var ticket = document.createElement("div");
  ticket.className = "seats";
  var title = document.createElement("p");
  var reserverSeating = document.createElement("p");
  var zoneClass = document.createElement("p");
  title.textContent = "PASE DE ABORDAR";
  reserverSeating.textContent = "Número de asiento " + (index + 1);
  zoneClass.textContent = zone;
  ticket.appendChild(title);
  ticket.appendChild(reserverSeating);
  ticket.appendChild(zoneClass);
  containerTickets.appendChild(ticket);
};

var nextFlight = function() {
  alert("Nuestro próximo vuelo sale en tres horas.")
};

var noSeats = function(){
  alert("Lo sentimos, ya no quedan asientos disponibles en este avión");
};

paintSeats(airlineSeats);
reserve();
