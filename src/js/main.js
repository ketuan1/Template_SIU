import { globalJS } from "./global";
import { swiperInit, swiper_main_banner } from "./SwiperInit";
import columns from "columns.js";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";

var MenuSpy = require("menuspy");

$.fn.hasAttr = function (name) {
	return this.attr(name) !== undefined;
};

// ******* Global Variable s*******

// *** Window
export var ww = $(window).width();
var body = $("body");
// *** Header *** //
export var header = $("header");
var height_header = header.outerHeight();
var menu_nav = header.find("nav");
var burger = header.find("#burger");
var overlay = $("#overlay");
// *** Nav Mobile *** //
var nav_mobile = $(".nav-mobile");
var ul_Child = nav_mobile.find(".has-child");
var close_NB = nav_mobile.find(".close-nav-mobile");
// *** Banner *** //
var pagesBanner = $("#page-banner");
var mainBanner = $("#main-banner");
// *** Footer *** //
var mainSection = $("main");
export var footer = $("footer");
// *** Component *** //
// Search
var btn_BackToTop = $("#back-to-top");

const headerFunction = {
	onScroll: () => {
		$(window).on("scroll", function () {
			if ($(this).scrollTop() > height_header) {
				header.addClass("header-scroll");
				$(".search-overlay").addClass("header-scroll");
			} else {
				header.removeClass("header-scroll");
				$(".search-overlay").removeClass("header-scroll");
			}
			height_header = header.outerHeight();
			$("html").css({
				"--header-height": height_header + "px",
			});
			if ($(this).scrollTop() == 0) {
				setTimeout(() => {
					height_header = header.outerHeight();
					$("html").css({
						"--header-height": height_header + "px",
					});
				}, 300);
			}
		});
		if ($(window).scrollTop() > height_header) {
			setTimeout(() => {
				header.addClass("header-scroll");
				setTimeout(() => {
					height_header = header.outerHeight();
					$("html").css({
						"--header-height": header.outerHeight() + "px",
					});
				}, 500);
			}, 300);
		}
	},
	removeActiveCpn: () => {
		burger.removeClass("active");
		nav_mobile.removeClass("active");
		overlay.removeClass("active");
		body.removeClass("ovh");
		header.removeClass("navMobileOpen");
	},
	navMobileSlide: () => {
		burger.on("click", function () {
			burger.toggleClass("active");
			nav_mobile.toggleClass("active");
			overlay.toggleClass("active");
			body.toggleClass("ovh");
			header.toggleClass("navMobileOpen");
		});
		overlay.on("click", function () {
			headerFunction.removeActiveCpn();
		});
		close_NB.on("click", function () {
			headerFunction.removeActiveCpn();
		});
	},
	searchActive: () => {
		//
		$(".search-icon").on("click", function () {
			$(".search-overlay").addClass("active");
			setTimeout(() => {
				$(".search-overlay .searchbox input").trigger("focus");
			}, 500);
		});
		$(".search-overlay .searchbox input").on("focus", function () {
			$(this).parent().addClass("active");
		});
		$(".search-overlay .searchbox input").on("focusout", function () {
			$(this).parent().removeClass("active");
		});
		$(document).on("click", function (event) {
			var $trigger = $("header");
			var $trigger_2 = $(".search-overlay");
			if (
				$trigger !== event.target &&
				!$trigger.has(event.target).length &&
				$trigger_2 !== event.target &&
				!$trigger_2.has(event.target).length
			) {
				$(".search-overlay").removeClass("active");
			}
		});
		$(".close-search").on("click", function () {
			$(".search-overlay").removeClass("active");
		});
		$(".search-overlay input").keyup(function () {
			$(".search-overlay .searchbox").addClass("fixed-title");
			if ($(this).val() == "") {
				$(".search-overlay .searchbox").removeClass("fixed-title");
			}
		});
		// Press ESC to close Search
		setTimeout(() => {
			$(window).on("keyup", function (event) {
				var e = event.keyCode;
				if (e == 27) {
					$(".search-overlay").removeClass("active");
				}
			});
		}, 500);

		// Trigger click with 2 button
		$(".search-overlay .searchbox input[type='text']").keypress(function (
			n
		) {
			if (n.keyCode == 13)
				$(".searchbox button").trigger("click"), console.log("click");
		});
	},
	userAuthorize: () => {
		$(".user-authorize .icon-size").on("click", function () {
			$(".user-authorize").toggleClass("active");
		});
		$(document).on("click", function (event) {
			var $trigger = $("header");
			var $trigger_2 = $(".user-authorize");
			if (
				$trigger !== event.target &&
				!$trigger.has(event.target).length &&
				$trigger_2 !== event.target &&
				!$trigger_2.has(event.target).length
			) {
				$(".user-authorize").removeClass("active");
			}
		});
	},
	escBtn: () => {
		$(window).on("keyup", function (event) {
			var e = event.keyCode;
			if (e == 27) {
				nav_mobile.removeClass("active");
				header.removeClass("blur-content");
				burger.removeClass("active");
				overlay.removeClass("active");
				body.removeClass("ovh");
				header.removeClass("navMobileOpen");
			}
		});
	},
	menuMobileNav: () => {
		$(document).on(
			"click",
			".nav-mobile nav li.drop-down >.title >em",
			function () {
				$(this).closest("li").siblings().removeClass("active");
				$(this).closest("li").toggleClass("active");
				$(this).closest("li").siblings().find(">ul").slideUp();
				$(this).closest("li").find(">ul").slideToggle();
			}
		);
	},
	menuDelayItem: () => {
		header.find(".middle li").each(function (e) {
			e++;
			$(this).css({
				"transition-delay": e * 0.15 + "s",
			});
		});
	},
	init: () => {
		headerFunction.menuDelayItem();
		headerFunction.onScroll();
		headerFunction.navMobileSlide();
		headerFunction.searchActive();
		headerFunction.userAuthorize();
		headerFunction.menuMobileNav();
		headerFunction.escBtn();
	},
};

