import { Suspense, lazy } from "react";

import Loading from "components/Loading/Loading";

const Home = lazy(() => import("./views/Home/Home"));

export default function Main() {
	return (
		<Suspense fallback={<Loading />}>
			<Home />
		</Suspense>
	);
}
