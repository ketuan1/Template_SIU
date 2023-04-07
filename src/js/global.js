export const globalJS = {
	autoFillNoImage: () => {
		setTimeout(() => {
			$("img").each(function () {
				if ($(this).hasAttr("data-src")) {
					if ($(this).attr("data-src") === "") {
						$(this).attr("data-src", "/no-image.png");
						$(this).attr("src", "/no-image.png");
						$(this).addClass("noImage");
					}
				} else if ($(this).hasAttr("src")) {
					if ($(this).attr("src") === "") {
						$(this).attr("src", "/no-image.png");
						$(this).addClass("noImage");
					}
				}
			});
		}, 150);
	},
	autoAppend: () => {
		var appendId = $("[id*='autoAppend-']");
		appendId.each(function (e) {
			var id = $(this).attr("id").slice(11);
			// console.log(id);
			$(this).appendTo("[id*='autoAppendHere-" + id + "']");
			var curHeight = $(this).get(0).scrollHeight;
		});
	},
	autoClone: () => {
		var cloneId = $("[id*='autoClone-']");
		cloneId.each(function (e) {
			var id = $(this).attr("id").slice(10);
			// console.log(id);
			$(this)
				.clone()
				.appendTo("[id*='autoCloneHere-" + id + "']");
		});
	},
	setBackground: () => {
		var position = ["", "top", "left", "right", "bottom"];
		jQuery.each(position, function (index, item) {
			//
			//
			$(`[setBackground${item}]`).each(function () {
				var background = $(this).attr("setBackground" + item);
				$(this).css({
					"background-size": "cover",
					"background-position": `${item} center`,
					"background-image": `url(${background})`,
				});
			});
		});
	},
	scrollToTop: () => {
		$(window).on("scroll", function () {
			if ($(this).scrollTop() >= $("header").outerHeight() * 3) {
				$("#scrollToTop").addClass("active");
			} else {
				$("#scrollToTop").removeClass("active");
			}
		});
		$("#scrollToTop").on("click", function () {
			$("html,body").animate({
				scrollTop: 0,
			});
		});
	},
	checkListItem: () => {
		$("main ul").each(function () {
			$(this).addClass("list-item-added");
		});
	},
	inputButtonSubmit: () => {
		$("input[type='submit']").each(function () {
			if ($(this).parent().is(".btn")) {
				//
				$(this).parent().addClass("has-input-submit");
				$(this).parent().attr("data-title", $(this).val());
			}
		});
	},
	init: () => {
		globalJS.autoFillNoImage();
		globalJS.autoAppend();
		globalJS.autoClone();
		globalJS.setBackground();
		globalJS.scrollToTop();
		globalJS.inputButtonSubmit();
		globalJS.checkListItem();
	},
};
