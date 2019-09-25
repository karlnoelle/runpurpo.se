const fs = require('fs');
const utils = require('./utils');
const uuidv1 = require('uuid/v1');

const EVENT_ID_INVALID_REGEX = /[^\w-]/;

const EVENT_DIR = './data/events';
utils.mkdirs(EVENT_DIR);

const loadEvents = () => {
	const events = {};
	fs.readdirSync(EVENT_DIR).forEach(filename => {
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

// Create or edit an event
app.post('/api/event', (req, res) => {
	const event = req.body;
	console.log(`received event: ${JSON.stringify(event)}`);
	const validationError = validateEvent(event);
	if (validationError) {
		res.status(400).send(validationError);
	} else {
		if (event.id) {
			if (event.id.match(EVENT_ID_INVALID_REGEX)) {
				res.status(400).send('400 Bad Request\nInvalid character in event ID');
				return;
			}
		} else {
			event.id = uuidv1();
		}
		fs.writeFileSync(EVENT_DIR + '/' + event.id + '.json', JSON.stringify(event));
		res.status(201).send(event);
	}
});

// Load an event
app.get('/api/event/:eventId', (req, res) => {
	const events = loadEvents();
	const event = events[req.params.eventId];
	if (event) {
		res.json(event);
	} else {
		res.sendStatus(404);
	}
});

// List all events
app.get('/api/events', (req, res) => res.json(loadEvents()));

// Delete an event
app.delete('/api/event/:eventID', (req, res) => {
	const eventID = req.params.eventID;
	if (eventID.match(EVENT_ID_INVALID_REGEX)) {
		res.status(400).send('400 Bad Request\nInvalid character in event ID');
	} else {
		try {
			fs.unlinkSync(EVENT_DIR + '/' + eventID + '.json');
		} catch (e) {
			res.status(404).send(e.message);
			return;
		}
		res.status(200).send('200 Deleted');
	}
});
