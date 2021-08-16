const {series, src, dest, watch} = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

// Utilidades CSS
// agregar pre-fijos 
const autoprefixer = require('autoprefixer');
// agregará procesamiento a nuestro css
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');



const paths = {
    imagenes : 'src/img/**/*',
    scss : 'src/scss/**/*.scss',
    js : 'src/**/*.js',
}
// Función que compila SASS
function css() {
    return src( paths.scss )
            .pipe( sourcemaps.init() )
            .pipe( sass() )
            .pipe( postcss( [ autoprefixer(), cssnano() ] ))
            .pipe( sourcemaps.write('.') )
            .pipe( dest('./build/css') )
}
function minificarcss() {
    return src( paths.scss )
            .pipe( sass({
                outputStyle: 'compressed'
            }))
            .pipe( dest('./build/css') )
}

function javascript() {
        return src( paths.js )
                .pipe( sourcemaps.init())
                .pipe( concat('bundle.js') )
                .pipe( terser() )
                .pipe( sourcemaps.write('.'))
                .pipe( rename({ suffix: 'min'}))
                .pipe( dest('./build/js') )
}
// funcion para hacer imagenes mas livianas
  function imagenes() {
      return src( paths.imagenes )
              .pipe( imagemin() )
              .pipe( dest('./build/img') )
              .pipe( notify({message: 'Imagen Minificada'}) )
  }

  function versionWebp() {
    return src( paths.imagenes )
            .pipe( webp() )
            .pipe( dest('./build/img') )
            .pipe( notify({message: 'Versión Webp'}) )
}


// Función que automatiza la compilación del archivo SASS, para no tener que estar colocándolo cada vez que se realiza un cambio
// y el cambio se realice al momento de guardar el archivo
function watchArchivos() {
    watch( paths.scss, css ); // * = la carpeta actual //// ** = todos los archivos con esa extensión
    watch( paths.js, javascript );
}


exports.css = css;

exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

// funcion para ejecutar todas las funciones una despues de otra
// otra opción es con parallel() que se ejecutan todas
// las tareas al mismo tiempo
exports.default = series( css, javascript, imagenes, versionWebp, watchArchivos );