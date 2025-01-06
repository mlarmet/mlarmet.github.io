import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Footer.scss";

export default function Footer() {
	return (
		<footer>
			<div className="banner">
				<hr />

				<div className="row">
					<h1 className="title secondary">Maxence LARMET</h1>

					<div id="media">
						<a href="mailto:maxencelarmet@orange.fr" className="link light border circle">
							<FontAwesomeIcon icon={faEnvelope} size="lg" />
						</a>
						<a href="https://www.linkedin.com/in/maxencelarmet/" className=" link light border circle" target="_blank">
							<FontAwesomeIcon icon={faLinkedinIn} size="lg" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
