var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var uglify = require("gulp-uglify");
var plumber = require("gulp-plumber");
var browser = require("browser-sync");
var reload = require("browser-sync").reload;
var cssmin = require("gulp-cssmin");
var bourbon = require('node-bourbon');
var rename = require("gulp-rename");
var compass = require('compass-importer');

bourbon.with('main_sp.scss');

var sassDir = '../htdocs/';
var jsDir = '../htdocs/';

gulp.task("css", function() {
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
        .pipe(gulp.dest(sassDir))
        .pipe(browser.reload({stream:true}))
});

gulp.task("js", function() {
    return gulp.src(jsDir + '/**/**/_js/*.js')
        .pipe(rename(function(path) {
            path.dirname += "/../js";
        }))
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(jsDir))
        .pipe(browser.reload({stream:true}))
});


gulp.task("server", function() {
    browser({
        notify: false,
        port: 3333,
        // proxy: 'example.com',
        server: {
            baseDir: "../htdocs/"
        }
    });
});

gulp.task("default", ['server'], function() {
    gulp.watch("../htdocs/**/**/_scss/*.scss", ["css"]);
    gulp.watch("../htdocs/**/**/_js/*.js", ["js"]);
    //watch(["../htdocs/**/*"], reload);
});