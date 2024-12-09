const gulp = require("gulp");
const concat = require("gulp-concat-css");
const plumber = require("gulp-plumber");
const del = require("del");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const mediaquery = require("postcss-combine-media-query");
const cssnano = require("cssnano");
const htmlMinify = require("html-minifier");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify");
const concatGulp = require("gulp-concat");
const order = require("gulp-order");

const copy = require("gulp-copy");

// Start server
function serve() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
  });
}

function pagesScss() {
  const plugins = [autoprefixer(), mediaquery(), cssnano()];
  return gulp
    .src("src/pages/**/*.scss")
    .pipe(sass())
    .pipe(concat("bundle.css"))
    .pipe(postcss(plugins))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}

// Pipe file.html
function html() {
  const options = {
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    sortClassName: true,
    useShortDoctype: true,
    collapseWhitespace: true,
    minifyCSS: true,
    keepClosingSlash: true,
  };
  return gulp
    .src("src/pages/**/*.html")
    .pipe(plumber())
    .on("data", function (file) {
      const buferFile = Buffer.from(
        htmlMinify.minify(file.contents.toString(), options)
      );
      return (file.contents = buferFile);
    })
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}

// Pipe scripts.js
function scripts() {
  return gulp
    .src([
      "./src/js/config.js",
      "./src/js/api.js",
      "./src/js/movie.js",
      "./src/js/pagination.js",
      "./src/js/search.js",
      "./src/js/index.js",
      "./src/js/modal.js"
    ])
    .pipe(concatGulp("main.js"))
    // .pipe(uglify())
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.reload({ stream: true }));
}

// Pipe images
function images() {
  return gulp
    .src("src/**/*.{jpg,png,svg,gif,ico,webp,avif,mp4,ogv}", {
      encoding: false,
    })
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
}

// Pipe fonts
function fonts() {
  return gulp
    .src("src/common/fonts/**/*.{woff,woff2,ttf}")
    .pipe(gulp.dest("dist/fonts"))
    .pipe(browserSync.reload({ stream: true }));
}

// File monitoring
function watchFiles() {
  gulp.watch(["src/**/*.html"], html);
  gulp.watch(["src/**/*.scss"], pagesScss);
  gulp.watch(["src/**/*.js"], scripts);
}

// Clean dev dist
function clean() {
  return del("dist");
}

const build = gulp.series(
  clean,
  gulp.parallel(
    html,
    pagesScss,
    scripts,
    fonts,
    images,
  )
);
const watchapp = gulp.parallel(build, watchFiles, serve);

// Command in console
exports.html = html;
exports.pagesScss = pagesScss;
exports.images = images;
exports.clean = clean;
exports.scripts = scripts;
exports.fonts = fonts;

exports.build = build;
exports.watchapp = watchapp;
exports.default = watchapp;
