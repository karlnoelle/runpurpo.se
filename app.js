const handleError = (e) => {
	require('http').createServer((req, res) => {
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(e.message);
	}).listen(3000);
}

process.on('uncaughtException', handleError);
process.on('unhandledRejection', handleError);

try {
	require('./server');
} catch (e) {
	handleError(e);
}
