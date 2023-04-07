const gulp = require("gulp");
const webp = require("gulp-webp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const Fiber = require("fibers");
const cssnano = require("cssnano");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const srcmap = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const c = require("ansi-colors");
const browsersync = require("browser-sync").create();
const prefixer = require("autoprefixer");
const clipboard = require("gulp-clipboard");
var postcss = require("gulp-postcss");
const cache = require("gulp-cache");
const cssImport = require("gulp-cssimport");
const sassUnicode = require("gulp-sass-unicode");
const del = require("del");
const plumber = require("gulp-plumber");
const cleanCSS = require("gulp-clean-css");
const readFileSync = require("graceful-fs").readFileSync;
const tailwindcss = require("tailwindcss");
const gTerser = require("gulp-terser");
var rollup = require("gulp-better-rollup");
var rollUpBabel = require("rollup-plugin-babel");
var commonjs = require("@rollup/plugin-commonjs");
var resolveRollUp = require("@rollup/plugin-node-resolve");

sass.compiler = require("dart-sass");
/* Options
 * ------ */
const options = {
	pug: {
		src: ["src/Public/**/*.pug"],
		all: "src/**/*.pug",
		dest: "dist",
	},
	scripts: {
		src: "src/js/main.js",
		dest: "dist/scripts",
	},
	CoreScripts: {
		dest: "dist/scripts",
	},
	ProcessStyles: {
		src: [
			"src/components/_core/_**.sass",
			"src/components/_core/**.sass",
			"src/components/_global/**.sass",
			"src/**/**.sass",
		],
		dest: "dist/styles",
	},
	ProcessTailwindCSS: {
		src: "src/tailwind/main.sass",
		dest: "dist/styles",
	},
	images: {
		src: "./src/img/**/**.{svg,png,jpg,speg,gif,jpge,PNG,JPGE,JPG,SVG,GIF,SPEG,mp4,mp3}",
		dest: "dist/img",
	},
	fonts: {
		src: "src/fonts/*",
		dest: "dist/fonts",
	},
	ProcessFontAwesomeCss: {
		src: "src/fontAwesome/*",
		dest: "dist/styles",
	},
	favicon: {
		src: "src/favicon.ico",
		dest: "dist",
	},
	browserSync: {
		baseDir: "dist",
	},
};

/* Browser-sync
 * ------------ */
function browserSync(done) {
	browsersync.init({
		notify: true,
		server: {
			baseDir: options.browserSync.baseDir,
		},
		port: 5000,
	});
	done();
}

/* Styles
 * ------ */
function ProcessTailwindCSS() {
	return gulp
		.src(options.ProcessTailwindCSS.src)
		.pipe(sass())
		.pipe(concat("tailwind.min.sass"))
		.pipe(
			plumber(function (err) {
				console.log("ProcessTailwindCSS Task Error");
				console.log(err);
				this.emit("end");
			})
		)
		.pipe(
			postcss([
				tailwindcss("./tailwind.config.js"),
				require("autoprefixer"),
			])
		)
		.pipe(
			rename({
				basename: "tailwind",
				suffix: ".min",
				extname: ".css",
			})
		)
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest(options.ProcessTailwindCSS.dest))
		.pipe(
			browsersync.reload({
				stream: true,
			})
		);
}

function ProcessFontAwesomeCss() {
	return gulp
		.src(options.ProcessFontAwesomeCss.src)
		.pipe(postcss([cssnano()]))
		.pipe(
			rename({
				basename: "fontAwesome",
				suffix: ".min",
				extname: ".css",
			})
		)
		.pipe(gulp.dest(options.ProcessFontAwesomeCss.dest))
		.pipe(
			browsersync.reload({
				stream: true,
			})
		);
}

function ProcessStyles() {
	return (
		gulp
			.src(options.ProcessStyles.src)
			.pipe(srcmap.init())
			.pipe(concat("main.min.sass"))
			.pipe(
				sass
					.sync({
						fiber: Fiber,
					})
					.on("error", sass.logError)
			)
			.pipe(sassUnicode())
			.pipe(cssImport())
			// .pipe(sass().on("error", sass.logError))
			.pipe(
				postcss([
					tailwindcss("./tailwind.config.js"),
					prefixer({
						env: ["last 4 version", "IE 9"],
						cascade: false,
					}),
					cssnano(),
				])
			)
			.pipe(
				rename({
					basename: "main",
					suffix: ".min",
					extname: ".css",
				})
			)
			.pipe(srcmap.write("."))
			.pipe(gulp.dest(options.ProcessStyles.dest))
			.pipe(
				browsersync.reload({
					stream: true,
				})
			)
	);
}

