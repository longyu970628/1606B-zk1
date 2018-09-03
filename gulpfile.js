var gulp = require('gulp');

var server = require('gulp-webserver');

var path = require('path');

var url = require('url');

var fs = require('fs');

var sass = require('gulp-sass');

var uglify = require('gulp-uglify');

var minCss = require('gulp-clean-css');

//编译scss
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});

//压缩css
gulp.task('minCss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(minCss())
        .pipe(gulp.dest('./build/css'))
});

//压缩js
gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
});

//监听scss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('sass'));
});

//起服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }

                if (pathname === '/api/list') {
                    res.end();
                } else if (pathname === '/api/search') {
                    res.end();
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

gulp.task('dev', gulp.series('sass', 'minCss', 'uglify', 'server', 'watch'));