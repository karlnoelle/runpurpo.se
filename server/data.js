const fs = require('fs');

const loadAllEvents = () => {
    const events = {};
    fs.readdirSync(EVENT_DIR).forEach(filename => {
        const content = fs.readFileSync(EVENT_DIR + '/' + filename, 'utf8');
        const event = JSON.parse(content);
        events[event.id] = event;
    });
    return events;
};
