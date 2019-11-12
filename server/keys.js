const fs = require('fs');

const KEYS_FILE = 'keys.json';

let keys = {};

if (fs.existsSync(KEYS_FILE)) {
	const contents = fs.readFileSync(KEYS_FILE, 'utf8');
	keys = JSON.parse(contents);
}

module.exports = keys;
