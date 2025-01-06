// TextBox
interface TextBoxProps {
	title: string;
	date: string;
	description: JSX.Element;
	image: string;
	position: "right" | "left";
}

// Timeline
interface TimelineProps {
	end?: "full" | "circle";
}
