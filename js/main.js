class Swipe {
	constructor(element) {
		this.xDown = null;
		this.yDown = null;
		this.element = typeof element === "string" ? document.querySelector(element) : element;

		this.element.addEventListener(
			"touchstart",
			function (evt) {
				this.xDown = evt.touches[0].clientX;
				this.yDown = evt.touches[0].clientY;
			}.bind(this),
			{ passive: false }
		);
	}

	onLeft(callback) {
		this.onLeft = callback;

		return this;
	}

	onRight(callback) {
		this.onRight = callback;

		return this;
	}

	onUp(callback) {
		this.onUp = callback;

		return this;
	}

	onDown(callback) {
		this.onDown = callback;

		return this;
	}

	handleTouchMove(evt) {
		if (!this.xDown || !this.yDown) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		this.xDiff = this.xDown - xUp;
		this.yDiff = this.yDown - yUp;

		if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
			// Most significant.
			if (this.xDiff > 0) {
				this.onLeft();
			} else {
				this.onRight();
			}
		} else {
			if (this.yDiff > 0) {
				this.onUp();
			} else {
				this.onDown();
			}
		}

		// Reset values.
		this.xDown = null;
		this.yDown = null;
	}

	run() {
		this.element.addEventListener(
			"touchmove",
			function (evt) {
				this.handleTouchMove(evt).bind(this);
			}.bind(this),
			{ passive: false }
		);
	}
}

slidesData.forEach((data, index) => {
	let template = document.getElementById("slide-template");
	let element = document.importNode(template.content, true);

	let divElem = element.querySelector(".slider-item");

	let indicatorElem = document.createElement("li");
	indicatorElem.id = index;

	if (index == 0) {
		indicatorElem.classList.add("active");
		divElem.classList.add("active");
	}
	document.getElementById("slider-nav").appendChild(indicatorElem);

	//title
	let titleElem = element.querySelector("h3");
	titleElem.textContent = data.title;

	let linkElem = divElem.querySelector("a");

	if (data.link == "") {
		linkElem.replaceWith(...linkElem.childNodes);
	} else {
		linkElem.href = data.link;
		linkElem.title = "Voir le projet";

		titleElem.innerHTML += `&ensp;<i class="fas fa-external-link-alt"></i>`;
	}

	//bacnground image of the slide
	let img = element.querySelector("img");
	img.src = "images/" + data.img.name;
	img.title = data.img.title;
	img.alt = data.img.alt;

	//text content of the slide
	let list = element.querySelectorAll("li");
	list.forEach((liElem, index) => {
		if (index == 0) liElem.querySelector("div").innerHTML += data.text[index];
		else liElem.innerHTML += data.text[index];
	});

	document.getElementById("slider-container").insertBefore(element, template);
});

const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const slides = document.querySelectorAll(".slider-item");
const slidesIndicators = document.querySelectorAll("#slider-nav li");
const nbSlides = slides.length;

let countSlide = 0;
let previousCount;

let fait = false;

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
	if ((window.matchMedia("(max-width: 767.68px)").matches || window.matchMedia("(max-height: 705px)").matches) && aosActive) {
		AOS.refreshHard();
		aosActive = false;

		clearInterval(sliderInterval);
		sliderInterval = setInterval(function () {
			if (ready && readySlide) slideSuivante();
		}, 3000);
	} else if (window.matchMedia("(min-width: 767.68px)").matches && window.matchMedia("(min-height: 705px)").matches && !aosActive) {
		AOS.refreshHard();
		aosActive = true;

		clearInterval(sliderInterval);
		sliderInterval = setInterval(function () {
			if (ready && readySlide) slideSuivante();
		}, 3000);
	}

	if (window.matchMedia("(max-width: 991px)").matches) {
		if (!fait) {
			fait = true;

			document.getElementById("navigation").classList.remove("fadeIn");
			document.getElementById("navigation").style.animationDuration = "0s";
			document.getElementById("navigation").classList.add("fadeOut");

			//prevent fadeOut on resize
			setTimeout(function () {
				document.getElementById("navigation").style.animationDuration = "250ms";
			}, 250);

			document.getElementById("menu").classList.remove("change");
			document.querySelector("html").style.overflowY = "auto";
		}
	} else {
		document.getElementById("navigation").style.display = null;
		document.getElementById("navigation").classList.remove("fadeOut");
		document.getElementById("navigation").classList.remove("fadeIn");
		fait = false;
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
		fait = true;
		if (document.getElementById("navigation").classList.contains("fadeIn")) {
			//.style.display !== "none") {
			document.getElementById("navigation").classList.add("fadeOut");
			document.getElementById("navigation").classList.remove("fadeIn");

			document.getElementById("menu").classList.remove("change");
			document.querySelector("html").style.overflowY = "auto";
		} else {
			document.getElementById("navigation").classList.add("fadeIn");
			document.getElementById("navigation").classList.remove("fadeOut");
			document.getElementById("menu").classList.add("change");
			document.querySelector("html").style.overflowY = "hidden";
		}
	}
}

let handler = function (e) {
	slideX(e.target.id);

	//mobile no mouse leave so wait 3s
	if (mobile) waitSeconds(3);
};

document.getElementById("menu").addEventListener("click", showNav);

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

/*document.querySelectorAll("header .nav-link").forEach((link) => {
	link.addEventListener("click", function () {
		document.querySelectorAll("header nav ul").forEach((item) => {
			item.querySelector(".active").classList.remove("active");
		});

		this.classList.add("active");
	});
});

document.querySelectorAll("footer .second-nav-link").forEach((link) => {
	link.addEventListener("click", function () {
		document.querySelectorAll("header nav ul").forEach((headerItem) => {
			headerItem.querySelector(".active").classList.remove("active");
		});

		let clickedLink = this;
		document.querySelectorAll("header nav ul li a").forEach((item) => {
			if (item.href == clickedLink.href) {
				item.classList.add("active");
			}
		});
	});
});*/

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
		document.querySelector("html").scrollTop = 0;
		document.querySelector("html").style.scrollBehavior = "smooth";
		document.querySelector("html").style.overflowY = "auto";
	}, 10);

	setTimeout(function () {
		AOS.init({
			duration: 750,
			disable: function () {
				return window.matchMedia("(max-width: 767.68px)").matches || window.matchMedia("(max-height: 705px)").matches || mobile;
			},
			easing: "ease-in-out",
			once: true,
			//box trigger - window trigger
			anchorPlacement: "center-bottom",
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

const mainTop = document.querySelector("main").offsetTop;

window.onscroll = () => {
	if (window.matchMedia("(min-width: 991px)").matches) {
		let current = "";

		blocks.forEach((block) => {
			let blockTop = block.offsetTop;

			//si section alors ajoute le top du main car le 0 est décalé
			//sinon si header ou footer, le body est au debut de la page donc pas de décalage
			if (block.nodeName === "SECTION") {
				blockTop += mainTop;
			}

			//si scroll a la fin de page, met contact en active
			//fix le fait qu'on scroll pas assez pour depasser le titre de contact
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				current = block.getAttribute("id");
			} else if (window.scrollY >= blockTop - 60) {
				current = block.getAttribute("id");
			}
		});

		links.forEach((li) => {
			li.classList.remove("active");
			if (li.href.indexOf(current) != -1) {
				li.classList.add("active");
			}
		});
	}
};
