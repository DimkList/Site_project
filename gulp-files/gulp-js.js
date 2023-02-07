"use strict"

import gulp from "gulp";

// Конфигурации
import path from '../config/path.js';
import app from '../config/app.js';

// Плагины

import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import webpack from "webpack-stream";



// Обработка JavaScript-файлов
export default () => {
	return gulp.src(path.js.src, { sourcemaps: app.isDev })
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: "js",
				message: error.message
			}))
		}))
		.pipe(babel())
		.pipe(webpack(app.webpack))
		.pipe(uglify())
		.pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev }))
};
