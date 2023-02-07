import { deleteAsync } from 'del';

// Конфигурации
import path from '../config/path.js';

// Очистка
export default () => {
	return deleteAsync(['path.root', "!dist/fonts", "!dist/slick.min.js"])
}; 