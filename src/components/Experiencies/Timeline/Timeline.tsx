// import React from "react";

import "./Timeline.scss";

export default function Timeline({ end = "full" }: TimelineProps) {
	return (
		<div className="timeline">
			<div className="circle"></div>
			{end === "full" && <div className="bar"></div>}
		</div>
	);
}
