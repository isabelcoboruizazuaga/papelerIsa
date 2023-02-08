const { series, parallel, src, dest, watch } = require("gulp");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const sass = require("gulp-dart-sass");
const scss = require("gulp-dart-scss");
const fif = require("gulp-if");
const plumber = require("gulp-plumber");
const processhtml = require("gulp-processhtml");
const uglify = require("gulp-uglify");


function holamundo(cb) {
    console.log("Hola Mundo");
    cb();
}


function adiosMundo(cb) { 
    console.log("Adios Mundo");
    cb();
}

function pipeline() {
    return src("css/*.css").pipe(dest("up/css"));
}

function vigila(cb) {
    watch("css/*.css", holamundo);
}

function compilar() {
    return src("scss/main.scss")
        .pipe(sass())
        .pipe(uglify)    
        .pipe(dest("up/css/"))
}

var doc_option = {
    dest: 'docs'
}

function generar_docs() {
    return src("css/*.css")
        .pipe(sassdoc(doc_option));
}
/*<!-- build:css cs/main.min.css --> */
function html() {
    return src("*.html")
        .pipe(processhtml())
        .pipe(dest("up/"))
}

function minimiza_y_renombrar(){
    return src("./up/css/main.css")
        .pipe(uglify)
        .pipe(rename({suffix:"min",extname:".css"}))
        .pipe(dest("./up/css/"))
}

function todo(){
    return src("scss/main.scss")
    .pipe(sass())
    .pipe(uglify)    
    .pipe(rename({suffix:"min",extname:".css"}))
    .pipe(dest("up/css/"))
}

exports.holamundo = holamundo;
exports.adiosMundo = adiosMundo;
exports.default = holamundo;

exports.serie = series(holamundo, adiosMundo);
exports.parallel = parallel(holamundo, adiosMundo);


exports.pipeline = pipeline;
exports.vigila = vigila;



exports.html = html;