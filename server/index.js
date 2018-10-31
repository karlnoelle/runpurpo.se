const LISTEN_PORT = 3000;

(async () => {
    global.express = require('express');
    global.app = express();

    await require('./db');
    await require('./auth');
    await require('./routes');

    await require('./events');

    app.listen(LISTEN_PORT, () => console.log('runpurpo.se is listening on port 3000'));
})();
