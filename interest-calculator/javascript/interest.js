var datum = document.getElementById("geb"); //een variabele voor de datum-invoer
var bedrag = document.getElementById("bedrag"); // een variabele voor de bedrag-invoer
var rente = document.getElementById("rente"); // een variabele voor de rente-invoer
var button = document.getElementById("button"); // een variabele voor de knop
datum.onchange = datumUitkomst; // de weg naar de functie om de invoer te checken
bedrag.onchange = bedragUitkomst; // de weg naar de functie om de invoer te checken
rente.onchange = renteCheck; // de weg naar de functie om de invoer te checken
button.onclick = geefUitkomst; // de weg naar de functie om de rente over de loop der jaren te berekenen en laten zien
var waarde = 0; // een variabele gebruikt in de bereken-functie om een waarde terug te geven aan de geefUitkomst functie

// de functie die als uitkomst op het scherm de ontwikkeling van het ingevoerde bedrag laat zien met rente
function geefUitkomst () { 
	bedrag = parseFloat(bedrag.value);
	rente = parseFloat(rente.value);
	waarde = bedrag;
	var i = new Date().getFullYear();
	var output = "in het jaar\xa0\xa0" + "is uw nieuwe bedrag<br>" + i + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\u20ac " + bedrag.toFixed(2) + "<br>";
	while(waarde < (bedrag * 2)) {
		i++;
		output += i + "  " + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\u20ac " + bereken(rente) + "<br>";
	}
	document.getElementById("uitkomst").innerHTML += output;
}
//de functie die de toename van het ingevoerde bedrag berekent en teruggeeft aan geefUitkomst
function bereken (a) {  
	waarde += (waarde * a/100);
	return waarde.toFixed(2);
}
//de functie die de rente-invoer checkt
function renteCheck() { 
	var r = +rente.value;
	if (checkBed(r) == false || r <= 0) {
		alert("u kunt enkel getallen (groter dan 0) gebruiken, probeer het a.u.b. opnieuw");
		rente.value = null;
		return;
	}
	else {
		document.getElementById("check3").innerHTML = "&#37; check OK!";
	}
}
//de functie die de bedrag-invoer checkt
function bedragUitkomst() { 
	var b = +bedrag.value; 
	if (checkBed(b) == false || b <= 0) { // de check op b <= 0 is om met centen te kunnen rekenen en wel een invoer van 0 als 1e te accepteren.
		alert("U kunt enkel bedragen groter dan 0 gebruiken. Gebruik voor centen a.u.b. een punt om te scheiden.");
		bedrag.value = null;
		return;
	}
	else {
		document.getElementById("check2").innerHTML = " check OK!";
	}
}
//de functie die de datum-invoer checkt
function datumUitkomst() { 
	var d = datum.value;
	if (checkDat(d) == false) {
		alert("u hebt een ongeldige datum-format gebruikt, probeer het a.u.b. opnieuw");
		datum.value = "";
		return;
	}
	else if (logischeDatum(d) == false) {
		alert("u hebt een onmogelijke geboortedatum gebruikt, probeer het a.u.b. opnieuw");
		datum.value = "";
		return;
	}
	else {
	  document.getElementById("check").innerHTML = " check OK!";
	}
}
//de functie die checkt of er een 'mogelijke' geboortedatum ingevoerd is
function logischeDatum(datum) { 
  var checkdat2 = datum.split(/-/);
  var dag = checkdat2[0];
  var maand = checkdat2[1];
  var jaar = checkdat2[2];
  
  if (jaar < 1900 || jaar > 2013) {
	return false;
  }
  if (maand < 1 || maand > 12) {
	return false;
  }
  if (dag < 1 || dag > 31) {
	return false;
  }
  switch(+maand) {
	case 2: if (dag > 29) {
				return false;
			}
			break;
  case 4:
  case 6:
	case 9:
	case 11: if (dag > 30) {
				return false;
			}
			break;
	}
	return true;
}
//de functie met de format-check van de ingevoerde datum
function checkDat(datum) { 
	var checkdat = /^\d{2}-\d{2}-\d{4}$/;
	return checkdat.test(datum);
}
// de functie met de format-check van het ingevoerde bedrag en de ingevoerde rente
// hierbij heb ik bewust de check op een 0 als eerste bedrag niet meegenomen om ook een bedrag in centen te kunnen laten rekenen
function checkBed(bedrag) { 
	var checkbed = /^\d+/;
	return checkbed.test(bedrag);
}
// de reset button!
knop2.onclick = function() { window.location.href = window.location.href;
};

