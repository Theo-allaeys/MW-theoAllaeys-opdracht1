(function () {
	"use strict";
	/*jslint browser: true*/
	/*jslint devel: true*/
	let baseApiAddress = "https://theoallaeys2021.be/web&mobile/taak1/api/";
	/* Vorige lijn aanpassen naar de locatie op jouw domein! */

	let alertEl = document.getElementById("alert");
	let opties = {
		method: "POST", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "omit" // include, *same-origin, omit
		/* Opgelet : volgende headers niet toevoegen :
		   JSON triggert de pre-flight mode, waardoor de toegang op
		   deze manier niet meer zal lukken.
		*/
		/*, headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		}*/
	};

	async function getApiProducten() {
		// de producten van de server opvragen en weergeven dmv de alerter functie
		let url = baseApiAddress + "Studentsget.php";

		// body data type must match "Content-Type" header
		opties.body = JSON.stringify({
			//, user : "test" // als je de authentication in de api op true zet, heb je dit hier wel nodig 
			//, password : "test" // als je de authentication in de api op true zet, heb je dit hier wel nodig
		});

		// test de api

		let resp = await fetch(url);
		if (!resp.ok) {
			console.log('opvragen studenten mislukt');
			return;
		}
		// get json data
		const jsondata = await resp.json();
        console.log(jsondata);
        let data = jsondata.data;

		if (data.length > 0) {
			// er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
			var tLijst = "<table border='1' cellspacing='2' cellpadding='2'><tr><th>id</th><th>voornaam</th><th>achternaam</th><th>studentennummer</th><th>cursus</th></tr>";
			for (var i = 0; i < data.length; i++) {
				tLijst += "<tr><td>" + data[i].id + "</td><td>" + data[i].voornaam + "</td><td>" + data[i].achternaam + "</td><td>" + data[i].studentennummer + "</td><td>" + data[i].naam + "</td></tr>";
			}
			tLijst += "</table><br>";

			alerter(tLijst);
		} else {
			alerter("Servertijd kon niet opgevraagd worden");
		}

	}

	// EventListeners
	document.getElementById("btnGetProducten").addEventListener("click", function () {
		getApiProducten();
	});

	// helper functies
	function alerter(message) {
		alertEl.innerHTML = message;
	}
})();

