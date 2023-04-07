import Swiper, {
	Keyboard,
	Mousewheel,
	EffectCreative,
	Thumbs,
	FreeMode,
} from "swiper";
import { ww, header, footer } from "./main";
import Splitting from "splitting";
export var fullpage_main;
export const fullPage = {
	slide: () => {
		if (ww >= 1280 && $(".fullpage").length == 1) {
			var fullpage_thumb = new Swiper(".fullpage-thumb .swiper", {
				observer: true,
				observeParents: true,
				direction: "vertical",
				allowTouchMove: false,
				slidesPerView: "auto",
				speed: 800,
			});
			// Counter & append
			$(".fullpage-swiper .section-slide").each(function (e) {
				var title = $(this).attr("data-title");
				var id;
				if (e < 9) {
					id = "0" + (e + 1);
				} else {
					id = e + 1;
				}

				$(".fullpage-thumb .swiper-wrapper").append(
					`<div class="swiper-slide" style="transition-delay:${
						e * 0.15
					}s"><div class="wrapper"><div class="title" data-splitting>${title}</div><div class="number">${id}</div></div></div>`
				);
			});
			Splitting();
			$(".fullpage-thumb").attr("currentFullPageSlide", 1);
			header.attr("currentFullPageSlide", 1);
			fullpage_main = new Swiper(".fullpage-swiper .swiper-fullpage", {
				modules: [
					Keyboard,
					Mousewheel,
					// EffectCreative,
					Thumbs,
					FreeMode,
				],
				spaceBetween: 0,
				direction: "vertical",
				speed: 800,
				observer: true,
				observeParents: true,
				mousewheel: {
					forceToAxis: true,
					thresholdTime: 1200,
				},
				thumbs: {
					swiper: fullpage_thumb,
				},
				keyboard: {
					enabled: true,
				},
				freeMode: false,
				slidesPerView: 1,
				allowTouchMove: false,
				// effect: "creative",
				// creativeEffect: {
				// 	prev: {
				// 		shadow: true,
				// 		translate: [0, "-50%", -1],
				// 	},
				// 	next: {
				// 		translate: [0, "100%", 1],
				// 	},
				// },
				on: {
					slideChange: () => {
						var index = fullpage_main.activeIndex + 1;
						$(".fullpage-thumb").attr(
							"currentFullPageSlide",
							index
						);
						header.attr("currentFullPageSlide", index);
						$("main").attr("currentFullPageSlide", index);
						footer.attr("currentFullPageSlide", index);
					},
				},
			});
			if (ww >= 1280 && $(".fullpage").length == 1) {
				fullpage_main.on("slideChangeTransitionStart", function () {
					var bannerVideo = $("#main-banner .swiper-slide video");
					bannerVideo
						.closest(".swiper-slide")
						.removeClass("playVideo");
					bannerVideo
						.closest(".swiper-slide")
						.find(".button-play")
						.removeClass("play");
					bannerVideo.get(0).pause();
					$("body.fullpage").removeClass("videoStartPlaying");
				});
			}
		} else {
			$(".swiper-fullpage").removeClass("swiper");
			$(".fullpage-thumb").remove();
		}
	},
	clickNextFrame: () => {
		$(".nextFrame").on("click", function () {
			fullpage_manpmin.slideNext();
		});
	},
	clickToFirstFrame: () => {
		if ($(".fullpage-swiper").length && ww >= 1280) {
			fullpage_main.on("slideChangeTransitionStart", function (slide) {
				slide.activeIndex > 0
					? $(".backToTopFullPage").addClass("active")
					: $(".backToTopFullPage").removeClass("active");
			});
			$(".backToTopFullPage").on("click", function () {
				ww >= 1280 ? fullpage_main.slideTo(0) : null;
			});
		}
	},
	controlVideo: () => {
		// Default Value
		const $$ = document.querySelector.bind(document);
		const videoControls = $$(".video-controls");
		if (videoControls) {
			const video = $$(".index-3 video");
			var btnTogglePlay = $$(".video-controls .toggle-PausePlay");
			var btnToggleMuted = $$(".video-controls .toggle-muted");
			var timeElapsed = $$(".video-controls .time-elapsed");
			var timeDuration = $$(".video-controls .time-duration");
			var timeBar = $$(".video-controls .time-bar");
			var seek = $$(".video-controls .time-bar .seek");
			var btnFullScreen = $$(".video-controls .btn-fullScreen");
			var isMouseDown = false;

			function togglePlay() {
				if (video.paused || video.ended) {
					btnTogglePlay.classList.add("active");
					video.play();
				} else {
					btnTogglePlay.classList.remove("active");
					video.pause();
				}
			}
			// Toggle Play
			btnTogglePlay.addEventListener("click", togglePlay);
			// Toggle playback state
			function updatePlayButton() {
				if (video.paused) {
					btnTogglePlay.setAttribute("data-state", "pause");
				} else {
					btnTogglePlay.setAttribute("data-state", "play");
				}
			}
			video.addEventListener("play", updatePlayButton);
			video.addEventListener("pause", updatePlayButton);

			function formatTime(timeInSeconds) {
				const result = new Date(timeInSeconds * 1000)
					.toISOString()
					.substr(11, 8);

				// console.log("🤌 ~ formatTime ~ result", result);
				return {
					minutes: result.substr(3, 2),
					seconds: result.substr(6, 2),
				};
			}

			function initializeVideo() {
				const videoDuration = Math.round(video.duration);
				const time = formatTime(videoDuration);
				timeDuration.innerText = `${time.minutes}:${time.seconds}`;
				timeDuration.setAttribute(
					"data-time",
					`${time.minutes}m/${time.seconds}s`
				);
			}

			video.addEventListener("loadedmetadata", initializeVideo);
			function updateTimeElapsed() {
				const videoDuration = Math.round(video.duration);
				const videoCurrent = Math.round(video.currentTime);
				const time = formatTime(videoCurrent);
				const percent = (videoCurrent / videoDuration) * 100;
				seek.style.left = percent + "%";
				timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
				timeElapsed.setAttribute(
					"data-time",
					`${time.minutes}m/${time.seconds}s`
				);
				timeBar.style.setProperty("--data-progress", percent + "%");
			}
			video.addEventListener("timeupdate", updateTimeElapsed);
			//
			//
			//
			//

			// Toggle muted
			function toggleMute() {
				video.muted = !video.muted;
				if (video.muted) {
					video.muted = true;
					btnToggleMuted.setAttribute("data-muted", "muted");
					btnToggleMuted.classList.remove("active");
				} else {
					video.muted = false;
					btnToggleMuted.setAttribute("data-muted", "unmuted");
					btnToggleMuted.classList.add("active");
				}
			}
			btnToggleMuted.addEventListener("click", toggleMute);

			var offsetDrag = 0;
			var offsetClick = 0;
			// Bar drag
			seek.addEventListener(
				"mousedown",
				function (e) {
					isMouseDown = true;
					offsetDrag = seek.offsetLeft - e.clientX;
				},
				true
			);
			document.addEventListener(
				"mouseup",
				function () {
					isMouseDown = false;
				},
				true
			);
			timeBar.addEventListener(
				"mousemove",
				function (e) {
					event.preventDefault();
					var wrapperWidth = timeBar.offsetWidth;
					var percent =
						((e.clientX + offsetDrag) / wrapperWidth) * 100;
					if (percent >= 100) percent = 100;
					if (percent < 0) percent = 0;
					const videoDuration = Math.round(video.duration);
					var seekDrag = (percent / 100) * videoDuration;
					if (isMouseDown) {
						seek.style.left = percent + "%";
						video.currentTime = seekDrag;
						video.addEventListener("timeupdate", updateTimeElapsed);
					}
				},
				true
			);

			// Bar Click
			timeBar.addEventListener(
				"click",
				function (e) {
					event.preventDefault();
					var wrapperWidth = timeBar.offsetWidth;
					var percent =
						((e.clientX - timeBar.getBoundingClientRect().left) /
							wrapperWidth) *
						100;
					if (percent >= 100) percent = 100;
					if (percent < 0) percent = 0;
					seek.style.left = percent + "%";
					const videoDuration = Math.round(video.duration);
					var seekDrag = (percent / 100) * videoDuration;
					video.currentTime = seekDrag;
					video.addEventListener("timeupdate", updateTimeElapsed);
				},
				true
			);

			// Click video to Play
			video.addEventListener("click", togglePlay);

			// Full Screen
			function fullScreenVideo() {
				$(this).toggleClass("enterFullscreenBtn");
				if ($.isFunction(video.webkitEnterFullscreen)) {
					if ($(this).hasClass("enterFullscreenBtn"))
						document
							.getElementById("video-container")
							.webkitRequestFullScreen();
					else document.webkitCancelFullScreen();
				} else if ($.isFunction(video.mozRequestFullScreen)) {
					if ($(this).hasClass("enterFullscreenBtn"))
						document
							.getElementById("video-container")
							.mozRequestFullScreen();
					else document.mozCancelFullScreen();
				} else {
					alert("Your browsers doesn't support fullscreen");
				}
			}

			btnFullScreen.addEventListener("click", fullScreenVideo);

			// Toggle show controls
			function hideControls() {
				if (video.paused) {
					return;
				}
				videoControls.classList.add("hide");
			}
			function showControls() {
				videoControls.classList.remove("hide");
			}
			var moveTimer;
			video.addEventListener("mousemove", function () {
				showControls();
				clearTimeout(moveTimer);
				moveTimer = setTimeout(function () {
					hideControls();
				}, 2000);
			});
			videoControls.addEventListener("mousemove", function () {
				showControls();
				clearTimeout(moveTimer);
				moveTimer = setTimeout(function () {
					hideControls();
				}, 2000);
			});
		}
	},
	onLayoutClickAllEvent: () => {
		$("li.to-subscribe-form").on("click", function () {
			fullpage_main != undefined
				? fullpage_main.slideTo(9)
				: $("html, body").animate(
						{ scrollTop: $(document).height() },
						1000
				  );
		});
	},
	init: () => {
		fullPage.slide();
		// fullPage.controlVideo();
		fullPage.onLayoutClickAllEvent();
		fullPage.clickToFirstFrame();
	},
};