function counterUpNumber(separator = ".") {
	const options = {
		separator: separator,
		enableScrollSpy: true,
	};
	var counters = document.querySelectorAll(".counter");
	counters.forEach((counter) => {
		var countUp = new CountUp(counter, counter.textContent, options);
		countUp.start();
	});
}

function accordion() {
	var item = $(".accordion-item");
	var title = $(".accordion-title");
	var content = $(".accordion-content");
	title.on("click", function () {
		$(this).toggleClass(".active");
		$(this).closest(item).toggleClass("active");
		$(this).closest(item).find(content).slideToggle();
	});
	// Onload
	item.eq(0).addClass("active");
	item.eq(0).find(content).slideDown();
}

function convertBytesToMB(bytes) {
	var mb = (bytes / (1024 * 1024)).toFixed(2);
	return (Math.ceil(mb / 0.05) * 0.05).toFixed(2);
}

function fancyboxCustom() {
	Fancybox.bind("[custom-box-member]", {
		dragToClose: false,
		mainClass: "custom-box-member",
		template: {
			closeButton: '<em class="fa-light fa-xmark"></em>',
		},
		on: {
			done: function () {
				console.log("open");
			},
			closing: function () {
				console.log("close");
			},
		},
	});
	Fancybox.bind("[custom-contact-popup]", {
		dragToClose: false,
		mainClass: "custom-contact-popup",
		template: {
			closeButton: '<em class="fa-light fa-xmark"></em>',
		},
		on: {
			done: function () {
				console.log("open");
			},
			closing: function () {
				console.log("close");
			},
		},
	});
	Fancybox.defaults.parentEl = document.getElementById("aspnetForm");
}

function screenImage() {
	var touchItem = $("[has-touch-screen]");
	var screenLeft = $(this).attr("screen-left");
	var screenRight = $(this).attr("screen-right");
	var screen = ($(window).width() - $("main .container").width()) * 0.5;
	if (ww >= 1280) {
		setTimeout(() => {
			touchItem.each(function () {
				if ($(this).hasAttr("screen-left")) {
					$(this).css("margin-left", -screen);
				} else {
					$(this).css("margin-right", -screen);
				}
				$(this).addClass("screen-initial");
			});
		}, 150);
	} else {
		setTimeout(() => {
			touchItem.each(function () {
				if ($(this).hasAttr("screen-left")) {
					$(this).css("margin-left", "unset");
				} else {
					$(this).css("margin-right", "unset");
				}
				$(this).removeClass("screen-initial");
			});
		}, 150);
	}
}

function useVariables() {
	return {
		counterUpNumber,
		convertBytesToMB,
	};
}

function toggleFaqsAskModule() {
	var item = $(".faqs-module .item .top");
	item.on("click", function () {
		$(this).parent().toggleClass("active");
		if ($(this).closest(".faq-ask-module").hasAttr("faq-toggle-class")) {
			//
		} else {
			$(this).siblings().slideToggle();
		}
	});
}

