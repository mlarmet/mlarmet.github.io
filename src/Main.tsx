import { Suspense, lazy } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Loading from "components/Loading/Loading";

const Home = lazy(() => import("./views/Home/Home"));

export default function Main() {
	AOS.init({
		once: true,
	});

	return (
		<Suspense fallback={<Loading />}>
			<Home />
		</Suspense>
	);
}
