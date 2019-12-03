// het bepalen van de invoer en uitvoer variabelen:
var bedrag = document.getElementById("bedrag");
var waarde = 0;
var button = document.getElementById("knop");
var btw = 0;
var exbtw = 0;
var knop =  document.getElementById("knop2");

// de code die de 'enter' key als uitvoerknop bepaalt en 2 functies tot uitvoer brengt
bedrag.addEventListener ('keyup', function (event) {
  if(event.key === "Enter" || event.keyCode === "Enter") {
    geefUitkomst ();
    empty ("bedrag");
  }
  // toevoeging van een controle op invoer, alleen nummers mogen!
  else if (isNaN(event.key || event.keyCode)) {
    alert("uw invoer moet een nummer zijn, probeer het aub opnieuw!");
    empty ("bedrag");
  }
});

// de functie die het totaal in het 2e tekstvak zet
function geefUitkomst () {
    bedrag = parseFloat(document.getElementById("bedrag").value);
    document.getElementById("uitkomst").value = "\u20ac " + bereken (bedrag).toFixed(2);
    }
    
// de functie die de bedragen bij elkaar optelt en teruggeeft als waarde
function bereken (invoerbedrag) {
  waarde += invoerbedrag;
	return waarde;
	}
// de functie die het invoervak weer leeg maakt nadat er op 'enter' wordt gedrukt
function empty (vak1) {
  document.getElementById(vak1).value = "";
}
// de knop om het bedrag te splitsen in BTW en niet-BTW
button.onclick = function() { toonBTW(); };
// de functie om de btw en niet-btw te tonen in 'hun' velden
function toonBTW() {
  document.getElementById("btw").value = "\u20ac " + berekenBTW (waarde).toFixed(2);
  document.getElementById("exbtw").value = "\u20ac " + berekenExBTW (waarde).toFixed(2);
}
// de functie om het btw stukje te berekenen
function berekenBTW(berbtw) {
  btw = (berbtw/121)*21;
  return btw;
}
// de functie om het niet-btw stukje te berekenen
function berekenExBTW(berbtw) {
  exbtw = (berbtw/121)*100;
  return exbtw;
}
// de reset button!
knop.onclick = function() { emptyAll(); };
// de functie om alles te resetten naar begin waarden
function emptyAll() {
  waarde = 0;
  btw = 0;
  exbtw= 0;
  document.getElementById("form").reset();
}
