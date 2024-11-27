const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const slides = document.querySelectorAll(".slider-item");
const slidesIndicators = document.querySelectorAll("#slider-nav li");
const nbSlides = slides.length;

const html = document.querySelector("html");

const menu = document.getElementById("menu");
const navigation = document.getElementById("navigation");

let countSlide = 0;
let previousCount;

let done = false;

let mouseONslide = false;

let ready = true;
let timeOut = null;

let readySlide = true;
let timeOutSlide = null;

let aosActive = true;
let sliderInterval = null;

async function waitSeconds(seconds) {
	if (mouseONslide) return;

	if (!ready) window.clearTimeout(timeOut);
	else ready = false;

	timeOut = window.setTimeout(() => (ready = true), seconds * 1000);
}

async function waitSecondsSlide(seconds) {
	if (!readySlide) window.clearTimeout(timeOutSlide);
	else readySlide = false;

	timeOutSlide = window.setTimeout(() => (readySlide = true), seconds * 1000);
}

function resetSlide(index, position) {
	slides[index].classList.add("notransition");
	slides[index].style.left = position;

	setTimeout(function () {
		slides[index].classList.remove("notransition");
	}, 50);
}

function placeAt(index, position, prevpos) {
	//reset la slide cliqué à gauche ou a droite
	resetSlide(index, position);

	setTimeout(function () {
		//bascule la slide précédente a gauche ou a droite
		slides[previousCount].style.left = prevpos;
		slides[countSlide].classList.add("active");
		slidesIndicators[countSlide].classList.add("active");
		//met la slide choisie au centre
		slides[countSlide].style.left = "0";
	}, 50);
}

function slideSuivante() {
	if (readySlide) {
		readySlide = false;

		previousCount = countSlide;

		slidesIndicators[previousCount].classList.remove("active");
		slides[previousCount].classList.remove("active");
		slides[previousCount].style.left = "-100%";

		if (countSlide < nbSlides - 1) {
			countSlide++;
		} else {
			countSlide = 0;
		}

		if (countSlide == nbSlides - 1) {
			resetSlide(0, "100%");
		} else {
			resetSlide(countSlide + 1, "100%");
		}

		slides[countSlide].classList.add("active");
		slidesIndicators[countSlide].classList.add("active");
		slides[countSlide].style.left = "0";

		waitSecondsSlide(0.55);
	}
}

function slidePrecedente() {
	if (readySlide) {
		readySlide = false;

		previousCount = countSlide;

		slidesIndicators[previousCount].classList.remove("active");
		slides[previousCount].classList.remove("active");
		slides[previousCount].style.left = "100%";

		if (countSlide > 0) {
			countSlide--;
		} else {
			countSlide = nbSlides - 1;
		}

		if (countSlide > 0) {
			resetSlide(countSlide - 1, "-100%");
		} else {
			resetSlide(nbSlides - 1, "-100%");
		}

		slides[countSlide].classList.add("active");
		slidesIndicators[countSlide].classList.add("active");
		slides[countSlide].style.left = "0";

		waitSecondsSlide(0.55);
	}
}

