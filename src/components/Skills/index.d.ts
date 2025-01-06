interface Skill {
	img: string;
	name: string;
}
interface SkillGroup {
	[key: string]: Skill[];
}
