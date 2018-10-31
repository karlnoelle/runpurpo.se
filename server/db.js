module.exports = (async () => {

    const mongoose = require('mongoose');

    // Open connection to MongoDB
    await mongoose.connect('mongodb://localhost/test');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

})();
