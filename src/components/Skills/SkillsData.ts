import AngularSvg from "assets/images/icones/svg/angular-icon.svg";
import GitSvg from "assets/images/icones/svg/git-scm-icon.svg";
import JavaSvg from "assets/images/icones/svg/java-icon.svg";
import ReduxSvg from "assets/images/icones/svg/js_redux-icon.svg";
import NodeJSSvg from "assets/images/icones/svg/nodejs-icon.svg";
import PHPSvg from "assets/images/icones/svg/php-icon.svg";
import ReactSvg from "assets/images/icones/svg/reactjs-icon.svg";
import TSSvg from "assets/images/icones/svg/typescriptlang-icon.svg";
import CSSSvg from "assets/images/icones/svg/w3_css-icon.svg";
import HTMLSvg from "assets/images/icones/svg/w3_html5-icon.svg";

import { icon, IconDefinition, toHtml } from "@fortawesome/fontawesome-svg-core";
import { faTerminal as NoSvg } from "@fortawesome/free-solid-svg-icons";

/**
 * Get a Font Awesome icon object and return the svg data as string.
 * @param faIcon Font Awesome icon
 * @returns The img data from FontAwesome Icon
 */
function getSVGURI(faIcon: IconDefinition) {
	const abstract = icon(faIcon).abstract[0];
	return `data:image/svg+xml;base64,${btoa(toHtml(abstract))}`;
}

const skills_group: SkillGroup = {
	programmation: [
		{ img: HTMLSvg, name: "HTML" },
		{ img: CSSSvg, name: "CSS" },
		{ img: TSSvg, name: "TypeScript" },
		{ img: PHPSvg, name: "PHP" },
		{ img: JavaSvg, name: "Java" },
	],
	bibliothèques: [
		{ img: ReactSvg, name: "React" },
		{ img: AngularSvg, name: "Angular" },
		{ img: NodeJSSvg, name: "Node.JS" },
		{ img: ReduxSvg, name: "Redux" },
	],
	outils: [
		{ img: GitSvg, name: "Git" },
		{ img: getSVGURI(NoSvg), name: "WebSocket" },
		{ img: getSVGURI(NoSvg), name: "API REST" },
	],
};

export { skills_group };
