import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faAnglesDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";

import NavBar from "./NavBar/NavBar";
import Starfield from "./Starfield/Starfield";

import "./Header.scss";

export default function Header() {
	return (
		<header>
			<NavBar />

			<Starfield />

			<div id="presentation">
				<h1 className="title">Maxence LARMET</h1>
				<p>Ingénieur informatique</p>
				<div id="links">
					<a href="mailto:maxencelarmet@orange.fr" className="link light border circle">
						<FontAwesomeIcon icon={faEnvelope} size="lg" />
					</a>
					<a href="https://www.linkedin.com/in/maxencelarmet/" target="_blank" className="link light border circle">
						<FontAwesomeIcon icon={faLinkedinIn} size="lg" />
					</a>

					<a id="cv" href="/cv/cv_maxence_larmet.pdf" target="_blank" className="link light border">
						Télécharger mon CV
					</a>
				</div>
			</div>

			<a id="scroll-icon" className="link light" href="/#a-propos">
				<FontAwesomeIcon icon={faAnglesDown} size="2x" />
			</a>
		</header>
	);
}
