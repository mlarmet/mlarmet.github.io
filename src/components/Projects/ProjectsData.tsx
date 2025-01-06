// Projects Images
import edt from "assets/images/projects/edt.jpeg";
import meteo from "assets/images/projects/meteo-api-full.jpeg";
import pizza8000 from "assets/images/projects/pizza8000.jpeg";

const projects: ProjectItemProps[] = [
	{
		title: "Pizzeria Olitia",
		image: pizza8000,
		description: (
			<>
				Conception et réalisation d'un site vitrine pour une pizzeria local avec{" "}
				<strong>
					<em>personnalisation</em>
				</strong>{" "}
				et{" "}
				<strong>
					<em>sessions admin</em>
				</strong>
				.<br />
				Acquis : Modèle MVC, Première expérience professionnelle,
			</>
		),
		tags: ["PHP", "React", "Node.js"],
		link: "https://www.pizzeria-olitia.fr/",
	},
	{
		title: "Emplois du temps",
		image: edt,
		description: (
			<>
				Conception et réalisation d'une application web qui{" "}
				<strong>
					<em>récupère</em>
				</strong>{" "}
				et{" "}
				<strong>
					<em>affiche</em>
				</strong>{" "}
				un emplois du temps
				<br />
				Acquis : Traitement des données "ical", autonomie
			</>
		),
		tags: ["React", "Node.JS"],
		link: "https://edt-ubo.alwaysdata.net",
	},
	{
		title: "Meteo api",
		image: meteo,
		description: (
			<>
				Conception et réalisation d'un site web pour{" "}
				<strong>
					<em>traiter</em>
				</strong>{" "}
				des données météo récupérées à partir d'une{" "}
				<strong>
					<em>API</em>
				</strong>
				<br />
				Acquis : Découverte API et appel AJAX,
			</>
		),
		tags: ["API"],
		link: "https://mlarmet.github.io/meteo-api",
	},
	// {
	// 	title: "Casse brique",
	// 	image: casseBrique,
	// 	description: (
	// 		<>
	// 			"Conception et réalisation d'un <em>jeu vidéo 2D</em> pour le projet de fin \ d'année de la spécialité ISN du Baccalauréat.", "Outils : Python
	// 			(3.6) avec le module pygame", "Acquis : gestion du temps, travail en équipe",
	// 		</>
	// 	),
	// 	tags: ["Python", "Pygame"],
	// 	link: "https://github.com/mlarmet/casse-brique",
	// },
	// {
	// 	title: "Tic Tac Toe",
	// 	image: tictactoe,
	// 	description: (
	// 		<>
	// 			<strong>
	// 				<em>Développement</em>
	// 			</strong>{" "}
	// 			d'une application{" "}
	// 			<strong>
	// 				<em> Android</em>
	// 			</strong>
	// 			. Jeu du tic tac toe.
	// 			<br />
	// 			Acquis : initiation à la création d'application, autonomie
	// 		</>
	// 	),
	// 	tags: ["Android", "Java", "XML"],
	// },
];

export { projects };
