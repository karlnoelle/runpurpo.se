const fs = require('fs');
const utils = require('./utils');
const uuidv1 = require('uuid/v1');

const EVENT_DIR = './data/events';
utils.mkdirs(EVENT_DIR);

const loadEvents = () => {
	const events = {};
	fs.readDirSync(EVENT_DIR).forEach(filename => {
		const content = fs.readFileSync(EVENT_DIR + '/' + filename, 'utf8');
		const event = JSON.parse(content);
		events[event.id] = event;
	});
	return events;
};

const validateEvent = (event) => {
	if (!event.name) {
		return 'missing event name';
	}
};

// Create an event
app.post('/api/event', (req, res) => {
	const event = req.body;
	console.log(`received event: ${JSON.stringify(event)}`);
	const validationError = validateEvent(event);
	if (validationError) {
		res.status(400).send(validationError);
	} else {
		const uuid = uuidv1();
		event.id = uuid;
		fs.writeFileSync(EVENT_DIR + uuid + '.json', JSON.stringify(event));
		res.status(201).send(event);
	}
});

// Load an event
app.get('/api/event/:eventId', (req, res) => {
	const event = loadEvents()[req.params.eventId];
	if (event) {
		res.json(event);
	} else {
		res.sendStatus(404);
	}
});

// List all events
app.get('/api/events', (req, res) => res.json(loadEvents()));
