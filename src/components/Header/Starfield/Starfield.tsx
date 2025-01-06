import { useEffect, useRef } from "react";

import "./Starfield.scss";

interface Star {
	x: number;
	y: number;
	size: number;
	opacity: number;
	twinkleSpeed: number;
	direction: number;
}

const config = {
	stars: {
		minCount: 100,
		size: {
			min: 1,
			max: 2,
		},
		opacity: {
			min: 0,
			max: 1,
		},
		twinkleSpeed: {
			min: 0.075,
			max: 0.1,
		},
	},
};

export function Starfield() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const randomNumber = (min: number, max: number) => {
		return Math.random() * (max - min) + min;
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		let numStars = window.innerWidth / 10;

		if (numStars < config.stars.minCount) {
			numStars = config.stars.minCount;
		}

		let stars: Star[] = [];

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		const initStars = () => {
			stars = [];
			for (let i = 0; i < numStars; i++) {
				stars.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					size: randomNumber(config.stars.size.min, config.stars.size.max),
					opacity: randomNumber(config.stars.opacity.min, config.stars.opacity.max),
					twinkleSpeed: randomNumber(config.stars.twinkleSpeed.min, config.stars.twinkleSpeed.max),
					direction: Math.random() < 0.5 ? -1 : 1,
				});
			}
		};

		const drawStars = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			for (const star of stars) {
				ctx.beginPath();
				ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
				ctx.fill();
			}
		};

		const animateStars = () => {
			for (const star of stars) {
				// star.opacity += star.twinkleSpeed * (Math.random() < 0.5 ? -1 : 1);
				star.opacity += star.twinkleSpeed * star.direction;

				if (star.opacity > 1) {
					star.opacity = 1;
					star.direction = -1;
				}
				if (star.opacity < 0) {
					star.opacity = 0;
					star.direction = 1;
				}
			}
		};

		const animate = () => {
			drawStars();
			animateStars();

			// /!\ : this line seem to "break" the animation but,
			//		 in realaty, that's the React Strict mode who made double render
			requestAnimationFrame(() => setTimeout(animate, 100));
		};

		const initCanvas = () => {
			resizeCanvas();
			initStars();
		};

		// Init
		initCanvas();
		animate();

		window.addEventListener("resize", initCanvas);

		return () => {
			window.removeEventListener("resize", initCanvas);
		};
	}, []);

	return <canvas id="starfield" ref={canvasRef} style={{ display: "block" }} />;
}

export default Starfield;
