import React from "react";

import { skills_group } from "./SkillsData";

import "./Skills.scss";

export default function Skills() {
	return (
		<section id="competences">
			<div className="banner">
				<h2 className="title secondary">Compétences</h2>

				<div className="column">
					{/* <p>Voici une liste de mes compétences principales !</p> */}

					<div id="skills">
						{Object.keys(skills_group).map((group) => (
							<React.Fragment key={group}>
								<div className="skill-group">
									<h2 className="title terciary">{group}</h2>
									<div className="skill-list">
										{skills_group[group].map((skill) => (
											<div className="skill" key={skill.name}>
												<div className="circle">
													<img src={skill.img} alt="logo-html" />
												</div>
												<p>{skill.name}</p>
											</div>
										))}
									</div>
								</div>
							</React.Fragment>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
