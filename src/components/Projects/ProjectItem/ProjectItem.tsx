// import React from "react";

import "./ProjectItem.scss";

export default function ProjectItem({ image, title, description, tags, link }: ProjectItemProps) {
	return (
		<div data-aos="flip-left" data-aos-anchor-placement="top-bottom" data-aos-offset="200" className="project-item">
			<div className="project-image">
				<img src={image} alt={title} />
			</div>

			<div className="project-content">
				<h2 className="title terciary">{title}</h2>

				<div className="project-description">
					<p>{description}</p>
				</div>

				<div className="project-bottom">
					<div className="project-tags">
						{tags.map((tag) => (
							<p className="tag" key={tag + title}>
								{tag}
							</p>
						))}
					</div>

					{link !== undefined ? (
						<a href={link} target="_blank" className="link dark">
							Voir le projet
						</a>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
