const fs = require('fs');

exports.mkdir = (path) => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
};
exports.mkdirs = (paths) => {
	for (const path of paths.split('/')) {
		exports.mkdir(path);
	}
};
