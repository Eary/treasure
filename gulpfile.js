var gulp = require('gulp');
//获取 uglify 模块 (用于压缩 js)
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
//获取 minify-css 模块 (用于压缩 css) 
var minifycss = require('gulp-minify-css');
//获取 gulp-imagemin 模块 (用于压缩图片)
var imagemin = require('gulp-imagemin');
//css前缀自动填充
var autoprefixer = require('gulp-autoprefixer');
//获取 gulp-less 模块
var less = require('gulp-less');
//获取 gulp-ruby-sass 模块
var sass = require('gulp-ruby-sass');
//
var watchPath = require('gulp-watch-path');
//
var gutil = require('gulp-util');
//获取捕获错误信息插件
var combiner = require('stream-combiner2');

var browsersync = require('browser-sync');

var clean = require('gulp-clean');

var rename = require('gulp-rename');

//错误日志输出
var handleError = function(){
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: '+ colors.red(err.fileName));
    gutil.log('lineNumber: '+ colors.red(err.lineNumber));
    gutil.log('message: '+ err.message);
    gutil.log('plugin: '+ colors.yellow(err.plugin));

}

gulp.task('browser-sync',function(){
    browsersync({
        files:"**",
        server:{
            baseDir:'./dist'
        }
    });
});

//帮助信息
gulp.task('help',function(){
    console.log('############################帮助信息############################');
    console.log('gulp help          #查看帮助');
    console.log('gulp               #执行默认任务, 附带监听所有目录改变状态');
    console.log('gulp js            #压缩js文件, 并输出到dist');
    console.log('gulp css           #压缩css文件, 并输出到dist');
    console.log('gulp images        #压缩image文件, 并输出到dist');
    console.log('gulp less          #编译less并压缩css文件, 并输出到dist');
    console.log('gulp sass          #编译sass并压缩css文件, 并输出到dist');
    console.log('gulp watchjs       #监听js文件改变, 压缩并输出到dist');
    console.log('gulp watchcss      #监听css文件改变, 压缩并输出到dist');
    console.log('gulp watchimages   #监听image文件改变, 压缩并输出到dist');
    console.log('gulp watchless     #监听less文件改变, 编译并压缩, 输出到dist');
    console.log('gulp watchsass     #监听sass文件改变, 编译并压缩, 输出到dist');
});

gulp.task('clean',function(){
    return gulp.src('dist/**/*',{read:false})
    .pipe(clean({force:true}));
});

//压缩js，并输出到dist
gulp.task('js',function(){
    var combined = combiner.obj([
        gulp.src('src/js/**/*.js'),
        jshint(),
        gulp.dest('dist/js'),
        rename({ suffix: '.min' }),
        uglify(),
        //concat('common.js'),
        gulp.dest('dist/js')
    ]);
    combined.on('error',handleError);
});
//监听js文件
gulp.task('watchjs',function(){
    gulp.watch('src/js/**/*.js',function(event){
        var paths = watchPath(event, 'src/js', 'dist/js');
        /*
        paths
            { srcPath: 'src/js/log.js',
              srcDir: 'src/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        var combined = combiner.obj([
            gulp.src(paths.srcDir),
            jshint(),
            uglify(),
            gulp.dest(paths.distDir)
        ]);
        combined.on('error',handleError);
        //gulp.src(paths.srcDir).pipe(uglify()).pipe(gulp.dest(paths.distDir));
    });
});

//压缩css，并输出到dist
gulp.task('css',function(){
    gulp.src('src/css/**/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});


//监听css文件
gulp.task('watchcss',function(){
    gulp.watch('src/css/**/*.css',function(event){
        var paths = watchPath(event, 'src/css', 'dist/css');
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcDir)
            //.pipe(sourcemaps.init())
            .pipe(autoprefixer({
                browsers: 'last 2 versions'
            }))
            .pipe(minifycss())
            //.pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir));
        
    });
});

//压缩图片，并输出到dist
gulp.task('images',function(){
    gulp.src('src/images/*.*')
        .pipe(imagemin({
            progressive:true
        }))
        .pipe(gulp.dest('dist/images'));
});
//监听images
gulp.task('watchimage', function () {
    gulp.watch('src/images/**/*', function (event) {
        var paths = watchPath(event,'src/images','dist/images')

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcDir)
            .pipe(imagemin({
                progressive: true
            }))
            .pipe(gulp.dest(paths.distDir))
    })
})

//编译less
gulp.task('less',function(){
    gulp.src('src/less/**.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});
//监听less文件
gulp.task('watchless',function(){
    gulp.watch('src/less/**/*.less',function(event){
        var paths = watchPath(event, 'src/less', 'dist/css');
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        var combined = combiner.obj([
            gulp.src(paths.srcDir),
            //sourcemaps.init(),
            autoprefixer({
              browsers: 'last 2 versions'
            }),
            less(),
            minifycss(),
            //sourcemaps.write('./'),
            gulp.dest(paths.distDir)
        ]);
        combined.on('error', handleError);
        
    });
});

//编译sass
gulp.task('sass',function(){
    return sass('src/sass/**/*')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        //.pipe(sourcemaps.init())
        .pipe(minifycss())
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'));
});
//监听sass文件
gulp.task('watchsass',function(){
    gulp.watch('src/sass/**/*',function(event){
        var paths = watchPath(event, 'src/sass', 'dist/css');
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        sass(paths.srcDir)
            .on('error', function (err) {
                console.error('Error!', err.message);
            })
            //.pipe(sourcemaps.init())
            .pipe(minifycss())
            .pipe(autoprefixer({
              browsers: 'last 2 versions'
            }))
            //.pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(paths.distDir));
        
    });
});

gulp.task('copy',function(){
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watchcopy', function () {
    gulp.watch('src/fonts/**/*', function (event) {
        var paths = watchPath(event);

        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath);
        gutil.log('Dist ' + paths.distPath);

        gulp.src(paths.srcDir)
            .pipe(gulp.dest(paths.distDir));
    });
});
/*
// 处理完JS文件后返回流
gulp.task('js', function () {
    return gulp.src('js/*js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('js-watch', ['js'], browserSync.reload);

// 使用默认任务启动Browsersync，监听JS文件
gulp.task('serve', ['js'], function () {

    // 从这个项目的根目录启动服务器
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    gulp.watch("js/*.js", ['js-watch']);
});

*/
//在命令行使用 gulp 启动任务
gulp.task('default', ['css', 'js', 'images', 'less', 'sass', 'copy', 'watchjs', 'watchcss', 'watchless', 'watchsass', 'watchimage', 'browser-sync']);
