import { SyntheticEvent, useEffect, useState } from "react";

import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./NavBar.scss";

export default function NavBar() {
	const SCROLL_LIMIT = 200;

	const [scrollPosition, setScrollPosition] = useState(0);
	const [isShowNav, setShowNav] = useState(false);

	const handleScroll = () => {
		setScrollPosition(window.scrollY);

		if (window.scrollY == 0) {
			resetNavActive();
		}

		// Hide mobile nav on scroll
		setShowNav(false);
	};

	const hideNav = () => {
		setShowNav(false);
	};

	const toggleNav = () => {
		setShowNav(!isShowNav);
	};

	const handleWindowResize = () => {
		if (window.outerWidth > 1200) {
			setShowNav(false);
		}
	};

	const resetNavActive = () => {
		const navItems = document.querySelectorAll<HTMLElement>(`header nav .nav-item`);

		if (!navItems) {
			return;
		}

		for (let i = 0; i < navItems.length; i++) {
			const navItem = navItems[i];

			if (navItem) {
				navItem.classList.remove("active");
			}
		}
	};

	const toggleActive = (e: SyntheticEvent) => {
		resetNavActive();

		if (!e) {
			return;
		}

		const element = e.target as HTMLLinkElement;

		const hash = element.href.split("#")[1];

		const navItem = document.querySelector(`header nav .nav-item[href="/#${hash}"]`);

		if (navItem) {
			navItem.classList.add("active");
		}
	};

	const getNavItems = (isMobile = false) => {
		const linkProps = {
			onClick: isMobile ? hideNav : toggleActive,
		};

		return (
			<nav id={isMobile ? "mobile-nav" : "full-nav"}>
				<a href="/#" className="nav-item" {...linkProps}>
					Accueil
				</a>

				{/* <a href="/#a-propos" className="nav-item" {...linkProps}>
					A propos
				</a> */}

				<a href="/#parcours" className="nav-item" {...linkProps}>
					Parcours
				</a>

				<a href="/#projects" className="nav-item" {...linkProps}>
					Projets
				</a>

				{/* <a href="/#competences" className="nav-item" {...linkProps}>
					Compétences
				</a> */}

				<a href="/#contact" className="nav-item" {...linkProps}>
					Contact
				</a>
			</nav>
		);
	};

	useEffect(() => {
		// If on load, hash is already in link
		const hash = window.location.hash.replace("#", "");

		// hash define (and not accueil)
		if (hash !== "") {
			const navItem = document.querySelector(`header nav .nav-item[href="/#${hash}"]`);

			if (navItem) {
				navItem.classList.add("active");
			}

			setTimeout(() => {
				// Wait for initTimeline to be done
				document.getElementById(hash)?.scrollIntoView();
			}, 100);
		}

		window.addEventListener("resize", handleWindowResize);
		document.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
			document.removeEventListener("scroll", handleScroll);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div id="navigation" className={scrollPosition > SCROLL_LIMIT || isShowNav ? "outlined" : ""}>
			{getNavItems()}

			<div id="nav-top" className={isShowNav ? "show" : "hide"} onClick={toggleNav}>
				<div id="nav-trigger">
					<p>Menu</p>

					<div id="mobile-nav-icon">
						<FontAwesomeIcon icon={faXmark} className={isShowNav ? "open" : "close"} size="xl" />
						<FontAwesomeIcon icon={faBars} className={!isShowNav ? "open" : "close"} size="xl" />
					</div>
				</div>

				{getNavItems(true)}
			</div>
		</div>
	);
}
