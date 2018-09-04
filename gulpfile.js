// 载入外挂
var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    notify = require('gulp-notify'),
    // rev = require('gulp-rev'),
    // revReplace = require('gulp-rev-replace'),
    // useref = require('gulp-useref'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber');
~

// 样式
gulp.task('styles-dev', function () {
    return gulp.src(['css/less/*.less'])
        .pipe(sourcemaps.init())
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['> 5% in CN', 'last 10 versions', 'Chrome 24'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: false //是否去掉不必要的前缀 默认：true
        }))
        // .pipe(cleanCSS())
        .pipe(sourcemaps.write('./', {
            includeContent: false
        }))
        .pipe(gulp.dest('./css/'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

//图片压缩
gulp.task('images-dev', function () {
    return gulp.src('./image/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./img'))
        .pipe(notify({
            message: 'Images task complete'
        }));
})



// gulp.src('*.html')
//     .pipe(useref())                         // 替换HTML中引用的css和js
//     .pipe(rev())                            // 给css,js,html加上hash版本号
//     .pipe(revReplace())                     // 把引用的css和js替换成有版本号的名字
//     .pipe(gulp.dest('./dist/'))


// 预设任务
gulp.task('default', function () {
    // watch所有.less档，一有变动自动编译为css文件
    gulp.watch('css/less/*.less', ['styles-dev']);
    gulp.watch('image/*.*', ['images-dev']);
    browserSync({
        server: {
            baseDir: './',
            index: "index.html"
        }
    });
    var reload = browserSync.reload;
    // watch所有位在根目录下的档案，一旦有更动，便进行重载
    var watchConfig = ['css/*.css', 'js/**/*', 'js/*', 'img/*', 'image/*', 'fonts/**/*', '*.html'];
    gulp.watch(watchConfig, reload);
});