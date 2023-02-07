import gulp from "gulp";

// Конфигурации
import path from '../config/path.js';
import app from '../config/app.js';

// Плагины

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import rename from 'gulp-rename';
import size from 'gulp-size';
import groupMediaqueries from 'gulp-group-css-media-queries';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';


// Обработка SCSS-файлов
const sass = gulpSass(dartSass);
export default() => {
	return gulp.src(path.scss.src, { sourcemaps: app.isDev })
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: "SCSS",
				message: error.message
			}))
		}))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(groupMediaqueries())
		.pipe(size({
			title: "До сжатия"
		}))
		.pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
		.pipe(rename({ suffix: ".min" }))
		.pipe(csso())
		.pipe(size({
			title: "После сжатия"
		}))
		.pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev }))
};

