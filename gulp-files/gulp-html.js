import gulp from "gulp";

// Конфигурации
import path from '../config/path.js';
import app from '../config/app.js';

// Плагины
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';


// Обработка HTML-файлов
export default() => {
	return gulp.src(path.html.src)
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: "HTML",
				message: error.message
			}))
		}))
		.pipe(fileInclude())
		.pipe(size({
		title: "До сжатия"
		}))
		.pipe(htmlmin(app.htmlmin))
		.pipe(size({
		title: "После сжатия"
		}))
		.pipe(gulp.dest(path.html.dest))
};
