import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	base: "/",
	build: {
		chunkSizeWarningLimit: 1024,
	},

	plugins: [react()],
	resolve: {
		alias: {
			src: "/src",
			components: "/src/components",
			views: "/src/views",
			assets: "/src/assets",
			utils: "/src/utils",
		},
	},
	define: {
		__BASE_URL__: JSON.stringify("http://192.168.1.22:5173/"),
		FORM_CONFIG: JSON.stringify({
			__FORM_EMAIL__: "maxencelarmet@orange.fr",
			__FORM_SUBJECT__: "Prise de contact",
		}),
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern-compiler",
			},
		},
	},
});
