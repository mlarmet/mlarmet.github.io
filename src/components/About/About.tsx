// import React from "react";

import profilPic from "assets/images/profil.no-bg.png";
import "./About.scss";

export default function About() {
	return (
		<section id="a-propos">
			<div className="banner">
				<h2 className="title secondary">A propos</h2>
				<div className="row">
					<div id="profil-pic">
						<div id="profil-pic-container">
							<img src={profilPic} alt="profil" />
						</div>
					</div>

					<div id="description">
						<p>
							En août 2024, j'ai obtenu mon Master Informatique à l'UBO, à Brest. Grâce à une alternance d'un an chez Thales Brest, j'ai acquis de
							l'expérience en développement logiciel. De plus, mes précédents stages dans le développement web mon également permis d'acquérir de
							solides compétences dans le développement WEB, domaine que j'ai aussi approfondie avec différents projets personnels. Aujourd'hui,
							je suis à la recherche d'une opportunité me permettant de mettre en pratique ces compétences.
						</p>

						<a href="/#contact" className="btn rounded">
							Me contacter
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
