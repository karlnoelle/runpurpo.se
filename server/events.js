const uuidv1 = require('uuid/v1');
const data = require('./data');
const utils = require('./utils');

const EVENT_ID_INVALID_REGEX = /[^\w-]/;
const EVENT_IMAGE_MAX_SIZE = 10000000;

// Load an event from filesystem
app.get('/api/event/:eventId', (req, res) => {
	const event = data.loadEvent(req.params.eventId);
	if (event) {
		res.json(event);
	} else {
		res.sendStatus(404);
	}
});
// Load the event's image
app.get('/api/event/:eventID/image', (req, res) => {
	const eventID = req.params.eventID;
	if (eventID.match(EVENT_ID_INVALID_REGEX)) {
		res.status(400).send('400 Bad Request\nInvalid character in event ID');
	} else {
		const inStream = data.createReadEventImageStream(eventID);
		if (inStream) {
			const type = utils.determineImageType(inStream);
			if (type) {
				res.headers['Content-Type'] = 'image/' + type;
			}
			res.send(inStream);
		} else {
			res.sendStatus(404);
		}
	}
});

const validateEvent = (event) => {
	if (!event.name) {
		return 'missing event name';
	}
	if (event.imageType) {
		if (event.imageType !== 'jpeg' && event.imageType !== 'png') {
			return 'bad event image type';
		}
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
		data.saveEvent(event);
		res.status(201).send(event);
	}
});
// Upload event image
app.put('/api/event/:eventID/image', (req, res) => {
	const event = data.loadEvent(req.params.eventID);
	if (event) {
		const contentLength = req.headers['content-length'];
		if (contentLength) {
			if (contentLength > EVENT_IMAGE_MAX_SIZE) {
				res.status(400).send('image too large');
			} else {
				try {
					data.saveEventImage(event, req);
					req.on('error', (e) => res.status(400).send(e));
					req.on('end', () => res.sendStatus(200));
				} catch (e) {
					res.status(400).send(e);
				}
			}
		} else {
			res.status(400).send('missing Content-Length');
		}
	} else {
		res.sendStatus(404);
	}
});

// List all events
app.get('/api/events', (req, res) => {
	const events = data.loadAllEvents();
	res.json(events)
});

// Delete an event
app.delete('/api/event/:eventID', (req, res) => {
	const eventID = req.params.eventID;
	if (eventID.match(EVENT_ID_INVALID_REGEX)) {
		res.status(400).send('400 Bad Request\nInvalid character in event ID');
	} else {
		try {
			data.deleteEvent(eventID);
		} catch (e) {
			res.status(404).send(e.message);
			return;
		}
		res.status(200).send('200 Deleted');
	}
});
