const fs = require('fs');
const utils = require('./utils');

const EVENT_DIR = './data/events';
utils.mkdirs(EVENT_DIR);

const createReadEventImageStream = (eventID) => {
    try {
        return fs.createReadStream(`${EVENT_DIR}/${eventID}.jpg`);
    } catch (e) {
        // ignore
    }
    try {
        return fs.createReadStream(`${EVENT_DIR}/${eventID}.png`);
    } catch (e) {
        // ignore
    }
    return null;
};

const saveEvent = (event) => {
    fs.writeFileSync(EVENT_DIR + '/' + event.id + '.json', JSON.stringify(event));
};
const saveEventImage = (event, inStream) => {
    const eventID = event._id;
    const suffix = utils.determineImageType(inStream);
    if (!suffix) {
        throw new Error(`unsupported image type`);
    }
    deleteEventImage(event);
    inStream.pipe(fs.createWriteStream(`${EVENT_DIR}/${eventID}.${suffix}`));
    event.imageType = suffix;
    saveEvent(event);
};

const deleteEvent = (eventID) => {
    fs.unlinkSync(`${EVENT_DIR}/${eventID}.jpg`);
    fs.unlinkSync(`${EVENT_DIR}/${eventID}.png`);
    fs.unlinkSync(`${EVENT_DIR}/${eventID}.json`);
};
const deleteEventImage = (event) => {
    const suffix = event.photoType;
    if (suffix) {
        fs.unlinkSync(`${EVENT_DIR}/${event._id}.${suffix}`);
    }
};

const loadAllEvents = () => {
    const events = {};
    fs.readdirSync(EVENT_DIR).forEach(filename => {
        if (filename.endsWith('.json')) {
            const content = fs.readFileSync(EVENT_DIR + '/' + filename, 'utf8');
            const event = JSON.parse(content);
            events[event.id] = event;
        }
    });
    return events;
};
const loadEvent = (eventID) => loadAllEvents()[eventID];

module.exports = {
    createReadEventImageStream,
    deleteEvent,
    deleteEventImage,
    EVENT_DIR,
    loadAllEvents,
    loadEvent,
    saveEvent,
    saveEventImage,
};
