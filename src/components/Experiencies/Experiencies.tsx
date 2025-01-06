import { useEffect, useState } from "react";

import TextBox from "./TextBox/TextBox";
import Timeline from "./Timeline/Timeline";

import "./Experiencies.scss";
import { dataFullSize, experiences, formations } from "./ExperienciesData";

export default function Experiencies() {
	const MIN_DATA_BREAK_POINT = 750; // in px

	const [isMinScreen, setIsMinScreen] = useState<boolean>();

	const updateDate = () => {
		const windowWidth = window.innerWidth;

		setIsMinScreen(windowWidth < MIN_DATA_BREAK_POINT);
	};

	const initTimeline = () => {
		const root = document.querySelector(":root") as HTMLElement;

		if (!root) {
			return;
		}

		const timelineHeight = parseInt(getComputedStyle(root).getPropertyValue("--size-timeline-height").replace("px", ""));

		const boxs = document.querySelectorAll(".box-timeline");

		boxs.forEach((box) => {
			const textBox = box.querySelector(".text-box") as HTMLElement;
			const timelineBar = box.querySelector(".timeline .bar") as HTMLElement;

			timelineBar.style.height = Math.max(textBox.offsetHeight, timelineHeight) + "px";
		});
	};

	const getFormation = (formation: TextBoxProps) => {
		return (
			<div data-aos="fade-left" className="formations" key={formation.title + formation.date}>
				<div></div>

				<div className="box-timeline">
					<Timeline />

					<TextBox {...formation} />
				</div>
			</div>
		);
	};

	const getExperience = (experience: TextBoxProps) => {
		return (
			<div data-aos="fade-right" className="experiences" key={experience.title + experience.date}>
				<div className="box-timeline">
					<TextBox {...experience} />

					<Timeline />
				</div>

				<div></div>
			</div>
		);
	};

	const onResize = () => {
		if (isMinScreen) {
			return;
		}

		initTimeline();
		updateDate();
	};

	useEffect(() => {
		// Prevent offsetHeight not calculated
		// Anim request trigger it after DOM fully loaded
		requestAnimationFrame(onResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMinScreen]);

	useEffect(() => {
		window.addEventListener("resize", onResize);

		// Prevent offsetHeight not calculated
		// Anim request trigger it after DOM fully loaded
		requestAnimationFrame(onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section id="parcours">
			<div className="banner">
				<div id="titles">
					<h2 className="title secondary">Expériences</h2>

					{!isMinScreen ? <h2 className="title secondary">Formations</h2> : ""}
				</div>

				<div id="content">
					{!isMinScreen ? (
						dataFullSize.map((item) => (item.position === "left" ? getFormation(item) : getExperience(item)))
					) : (
						<>
							{experiences.map((item) => getExperience(item))}
							<h2 className="title secondary" style={{ margin: "5rem 0" }}>
								Formations
							</h2>
							{formations.map((item) => getFormation(item))}
						</>
					)}
				</div>
			</div>
		</section>
	);
}