function slideX(index) {
	if (readySlide) {
		readySlide = false;

		previousCount = countSlide;

		countSlide = parseInt(index);

		if (countSlide != previousCount) {
			slidesIndicators[previousCount].classList.remove("active");
			slides[previousCount].classList.remove("active");

			//si la slide choisie est la derniere
			if (countSlide == nbSlides - 1) {
				//si la précédente était la premiere
				if (previousCount == 0) {
					//reset la premiere à droite
					setTimeout(function () {
						resetSlide(0, "100%");
					}, 550);
					//reset l'avant derniere a gauche
					resetSlide(countSlide - 1, "-100%");
				} else {
					resetSlide(0, "100%");
					setTimeout(function () {
						resetSlide(countSlide - 1, "-100%");
					}, 550);
				}
			} else if (countSlide == 0) {
				if (previousCount == nbSlides - 1) {
					setTimeout(function () {
						resetSlide(nbSlides - 1, "-100%");
					}, 550);
					resetSlide(countSlide + 1, "100%");
				} else {
					resetSlide(nbSlides - 1, "-100%");
					setTimeout(function () {
						resetSlide(countSlide + 1, "100%");
					}, 550);
				}
			} else {
				setTimeout(function () {
					resetSlide(countSlide + 1, "100%");
					resetSlide(countSlide - 1, "-100%");
				}, 550);
			}

			//si on revient en arrière
			if (countSlide < previousCount) {
				//mets la slide en cours a 100% et mets la slide cliqué à -100% puis la fait slide à 0
				placeAt(countSlide, "-100%", "100%");
			} else {
				placeAt(countSlide, "100%", "-100%");
			}
		}

		waitSecondsSlide(0.6);
	}
}

function nav() {
	//disable AOS if window size go under 768px or 705px
	// if ((window.matchMedia("(max-width: 767.68px)").matches || window.matchMedia("(max-height: 705px)").matches) && aosActive) {
	// 	AOS.refreshHard();
	// 	aosActive = false;

	// 	clearInterval(sliderInterval);
	// 	sliderInterval = setInterval(function () {
	// 		if (ready && readySlide) slideSuivante();
	// 	}, 3000);
	// } else if (window.matchMedia("(min-width: 767.68px)").matches && window.matchMedia("(min-height: 705px)").matches && !aosActive) {
	// 	AOS.refreshHard();
	// 	aosActive = true;

	// 	clearInterval(sliderInterval);
	// 	sliderInterval = setInterval(function () {
	// 		if (ready && readySlide) slideSuivante();
	// 	}, 3000);
	// }

	if (window.matchMedia("(max-width: 991px)").matches) {
		if (!done) {
			done = true;

			navigation.classList.remove("fadeIn");
			navigation.style.animationDuration = "0s";
			navigation.classList.add("fadeOut");

			//prevent fadeOut on resize
			setTimeout(function () {
				navigation.style.animationDuration = "250ms";
			}, 250);

			menu.classList.remove("change");
			html.style.overflowY = "auto";
		}
	} else {
		navigation.style.display = null;
		navigation.classList.remove("fadeOut");
		navigation.classList.remove("fadeIn");
		done = false;
	}

	if (!mobile) {
		document.querySelectorAll(".reseaux-sociaux i").forEach((reseauTag) => {
			reseauTag.addEventListener("mouseenter", function () {
				reseauTag.parentNode.children[1].classList.remove("fadeOut");
				reseauTag.parentNode.children[1].classList.add("fadeIn");
			});

			reseauTag.addEventListener("mouseleave", function () {
				reseauTag.parentNode.children[1].classList.remove("fadeIn");
				reseauTag.parentNode.children[1].classList.add("fadeOut");
			});
		});
	}

	if (window.matchMedia("(max-width: 400px)").matches) {
		let heightSlider = 0;

		document.querySelectorAll(".slider-description").forEach((items) => {
			next = items.querySelector(".slider-description h3").offsetHeight + items.querySelector(".slider-description ul").offsetHeight;
			if (next > heightSlider) heightSlider = next;
		});

		document.getElementById("slider-container").style.height = heightSlider + 80 /*marge pour afficher le ol */ + "px";
	} else {
		document.getElementById("slider-container").style.height = null;
	}
}

function showNav() {
	if (window.matchMedia("(max-width: 991px)").matches) {
		done = true;

		if (navigation.classList.contains("fadeIn")) {
			navigation.classList.add("fadeOut");
			navigation.classList.remove("fadeIn");

			menu.classList.remove("change");
			html.style.overflowY = "auto";
		} else {
			navigation.classList.add("fadeIn");
			navigation.classList.remove("fadeOut");
			menu.classList.add("change");
			html.style.overflowY = "hidden";
		}
	}
}

