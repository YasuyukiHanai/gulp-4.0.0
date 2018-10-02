const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const browser = require("browser-sync");
const reload = require("browser-sync").reload;
const cssmin = require("gulp-cssmin");
const bourbon = require('node-bourbon');
const rename = require("gulp-rename");
const compass = require('compass-importer');

bourbon.with('main_sp.scss');
const sassDir = '../htdocs/';
const jsDir = '../htdocs/';


gulp.task("css", (done) => {
    //return gulp.src(sassDir + '/**/**/_scss/*.scss')
    gulp.src(sassDir + '/**/**/_scss/*.scss')
        .pipe(plumber({ // OK
            errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: bourbon.includePaths
        }))
        .pipe(autoprefixer())
        //.pipe(cssmin()) //**minify
        .pipe(rename(function(path) {
                path.dirname += "/../css";
        })) //*renameさせてdestのpath変更
        .pipe(gulp.dest(sassDir));
        //.pipe(browser.reload({stream:true}))
    done();
});

gulp.task("js", (done) => {
    return gulp.src(jsDir + '/**/**/_js/*.js')
        .pipe(rename(function(path) {
            path.dirname += "/../js";
        }))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(jsDir));
        //.pipe(browser.reload({stream:true}))
    done();
});


gulp.task("server", () => {
    browser({
        notify: false,
        port: 3333,
        // proxy: 'example.com',
        server: {
            baseDir: "../htdocs/"
        }
    });
});


gulp.task("reload", (done) => {
    browser.reload({stream:true});
    done();
});


gulp.task("watch", () => {
    gulp.watch("../htdocs/**/**/_scss/*.scss", gulp.series("css", "reload"));
    gulp.watch("../htdocs/**/**/_js/*.js", gulp.series("js", "reload"));
    gulp.watch("../htdocs/**/*.html", gulp.task("reload"));
});


gulp.task("default", gulp.parallel("watch", "server"));