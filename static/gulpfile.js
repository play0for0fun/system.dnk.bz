var gulp = require('gulp'),

    // jade
    jade = require('gulp-jade'),
    changed = require('gulp-changed'),
    cached = require('gulp-cached'),
    jadeInheritance = require('gulp-jade-inheritance'),
    filter = require('gulp-filter'),

    // stylus
    stylus = require('gulp-stylus'),
    csso = require('gulp-csso'),
    prefix = require('gulp-autoprefixer'),

    // svg
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),

    //sprite
    spritesmith = require('gulp.spritesmith'),

    //clean
    clean = require('gulp-clean'),

    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    webserver = require('gulp-webserver'),
    coffee = require('gulp-coffee'),
    header = require('gulp-header'),
    ngAnnotate = require('gulp-ng-annotate'),
    pkg = require('./package.json'),
    ngHtml2Js = require("gulp-ng-html2js"),
    banner = ['/**',
        ' * <%= pkg.name %> - <%= pkg.homepage %>',
        ' * @version v<%= pkg.version %>',
        ' * @author <%= pkg.author %>',
        ' */',
        ''].join('\n');

// Set some defaults
var isDev = true;
var isProd = false;

// If "production" is passed from the command line then update the defaults
if (gutil.env.type === 'production') {
    isDev = false;
    isProd = true;
}

gulp.task('svgstore', function() {
    return gulp
        .src('source/assets/svg/!*.svg')
        .pipe(gulpif(isProd, svgmin()))
        .pipe(svgstore())
        .pipe(gulp.dest('img/svg/'));
});

gulp.task('spritesmith', function () {
  return gulp
    .src('source/assets/spritemobile/*.png')
    .pipe(spritesmith({
      imgName: 'spritemobile.png',
      cssName: '../../stylus/ui/spritemobile/spritemobile.styl',
      imgPath :'../img_opt/spritemobile.png'
    }))
    .pipe(gulp.dest('source/assets/img_opt'));
});

gulp.task('stylus', function() {
    gulp.src(['source/stylus/*.styl'])
        .pipe(stylus())
        .pipe(prefix())
        .pipe(gulpif(isProd, csso()))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('jade', function() {
    gulp.src(['source/jade/**/*.jade'])
        .pipe(changed('html', {extension: '.html'}))
        .pipe(gulpif(global.isWatching, cached('jade')))
        .pipe(jadeInheritance({basedir: 'source/jade'}))
        .pipe(filter(function (file) {
            return !/partials/.test(file.path);
        }))
        .pipe(jade({
            pretty: true
        })
        .on('error', console.log))
        .pipe(gulp.dest('build'));
});
gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('js', function() {
    gulp.src(['source/app/**/**/**/*.+(js)'])
        .pipe(ngAnnotate())
        .pipe(gulpif(isProd, uglify({
            compress: {
                drop_console: true
            }
        })))
        .pipe(concat('app.js'))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('build/js'));
});

gulp.task('webserver', function() {
    gulp.src('..')
        .pipe(webserver({
            //livereload: true,
            open: true,
            fallback: 'cd/static/index.html',
            port: 8000
        }));
});

gulp.task('spritesmith', function () {
  return gulp
    .src('source/assets/icons/*.png')
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '../../source/stylus/ui/sprite/sprite.styl',
      imgPath :'../img/sprite.png',
      algorithm: 'binary-tree',
      cssFormat: 'stylus'
    }))
    .pipe(gulp.dest('build/img/'));
});

/*gulp.task('images_opt', function(cb) {
    gulp.src(['source/assets/img_opt/!*.*']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('build/img')).on('end', cb).on('error', cb);
});*/

gulp.task('vendor', function() {
    gulp.src([
        // add some extend vendors, user `bower install vendor --save`
        'vendor/jquery/jquery.js',
        'vendor/fancybox/jquery.fancybox.js',
        'vendor/mask/mask.js'
    ])
        .pipe(concat('app-common.js'))
        .pipe(gulpif(isProd, uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        })))
        .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function() {
    gulp.watch('source/app/**/**/**/*.+(js)', ['js']);
    gulp.watch('source/stylus/**/*.styl', ['stylus']);
    gulp.watch('source/assets/iconsmobile/*.png', ['spritesmith']);
    //gulp.watch('source/assets/img_opt/*.*', ['images_opt']);
    gulp.watch('source/jade/**/**/*.jade', ['setWatch', 'jade']);
    gulp.watch('source/assets/svg/*.svg', ['setWatch', 'jade']);
});

gulp.task('build', ['js', 'stylus', 'jade', 'spritesmith', /*'images_opt',*/ 'vendor']);
gulp.task('default', ['build', 'watch', 'webserver', 'spritesmith']);