const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let eventSchema = new Schema({
  name:  String,
  date:  String,
  time:   String,
  location:   String,
  address:   String,
  description:   String,
});

const Event = mongoose.model('event', eventSchema);

app.post('/api/create-event', function (request, response) {
    console.log('received event: ' + JSON.stringify(request.body));
    // TODO: validation
    let event = new Event(request.body);
    event.save(function(error) {
        if (error) {
            console.log(`unable to save event: ${error}`);
            response.sendStatus(500);
        } else {
            response.status(201).send(event);
        }
    });
});

app.get('/api/events', function (request, response) {
    let result = {};
    Event.find({}, (err, events) => {
        events.forEach((event) => {
			result[event._id] = event;
        });
		response.send(result);
    });
});

app.get('/api/event/:eventID', function (request, response) {
	let eventID = request.params.eventID;
	Event.findById(eventID, function(err, result) {
		if (err) {
			response.sendStatus(404);
		} else {
			response.send(result);
		}
	});
});

app.get('/event/:eventID', function(request, response) {
	let eventID = request.params.eventID;
	Event.findById(eventID, function(err, eventData) {
		if (err) {
			response.sendStatus(404);
		} else {
			response.render('event', eventData);
		}
	});
});
