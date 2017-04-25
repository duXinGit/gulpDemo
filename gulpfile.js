//npm install gulp -g (global环境)  
//npm install gulp --save-dev (项目环境)
//在你的项目根目录下创建gulpfile.js，代码如下：
//在项目中install需要的gulp插件，一般只压缩的话需要  
//npm install gulp-htmlmin gulp-imagemin imagemin-pngcrush gulp-minify-css gulp-jshint gulp-uglify gulp-concat gulp-rename gulp-notify --save-dev
//以下require需要的module

// 引入 gulp
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'),//css压缩
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    notify = require('gulp-notify');//提示信息

//压缩CSS  
gulp.task('css', function() {
    return gulp.src('./public/stylesheets/!(*.min.css)') //压缩的文件
            .pipe(rename({ suffix: '.min' }))
            .pipe(minifycss())
            .pipe(gulp.dest('./public/stylesheets')); //输出文件夹
});

// 检查js
gulp.task('lint', function() {
    return gulp.src('./public/javascripts/!(*.min.js)')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'lint task ok' }));
});

// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src('./public/javascripts/!(*.min.js)')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/javascripts/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts/'))
        .pipe(notify({ message: 'js task ok' }));
});

//在任务数组中放上面要执行的任务  
gulp.task('default', ['css', 'lint', 'js']);

//用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。
gulp.watch(['./public/stylesheets/!(*.min.css)', './public/javascripts/!(*.min.js)'], ['css', 'lint', 'js']);