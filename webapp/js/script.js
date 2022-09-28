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
        let data = jsondata.data;

		if (data.length > 0) {
			// er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
			var tLijst = "<span class='rij kOdd'><span>ID</span><span>voornaam</span><span>achternaam</span><span>studentennummer</span></span>";
			for (var i = 0; i < data.length; i++) {
				tLijst += "<span class='rij'><span>" + data[i].id + "</span><span>" + data[i].voornaam + "</span><span>" + data[i].achternaam + "</span><span>" + data[i].studentennummer + "</span></span>";
			}
			tLijst += "<br>";

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

