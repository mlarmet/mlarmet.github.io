import cdg from "assets/images/logos/logo_cdg.jpg";
import iut from "assets/images/logos/logo_IUT.jpg";
import thales from "assets/images/logos/logo_thales.jpg";
import prescom from "assets/images/logos/prescom_logo.jpg";
import ubo from "assets/images/logos/ubo_logo.jpg";

const experiences: TextBoxProps[] = [
	{
		title: "Ingénieur logiciel - Prescom",
		date: "Novembre 2025 - Aujourd'hui",
		description: (
			<ul>
				<li>
					Développement fullstack d'une application web dans des systèmes de communication critiques intégrés pour salles de contrôle et de
					commandement
				</li>
			</ul>
		),

		image: prescom,
		position: "right",
	},
	{
		title: "Alternance  (1 an) - THALES",
		date: "Septembre 2023 - Août 2024",
		description: (
			<ul>
				<li>Développement de composants logiciel</li>
				<li>Création d'une bibliothèque JavaFX</li>
				<li>Travail en équipe</li>
			</ul>
		),

		image: thales,
		position: "right",
	},
	{
		title: "Stage (4 mois) - THALES",
		date: "Avril - Juillet 2023",
		description: (
			<ul>
				<li>Conception et réalisation d'un "Proof of concept"</li>
				<li>Migration client lourd vers client léger</li>
				<li>Optimisations des performances</li>
			</ul>
		),
		image: thales,
		position: "right",
	},
	{
		title: "Stage (5 mois) - THALES",
		date: "Avril - Août 2022",
		description: (
			<ul>
				<li>Création d'un système de contrôle d'application à distance</li>
				<li>Gestion d'un flux vidéo</li>
			</ul>
		),
		image: thales,
		position: "right",
	},
	{
		title: "Stage (3 mois) - CDG 22",
		date: "Avril - Juin 2022",
		description: (
			<ul>
				<li>Réalisation d'une application web pour valoriser les archives communales</li>
				<li>Découverte des technologies Angular et NodeJS</li>
			</ul>
		),
		image: cdg,
		position: "right",
	},
];

const formations: TextBoxProps[] = [
	{
		title: "Master Informatique - UBO",
		date: "2022 - 2024",
		description: (
			<ul>
				<li>
					parcours Technologie de l'Information et Ingénierie du Logiciel (<span className="bold">TIILA</span>)
				</li>
			</ul>
		),
		image: ubo,
		position: "left",
	},
	{
		title: "Licence 3 Informatique - UBO",
		date: "2021 - 2022",
		description: (
			<ul>
				<li>
					parcours Ingénierie Informatique (<span className="bold">II</span>)
				</li>
			</ul>
		),
		image: ubo,
		position: "left",
	},
	{
		title: "DUT Informatique - IUT Lannion",
		date: "2019 - 2021",
		description: (
			<ul>
				<li>option Génie logiciel</li>
			</ul>
		),
		image: iut,
		position: "left",
	},
];

const dataFullSize: TextBoxProps[] = [experiences[0], experiences[1], formations[0], experiences[2], formations[1], experiences[3], formations[2]];

export { dataFullSize, experiences, formations };
