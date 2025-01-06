import ProjectItem from "./ProjectItem/ProjectItem";

import { projects } from "./ProjectsData";

import "./Projects.scss";

export default function Projects() {
	return (
		<section id="projects">
			<div className="banner">
				<h2 className="title secondary">Projets récents</h2>

				<div id="projects-row">
					{projects.map((project) => (
						<ProjectItem
							key={project.title}
							image={project.image}
							title={project.title}
							description={project.description}
							tags={project.tags}
							link={project.link}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
