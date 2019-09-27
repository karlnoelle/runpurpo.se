const fs = require('fs');

exports.mkdir = (path) => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
};
exports.mkdirs = (path) => {
	const paths = path.split('/');
	for (let i = 0; i < paths.length; i++) {
		const path = paths.slice(0, i + 1).join('/');
		exports.mkdir(path);
	}
};
