(function () {
	"use strict";
	/*jslint browser: true*/
	/*jslint devel: true*/
	let baseApiAddress = "https://theoallaeys2021.be/web&mobile/taak1/api/";
	const fromstudent = document.getElementById("addstudent");
	const formvak = document.getElementById("addvak");
	const add_voornaam = fromstudent.elements['add_voornaam'];
	const add_achternaam = fromstudent.elements['add_achternaam'];
	const add_studentennummer = fromstudent.elements['add_studentennummer'];
	const add_cursus = fromstudent.elements['add_cursus'];
	const add_code = formvak.elements['add_code'];
	const add_naam = formvak.elements['add_naam'];
	const add_taal = formvak.elements['add_taal'];	
	/* Vorige lijn aanpassen naar de locatie op jouw domein! */

	let alertEl = document.getElementById("alert");
	let options = document.getElementById("cursusoption");
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

	async function getApistudent() {
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

	function addStudent() {
        // een ONVEILIGE manier om gebruikersgegevens te testen

        let url = baseApiAddress + "studentadd.php";
        // onze php api verwacht een paar parameters
        // we voegen deze toe aan de body van de opties

        // body data type must match "Content-Type" header
        opties.body = JSON.stringify({
            student_voornaam: add_voornaam.value,
            student_achternaam: add_achternaam.value,
            student_nummer: add_studentennummer.value,
            format: "json"
        });

        // test de api
        fetch(url, opties)
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                //correct toegevoegd?

                getApistudent();

            })
            .catch(function(error) {
                // verwerk de fout
                alertEl.innerHTML = "fout : " + error;
            });
    }

	function addStudentvak() {
        // een ONVEILIGE manier om gebruikersgegevens te testen

        let url = baseApiAddress + "studentvakadd.php";
        // onze php api verwacht een paar parameters
        // we voegen deze toe aan de body van de opties

        // body data type must match "Content-Type" header
        opties.body = JSON.stringify({
			student_nummer: add_studentennummer.value,
            student_vak: add_cursus.value,
            format: "json"
        });

        // test de api
        fetch(url, opties)
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                //correct toegevoegd?

                getApistudent();

            })
            .catch(function(error) {
                // verwerk de fout
                alertEl.innerHTML = "fout : " + error;
            });
    }

	async function getApivak() {
		console.log("loaded");
		// de producten van de server opvragen en weergeven dmv de alerter functie
		let url = baseApiAddress + "vakget.php";

		// body data type must match "Content-Type" header
		opties.body = JSON.stringify({
			//, user : "test" // als je de authentication in de api op true zet, heb je dit hier wel nodig 
			//, password : "test" // als je de authentication in de api op true zet, heb je dit hier wel nodig
		});

		// test de api

		let resp = await fetch(url);
		if (!resp.ok) {
			console.log('opvragen vakken mislukt');
			return;
		}
		// get json data
		const jsondata = await resp.json();
        console.log(jsondata);
        let data = jsondata.data;

		if (data.length > 0) {
			// er zit minstens 1 item in list, we geven dit ook onmiddelijk weer
			let tLijst = " ";
			for (let i = 0; i < data.length; i++) {
				tLijst += " <option value=" + data[i].code + ">" + data[i].naam + "</option>";
			}

			add_cursus.innerHTML = tLijst;
		} else {
			optioner("Servertijd kon niet opgevraagd worden");
		}

	}

	function addvak() {
        // een ONVEILIGE manier om gebruikersgegevens te testen

        let url = baseApiAddress + "vakadd.php";
        // onze php api verwacht een paar parameters
        // we voegen deze toe aan de body van de opties

        // body data type must match "Content-Type" header
        opties.body = JSON.stringify({
            vak_code: add_code.value,
            vak_naam: add_naam.value,
            vak_taal: add_taal.value,
            format: "json"
        });

        // test de api
        fetch(url, opties)
            .then(function(response) {
                return response.json();
            })
            .then(function() {
                //correct toegevoegd?
                getApivak();
            })
            .catch(function(error) {
                // verwerk de fout
                alertEl.innerHTML = "fout : " + error;
            });
    }

	// EventListeners
	document.getElementById("btnGetProducten").addEventListener("click", function () {
		getApistudent();
	});
	fromstudent.addEventListener('submit', function() {
		addStudent();
		addStudentvak();
	})

	formvak.addEventListener('submit', function(){
		addvak();
	})

	window.onload =  getApivak();

	// helper functies
	function alerter(message) {
		alertEl.innerHTML = message;
	}
})();