function CoreStyles() {
	let config = JSON.parse(readFileSync("./config.json"));
	return gulp
		.src(config.css, {
			allowEmpty: true,
		})
		.pipe(plumber())
		.pipe(concat("global.min.css"))
		.pipe(
			postcss([
				prefixer({
					overrideBrowserslist: ["last 4 version", "IE 10"],
					cascade: false,
					stats: ["> 1%, IE 10"],
				}),
				cssnano(),
			])
		)
		.pipe(gulp.dest("./dist/styles"))
		.pipe(
			browsersync.reload({
				stream: true,
			})
		);
}
/* Scripts
 * ------ */
function CoreScripts() {
	let config = JSON.parse(readFileSync("./config.json"));
	return gulp
		.src(config.js, {
			allowEmpty: true,
		})
		.pipe(concat("global.min.js"))
		.pipe(
			gTerser({
				mangle: {
					toplevel: true,
				},
			})
		)
		.pipe(
			rename({
				basename: "global",
				suffix: ".min",
				extname: ".js",
			})
		)
		.pipe(srcmap.write("."))
		.pipe(gulp.dest(options.CoreScripts.dest))
		.pipe(
			browsersync.reload({
				stream: true,
			})
		);
}
function ProcessScripts() {
	return gulp
		.src(options.scripts.src)
		.pipe(srcmap.init())
		.pipe(
			rollup(
				{
					plugins: [rollUpBabel(), commonjs(), resolveRollUp()],
				},
				{
					format: "umd",
				}
			)
		)
		.pipe(babel())
		.pipe(concat("main.min.js"))
		.pipe(
			gTerser({
				toplevel: false,
				keep_fnames: true,
				keep_classnames: true,
				mangle: false,
			})
		)
		.on("error", function (error) {
			if (error.plugin !== "gulp-terser") {
				console.log(error.message);
			}
			this.emit("end");
		})
		.pipe(
			rename({
				basename: "main",
				suffix: ".min",
				extname: ".js",
			})
		)
		.pipe(srcmap.write("."))
		.pipe(gulp.dest(options.scripts.dest))
		.pipe(
			browsersync.reload({
				stream: true,
			})
		);
}
/* Views
 * ------ */

function ProcessPug() {
	return gulp
		.src(options.pug.src)
		.pipe(
			plumber(function (err) {
				console.log("Pug Task Error");
				console.log(err);
				this.emit("end");
			})
		)
		.pipe(pug({ pretty: true }))
		.pipe(gulp.dest(options.pug.dest))
		.pipe(
			browsersync.reload({
				stream: true,
			})
		);
}

/* Images
 * ------ */

function ProcessImages() {
	return gulp
		.src(options.images.src)
		.pipe(webp())
		.pipe(gulp.dest(options.images.dest));
}

/* Fonts
 * ------ */

function ProcessFonts() {
	return gulp.src(options.fonts.src).pipe(gulp.dest(options.fonts.dest));
}

/* Favicon
 * ------ */

function ProcessFavicon() {
	return gulp
		.src("src/favicon.ico", {
			allowEmpty: true,
		})
		.pipe(gulp.dest("dist"));
}

/* Clean up
 * ------ */

async function ProcessClean() {
	return Promise.resolve(del.sync("dist"));
}

function watchFiles() {
	gulp.watch(options.pug.all, gulp.series(ProcessPug, ProcessStyles));
	gulp.watch(options.pug.src, ProcessPug);
	gulp.watch(options.ProcessStyles.src, ProcessStyles);
	gulp.watch(options.scripts.src, ProcessScripts);
	gulp.watch(options.images.src, ProcessImages);
}
// -------------------------------------
//   End Message
// -------------------------------------
const end = (done) => {
	console.log(" ");
	console.log(c.green("--------------------------------------"));
	console.log(c.green.bold.underline("Enjoy coding 🤌 🤌 !!"));
	console.log(c.green("--------------------------------------"));
	console.log(" ");
	done();
};
/* Build
 * ------ */
const ProcessBuildSource = gulp.series(
	ProcessClean,
	gulp.parallel(
		ProcessPug,
		CoreStyles,
		ProcessStyles,
		ProcessFontAwesomeCss,
		CoreScripts,
		ProcessScripts,
		ProcessImages,
		ProcessFonts,
		ProcessFavicon
	),
	end
);
const watch = gulp.parallel(watchFiles, browserSync);
// export tasks
exports.CoreStyles = CoreStyles;
exports.ProcessStyles = ProcessStyles;
exports.ProcessFontAwesomeCss = ProcessFontAwesomeCss;
exports.ProcessPug = ProcessPug;
exports.CoreScripts = CoreScripts;
exports.scripts = ProcessScripts;
exports.images = ProcessImages;
exports.fonts = ProcessFonts;
exports.favicon = ProcessFavicon;
exports.clean = ProcessClean;
exports.build = ProcessBuildSource;
exports.watch = watch;
exports.default = ProcessBuildSource;
