const fs = require('fs');
const utils = require('./utils');

const EVENT_DIR = './data/events';
utils.mkdirs(EVENT_DIR);

const loadAllEvents = () => {
    const events = {};
    fs.readdirSync(EVENT_DIR).forEach(filename => {
        const content = fs.readFileSync(EVENT_DIR + '/' + filename, 'utf8');
        const event = JSON.parse(content);
        events[event.id] = event;
    });
    return events;
};

module.exports = { loadAllEvents };
