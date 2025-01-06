// import React from "react";

import "./TextBox.scss";

export default function TextBox({ title, date, description, position, image }: TextBoxProps) {
	return (
		<div className={`text-box arrow-${position}`}>
			<div className="top">
				<img className="logo_formation" src={image} alt="title" />

				<div className="right">
					<h2 className="title terciary">{title}</h2>
					<p className="date">{date}</p>
				</div>
			</div>
			<div className="description">{description}</div>
		</div>
	);
}
