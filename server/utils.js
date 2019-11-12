const fs = require('fs');

const JPG_HEADER = Buffer.from([0xff, 0xd8, 0xff]);
const PNG_HEADER = Buffer.from('\x89PNG\r\n\x89\n');

exports.determineImageType = (inStream) => {
	const header = inStream.read(8);
	inStream.unshift(header);
	if (JPG_HEADER.compare(header, 0, JPG_HEADER.length) === 0) {
		return 'jpeg';
	}
	if (PNG_HEADER.compare(header, 0, PNG_HEADER.length) === 0) {
		return 'png';
	}
};

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
