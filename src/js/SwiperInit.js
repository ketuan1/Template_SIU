import Swiper, { EffectCreative, Navigation, Pagination, Thumbs } from "swiper";
import { ww } from "./main";

export var swiper_main_banner;

function autoSlideNextOnThumbSlide(initSwiper, element, thumb) {
	let activeIndex = initSwiper.activeIndex + 1;
	let activeSlide = document.querySelector(
		`${element} ${thumb} .swiper-slide:nth-child(${activeIndex})`
	);
	let nextSlide = document.querySelector(
		`${element} ${thumb} .swiper-slide:nth-child(${activeIndex + 1})`
	);
	let prevSlide = document.querySelector(
		`${element} ${thumb} .swiper-slide:nth-child(${activeIndex - 1})`
	);

	if (nextSlide && !nextSlide.classList.contains("swiper-slide-visible")) {
		initSwiper.thumbs.swiper.slideNext();
	} else if (
		prevSlide &&
		!prevSlide.classList.contains("swiper-slide-visible")
	) {
		initSwiper.thumbs.swiper.slidePrev();
	}
}
export function swiperInit() {
	var swiperParameter = {
		speed: 500,
		observer: true,
		observeParents: true,
		breakpoints: {
			1280: {
				spaceBetween: 30,
				slidesPerView: 3,
			},
			1024: {
				spaceBetween: 15,
				slidesPerView: 3,
			},
			576: {
				spaceBetween: 15,
				slidesPerView: 2,
			},
			320: {
				spaceBetween: 10,
				slidesPerView: 1,
			},
		},
	};
	var swiperParameter_xl_4 = {
		speed: 500,
		observer: true,
		observeParents: true,
		breakpoints: {
			1280: {
				spaceBetween: 30,
				slidesPerView: 4,
			},
			1024: {
				spaceBetween: 15,
				slidesPerView: 3,
			},
			576: {
				spaceBetween: 15,
				slidesPerView: 2,
			},
			320: {
				spaceBetween: 10,
				slidesPerView: 1,
			},
		},
	};
	swiper_main_banner = new Swiper("#main-banner .swiper", {
		modules: [Pagination, EffectCreative],
		spaceBetween: 0,
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				translate: ["-20%", 0, -1],
			},
			next: {
				translate: ["100%", 0, 0],
			},
		},
		// allowTouchMove: false,
		speed: 500,
		observer: true,
		observeParents: true,
		pagination: {
			el: "#main-banner .swiper-pagination",
			clickable: true,
		},
	});

	var home_2_thumb = new Swiper(".home-2 .thumb .swiper", {
		speed: 500,
		observer: true,
		observeParents: true,
		allowTouchMove: false,
		watchSlidesProgress: true,
		breakpoints: {
			1280: {
				slidesPerView: 3,
				spaceBetween: 20,
				direction: "vertical",
			},
			768: {
				slidesPerView: 4,
			},
			576: {
				slidesPerView: 3,
			},
			320: {
				slidesPerView: 2,
			},
		},
	});

	var home_2_main = new Swiper(".home-2 .main .swiper", {
		modules: [Navigation, Thumbs],
		speed: 500,
		observer: true,
		observeParents: true,
		spaceBetween: 0,
		thumbs: {
			swiper: home_2_thumb,
		},
		navigation: {
			prevEl: ".home-2 .button-prev",
			nextEl: ".home-2 .button-next",
		},
		on: {
			slideChange: function () {
				//
				autoSlideNextOnThumbSlide(this, ".home-2", ".thumb");
			},
		},
	});

	var home_4 = new Swiper(".home-4 .swiper", {
		modules: [Navigation],
		speed: 500,
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		navigation: {
			prevEl: ".home-4 .button-prev",
			nextEl: ".home-4 .button-next",
		},
	});

	var home_9 = new Swiper(".home-9 .swiper", {
		modules: [Navigation],
		speed: 500,
		observer: true,
		observeParents: true,
		navigation: {
			prevEl: ".home-9 .button-prev",
			nextEl: ".home-9 .button-next",
		},
		breakpoints: {
			1280: {
				spaceBetween: 35,
				slidesPerView: 5,
			},
			1024: {
				spaceBetween: 20,
				slidesPerView: 4,
			},
			576: {
				spaceBetween: 15,
				slidesPerView: 3,
			},
			320: {
				spaceBetween: 5,
				slidesPerView: 3,
			},
		},
	});
	var home_10 = new Swiper(".home-10-slide .swiper", {
		modules: [Pagination],
		speed: 500,
		observer: true,
		observeParents: true,
		pagination: {
			el: ".home-10-slide .swiper-pagination",
			clickable: true,
		},
		breakpoints: {
			1280: {
				spaceBetween: 106,
				slidesPerView: 3,
			},
			1024: {
				spaceBetween: 20,
				slidesPerView: 3,
			},
			576: {
				spaceBetween: 10,
				slidesPerView: 2,
			},
			320: {
				spaceBetween: 5,
				slidesPerView: 1,
			},
		},
	});
	// **** Introduce **** //
	var introduce_5 = new Swiper(".introduce-5-slide .swiper", {
		modules: [Navigation],
		navigation: {
			prevEl: ".introduce-5-slide .button-prev",
			nextEl: ".introduce-5-slide .button-next",
		},
		observer: true,
		observeParents: true,
		breakpoints: {
			1280: {
				spaceBetween: 30,
				slidesPerView: 6,
			},
			1024: {
				spaceBetween: 10,
				slidesPerView: 5,
			},
			576: {
				spaceBetween: 10,
				slidesPerView: 4,
			},
			320: {
				spaceBetween: 10,
				slidesPerView: 3,
			},
		},
	});
	var introduce_7 = new Swiper(".introduce-7-slide .swiper", {
		modules: [Pagination],
		observer: true,
		observeParents: true,
		spaceBetween: 10,
		slidesPerView: 1,
		pagination: {
			el: ".introduce-7-slide .swiper-pagination",
			clickable: true,
		},
	});
	var introduce_8 = new Swiper(".introduce-8 .swiper", {
		modules: [Navigation],
		speed: 500,
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		...swiperParameter_xl_4,
		navigation: {
			prevEl: ".introduce-8 .button-prev",
			nextEl: ".introduce-8 .button-next",
		},
	});

	var cutru_2_3 = new Swiper(".cutru-2-3-slide .swiper", {
		modules: [Navigation],
		speed: 500,
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		...swiperParameter,
		navigation: {
			prevEl: ".cutru-2-3-slide .button-prev",
			nextEl: ".cutru-2-3-slide .button-next",
		},
	});
	var cutru_3_2 = new Swiper(".cutru-3-2-slide .swiper", {
		speed: 500,
		observer: true,
		observeParents: true,
		breakpoints: {
			1280: {
				slidesPerView: 4,
			},
			1024: {
				slidesPerView: 3,
			},
			576: {
				slidesPerView: 2,
			},
			320: {
				slidesPerView: 1,
			},
		},
	});
	var project_list = new Swiper(".project-list-slide .swiper", {
		modules: [Pagination],
		speed: 0,
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 30,
		allowTouchMove: false,
		pagination: {
			el: ".project-list-slide .swiper-pagination",
			clickable: true,
			renderBullet: function (index, className) {
				return (
					'<span class="' + className + '">' + (index + 1) + "</span>"
				);
			},
		},
	});
}
