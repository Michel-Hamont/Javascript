var vnaam = document.getElementById("vnaam"); // de variabele voor de ingvoerde voornaam
var anaam =  document.getElementById("anaam"); // de variabele voor de ingvoerde achternaam
var punten =  document.getElementById("punten"); // de variabele voor de ingvoerde punten
var tabel = document.getElementById("tabel"); // de variabele voor de opgehaalde tabel
var button =  document.getElementById("button"); // de variabele voor de 'deelnemers'-knop
var button2 =  document.getElementById("button2"); // de variabele voor de 'kolom toevoeg'-knop
var button3 = document.getElementById("button3"); // de variabele voor de 'verwijder een rijnummer'-knop
var rijnummer = document.getElementById("rijnummer"); // de variabele voor het ingevoerde rijnummer om te verwijderen
button.onclick = controleerInvoer; // de weg naar de functie voor button1
button2.onclick = maakKolom; // de weg naar de functie voor button2
button3.onclick = verwijderRij; // de weg naar de functie voor button3

// de functie om een rij te verwijderen
function verwijderRij() {
  tabel = document.getElementById("tabel"); 
  rijnummer = +document.getElementById("rijnummer").value; // de variabele rijnummer meermaals kunnen ophalen voor gebruik
  var rijen = tabel.rows;
  if (rijnummer < rijen.length && rijnummer > 0) { // als de rij bestaat kan de rij weggehaald worden
    tabel.deleteRow(rijnummer);
    maakKolom(); // deze functie zet de rijnummers gelijk weer goed
    return;
  }
  else {
    alert("die rij komt niet voor, dus die kunt u ook niet weghalen");
    rijnummer.focus();
    return;
  }
}
// de functie om een kolom toe te voegen met rijnummers (en ook gelijk om de rijnummers te herschikken bij verwijderen van een rij)
function maakKolom() {
    var tKop = tabel.tHead;
    var rijen = tabel.rows;
    var newTh;
    for (var i = 0; i < tKop.rows.length; i++) { // de tabel is opgesplitst in een thead en een tbody, daarom ook gesplitste invoer van een nieuwe kolom
      if (rijen[i].cells.length <= 3) { // om te zorgen dat er maar 1 keer een kolom met rijnummers kan worden toegevoegd, deze if
        newTh = document.createElement("th"); // een nieuw gecreëerde <th>
        tKop.rows[i].insertBefore(newTh, tKop.rows[i].firstChild); //de nieuwe <th> aan het begin plaatsen
        newTh.innerHTML = "Rijnummer";
      }
      else {
        deleteKolom2(); // als het aantal kolommen groter is dan 3, dan wordt deze functie eerst aangeroepen en vervangt de nieuwe kolom de oude
        newTh = document.createElement("th");
        tKop.rows[i].insertBefore(newTh, tKop.rows[i].firstChild);
        newTh.innerHTML = "Rijnummer";
      }
    }
  
    var tBody = tabel.tBodies[0]; // het invoegen van de kolomcellen in de <tbody> kan met insertCell
    for (var j = 0; j < tBody.rows.length; j++) {
      var newCell = tBody.rows[j].insertCell(0);
      newCell.innerHTML = j + 1;
    }
}
// functie om te zorgen dat de rijnummers goed blijven gaan bij toevoeging van een nieuwe deelnemer als er al rijnummers staan (dan vervangt kolom[0] de opgeschoven kolom[1])
function deleteKolom() {
	var rijen = tabel.rows;
	for (var i = 0; i < rijen.length; i++) {
		if (rijen[i].cells.length > 4) {
			rijen[i].deleteCell(1);
		}
	}
}
// functie die ervoor zorgt dat (voor het oog) de knop om een kolom met rijnummers toe te voegen, maar 1x gebruikt kan worden (kolom[0] vervangt kolom[0])
function deleteKolom2() {
	var rijen = tabel.rows;
	for (var i = 0; i < rijen.length; i++) {
		if (rijen[i].cells.length === 4) {
			rijen[i].deleteCell(0);
		}
	}
}
// functie om de invoer te controleren op juiste invoer, en als alles goed ingevoerd is, de functies aanroept die de waarden toevoegen aan de tabel
function controleerInvoer() {
  if (vnaam.value === "") {
    alert("de met * aangemerkte velden zijn verplicht om in te voeren om het script te kunnen laten werken.");
    vnaam.focus();
    return;
  }
  if (anaam.value === "") {
    alert("de met * aangemerkte velden zijn verplicht om in te voeren om het script te kunnen laten werken.");
    anaam.focus();
    return;
  }
  if (punten.value === "" || isNaN(punten.value)) {
    alert("geef hier a.u.b. een puntenaantal in cijfers in");
    punten.focus();
    return;
  }
  else {
    insRow();
    maakKolom();
    deleteKolom();
  }
}
// de functie die de waarden toevoegt aan de tabel (overgenomen van mijn eerder gemaakte oefening 6)
function insRow() {
  var x = document.getElementById("tabel").insertRow();
  var y = x.insertCell(0);
  var z = x.insertCell(1);
  var t = x.insertCell(2);
  y.innerHTML = document.getElementById("vnaam").value;
  z.innerHTML = document.getElementById("anaam").value;
  t.innerHTML = document.getElementById("punten").value;
}

