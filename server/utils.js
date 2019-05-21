const fs = require('fs');

exports.mkdir = (path) => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
};
exports.mkdirs = (...paths) => {
	if (Array.isArray(paths)) {
		for (const path of paths) {
			exports.mkdir(path);
		}
	} else {
		exports.mkdirs(paths.split('/'));
	}
};
