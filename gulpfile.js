import gulp from "gulp";
import browserSync, { watch } from "browser-sync";
import html from "./gulp-files/gulp-html.js";
import scss from './gulp-files/gulp-scss.js';
import js from './gulp-files/gulp-js.js';
import img from './gulp-files/gulp-img.js';
import clear from './gulp-files/gulp-clear.js';

// Конфигурации
import path from './config/path.js';
import app from './config/app.js';

/* global.configa = {
	path: path,
	app: app
} */


// Сервер
const server = () => {
	browserSync.init({
		server: {
			baseDir: path.root
		}
	})
};

// Наблюдение
const watcher = () => {
	gulp.watch(path.html.watch, html).on("all", browserSync.reload);
	gulp.watch(path.scss.watch, scss).on("all", browserSync.stream);
	gulp.watch(path.js.watch, js).on("all", browserSync.stream);
	gulp.watch(path.img.watch, img).on("all", browserSync.reload);
};

// Сборка
const build = gulp.series(
	clear,
	gulp.parallel(html, scss, img, js)
);

// сборка и разработка
const dev = gulp.series(
	build,
	gulp.parallel(watcher, server)
);

//Задачи
export { watcher };
export { clear };
export { html };
export { scss };
export { js };
export { img };
export { dev };
export { build };
export default app.isProd
	? build : dev;