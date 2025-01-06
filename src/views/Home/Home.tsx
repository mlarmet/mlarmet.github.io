import { useEffect } from "react";

import About from "components/About/About";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";
import Contact from "src/components/Contact/Contact";
import Experiencies from "src/components/Experiencies/Experiencies";
import Projects from "src/components/Projects/Projects";
import Skills from "src/components/Skills/Skills";

import "./Home.scss";

export default function Home() {
	useEffect(() => {
		const html = document.querySelector("html");

		if (html !== null) {
			html.style.overflowY = "";
		}
	}, []);

	return (
		<>
			<Header />

			<main>
				<About />
				<Experiencies />
				<Projects />
				<Skills />
				<Contact />
			</main>

			<Footer />
		</>
	);
}
