const slidesData = [
	{
		title: "Pizzeria Olitia",
		text: [
			"Conception et réalisation d'un site web vitrine pour une pizzeria local \
        avec <em>personnalisation</em> et <em>sessions admin</em>.",
			"Outils : PHP (Framework Codeigniter)",
			"Acquis : Modèle MVC, Première expérience professionnelle",
		],

		link: "https://www.pizzeria-olitia.fr",

		img: {
			name: "pizza8000.jpeg",
			alt: "site vitrine pizzeria olitia",
			title: "Pizzeria Olitia",
		},
	},
	{
		title: "Emplois du temps",
		text: [
			"Conception et réalisation d'une application web qui <em>récupère</em> et <em>affiche</em> un emplois du temps",
			"Outils : React (18) et NodeJS (16)",
			'Acquis : Traitement des données "ical", autonomie',
		],

		link: "https://edt-ubo.alwaysdata.net",

		img: {
			name: "edt.jpeg",
			alt: "site emplois du temps",
			title: "Emplois du temps",
		},
	},
	{
		title: "Meteo api",
		text: [
			"Conception et réalisation d'un site web pour <em>traiter</em> des données météo récupérées à partir d'une <em>API</em>.",
			"Outils : HTML, CSS, JS (vanilla)",
			"Acquis : Découverte API et appel AJAX",
		],

		link: "https://mlarmet.github.io/meteo-api",

		img: {
			name: "meteo-api-full.jpeg",
			alt: "site meteo api",
			title: "Site météo",
		},
	},
	{
		title: "Casse brique",
		text: [
			"Conception et réalisation d'un <em>jeu vidéo 2D</em> pour le projet de fin \
        d'année de la spécialité ISN du Baccalauréat.",
			"Outils : Python (3.6) avec le module pygame",
			"Acquis : gestion du temps, travail en équipe",
		],

		link: "https://github.com/mlarmet/casse-brique",

		img: {
			name: "casse-brique.png",
			alt: "illustration jeu casse brique",
			title: "Casse brique",
		},
	},
	{
		title: "Tic Tac Toe",
		text: [
			"<em>Développement</em> d'une application <em> Android</em>. Jeu du tic tac toe.",
			"Outils : Java avec le logiciel Android Studio, XML",
			"Acquis : initiation à la création d'application, autonomie",
		],

		link: "",

		img: {
			name: "tictactoe.png",
			alt: "illustration jeu tic tac toe",
			title: "Tic Tac Toe",
		},
	},
];

slidesData.forEach((data, index) => {
	let template = document.getElementById("slide-template");
	let element = document.importNode(template.content, true);

	let divElem = element.querySelector(".slider-item");

	let indicatorElem = document.createElement("li");
	indicatorElem.id = index;

	if (index == 0) {
		indicatorElem.classList.add("active");
		divElem.classList.add("active");
	}
	document.getElementById("slider-nav").appendChild(indicatorElem);

	//title
	let titleElem = element.querySelector("h3");
	titleElem.textContent = data.title;

	let linkElem = divElem.querySelector("a");

	if (data.link == "") {
		linkElem.replaceWith(...linkElem.childNodes);
	} else {
		linkElem.href = data.link;
		linkElem.title = "Voir le projet";

		titleElem.innerHTML += `&ensp;<i class="fas fa-external-link-alt"></i>`;
	}

	//bacnground image of the slide
	let img = element.querySelector("img");
	img.src = "images/projects/" + data.img.name;
	img.title = data.img.title;
	img.alt = data.img.alt;

	//text content of the slide
	let list = element.querySelectorAll("li");
	list.forEach((liElem, index) => {
		if (index == 0) liElem.querySelector("div").innerHTML += data.text[index];
		else liElem.innerHTML += data.text[index];
	});

	document.getElementById("slider-container").insertBefore(element, template);
});
