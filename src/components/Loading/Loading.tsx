// import React from "react";

import { useEffect } from "react";
import "./Loading.scss";

export default function Loading() {
	useEffect(() => {
		const html = document.querySelector("html");

		if (html !== null) {
			html.style.overflowY = "hidden";
		}
	}, []);

	return (
		<div id="loader">
			<div id="container">
				<div id="dots">
					<div className="dot"></div>
					<div className="dot"></div>
					<div className="dot"></div>
				</div>
			</div>
		</div>
	);
}