const styleBreadcrumb = () => {
	if (pagesBanner.length == 1 && $(".recruitment-detail-page").length == 0) {
		$(".global-breadcrumb").appendTo(pagesBanner.find(".breadcrumb-here"));
		//
		pagesBanner
			.find(".title")
			.text($(".global-breadcrumb li").eq(1).text());
	} else {
		$(".global-breadcrumb").wrap("<div class='normal-breadcrumb'></div>");
		ww >= 1280 && $(".homepage").length != 1
			? $("main").css({ "margin-top": height_header })
			: null;
		$(".homepage").length != 1 ? header.addClass("fixed-bgWhite") : null;
	}
};

function ccPaginationMapping() {
	$(".modulepager .pagination")
		.find("a.NextPage, a.LastPage, a.BackPage, a.FirstPage")
		.parent()
		.hide();
	if ($(".newslist").length) {
		$(".pages.newspager").appendTo($(".newslist .col-left"));
	}
	if ($(".recruit-list-3").length) {
		$(".pages.productpager").appendTo($(".recruit-list-3 .container"));
	}
}
function expandItem() {
	// Filter Load
	var hasLoadBtn = $("[has-expand-btn]");
	hasLoadBtn.each(function () {
		var $this = $(this);
		var expandBtn = $(this).find(".expand-btn");
		var list = $(this).find(".expand-item").length;
		var count;
		var countMobile = $(this).attr("item-count-mobile");
		countMobile != undefined && countMobile != 0 && ww < 576
			? (count = Number($(this).attr("item-count-mobile")))
			: (count = Number($(this).attr("item-count")));
		var expand = Number($(this).attr("item-expand"));
		var isFlex = false;
		$(this).hasAttr("expand-flex") ? (isFlex = true) : (isFlex = false);
		//=// Init

		function init(initValue, thisFunction) {
			isFlex
				? thisFunction
						.find(".expand-item")
						.slice(0, initValue)
						.slideDown({
							complete: function () {
								$(this).css("display", "flex");
								$(this).css("flex-direction", "column");
								setTimeout(() => {
									$(this).addClass("done-animated");
								}, 300);
							},
						})
				: thisFunction
						.find(".expand-item")
						.slice(0, initValue)
						.slideDown({
							complete: function () {
								setTimeout(() => {
									$(this).addClass("done-animated");
								}, 300);
							},
						});
			if (list == 0 || list <= initValue) {
				expandBtn.hide();
			}
		}
		init(count, $this);

		// Click
		function expandBtnInit(initCount, thisFunction) {
			count = initCount + expand <= list ? initCount + expand : list;
			isFlex
				? thisFunction
						.closest(hasLoadBtn)
						.find(".expand-item")
						.slice(0, count)
						.slideDown({
							complete: function () {
								$(this).css("display", "flex");
								$(this).css("flex-direction", "column");
								setTimeout(() => {
									$(this).addClass("done-animated");
								}, 300);
							},
						})
				: thisFunction
						.closest(hasLoadBtn)
						.find(".expand-item")
						.slice(0, count)
						.slideDown({
							complete: function () {
								setTimeout(() => {
									$(this).addClass("done-animated");
								}, 300);
							},
						});
			// console.log(count);
			if (count == list) {
				thisFunction.slideUp();
			}
		}
		expandBtn.on("click", function (e) {
			e.preventDefault();
			expandBtnInit(count, $(this));
		});
	});
}

$(document).ready(function () {
	// ---***--- Global JS ---***---
	globalJS.init();

	// ---***--- Header ---***---
	headerFunction.init();
	// ---***--- Swiper Init ---***---
	swiperInit();

	// ---***--- Body ---***---
	toggleFaqsAskModule();
	counterUpNumber();

	// Template Page

	// ---***--- Fancybox ---***---
	fancyboxCustom();

	// ---***--- Other ---***---
	styleBreadcrumb();
	ccPaginationMapping();
	expandItem();
});

$(window).resize(function () {
	height_header = header.outerHeight();
	$("html").css({
		"--header-height": height_header + "px",
		"--fixed-header-height": height_header + "px",
	});
	screenImage();
});
$(window).trigger("resize");

// ***** Preload ***** //
document.onreadystatechange = () => {
	if (document.readyState === "complete") {
		/**
		 * Turn on when Deploy
		 */
		if ($("body.homepage").length) header.addClass("init");
		pagesBanner.addClass("initial");

		// Load to section
		if (window.location.href.indexOf("#") != -1) {
			onLoadToSection();
		}
	}
};

window.externalJS = {
	useVariables,
};