let handler = function (e) {
	slideX(e.target.id);

	//mobile no mouse leave so wait 3s
	if (mobile) waitSeconds(3);
};

menu.addEventListener("click", showNav);

document.getElementById("slider-left").addEventListener("click", () => slidePrecedente());
document.getElementById("slider-right").addEventListener("click", () => slideSuivante());

document.addEventListener("keyup", (e) => {
	if (e.code == "ArrowLeft") {
		slidePrecedente();
		waitSeconds(3);
	} else if (e.code == "ArrowRight") {
		slideSuivante();
		waitSeconds(3);
	}
});

let swiper = new Swipe(document.getElementById("slider-container"));

swiper.onLeft(() => {
	slideSuivante();
	waitSeconds(3);
});

swiper.onRight(() => {
	slidePrecedente();
	waitSeconds(3);
});

document.querySelectorAll(".nav-link").forEach((link) => {
	link.addEventListener("click", showNav);
});

document.querySelectorAll("#slider-nav li").forEach((link) => {
	link.addEventListener("click", handler, true);
});

let slideBeforeEvent;

document.getElementById("slider-container").addEventListener("mouseenter", function () {
	ready = false;
	mouseONslide = true;
	slideBeforeEvent = countSlide;
});

document.getElementById("slider-container").addEventListener("mouseleave", function () {
	mouseONslide = false;

	//user click to change slide
	if (slideBeforeEvent !== countSlide) waitSeconds(3);
	else ready = true;
});

window.addEventListener("load", function () {
	//timeout 10ms pour attendre que la page est refresh pour scroll to top
	setTimeout(function () {
		html.scrollTop = 0;
		html.style.scrollBehavior = "smooth";
		html.style.overflowY = "auto";
	}, 10);

	setTimeout(function () {
		AOS.init({
			duration: 750,
			// disable: function () {
			// 	return window.matchMedia("(max-width: 767.68px)").matches || window.matchMedia("(max-height: 705px)").matches || mobile;
			// },
			easing: "ease-in-out",
			once: true,
			//box trigger - window trigger
			anchorPlacement: "top-bottom",
		});

		document.getElementById("loader").classList.add("fadeOut");
		resetSlide(nbSlides - 1, "-100%");
	}, 250);

	nav();

	swiper.run();

	//si animation sur le slider, attendre qu'il apparaisse pour commencer l'auto swipe
	if (window.matchMedia("(min-width: 768px)").matches) {
		document.addEventListener("aos:in", ({ detail }) => {
			if (detail.id === "slider-container") {
				clearInterval(sliderInterval);
				sliderInterval = setInterval(function () {
					if (ready && readySlide) slideSuivante();
				}, 3000);
			}
		});
	} else {
		clearInterval(sliderInterval);
		sliderInterval = setInterval(function () {
			if (ready && readySlide) slideSuivante();
		}, 3000);
	}

	// Set copyright to current year
	const copyrightYear = document.querySelector("#copyright-year");
	copyrightYear.textContent = new Date().getFullYear();
});

window.addEventListener("resize", nav);
window.addEventListener("orientationchange", nav);

const blocks = document.querySelectorAll("section, header, footer");
const links = document.querySelectorAll("header .nav-link");

window.onscroll = () => {
	if (window.matchMedia("(min-width: 991px)").matches) {
		let current = "";

		for (const block of blocks) {
			const blockTop = block.offsetTop;

			// si scroll a la fin de page, met contact en active
			// fix le fait qu'on scroll pas assez pour depasser le titre de contact

			const blockPassed = window.scrollY >= blockTop - 60;
			const pageEnd = window.innerHeight + window.scrollY >= document.body.offsetHeight;

			if (pageEnd || blockPassed) {
				current = block.getAttribute("id");
				break;
			}
		}

		links.forEach((li) => {
			li.classList.remove("active");

			if (li.href.indexOf(current) != -1) {
				li.classList.add("active");
			}
		});
	}
};
