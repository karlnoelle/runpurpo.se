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

app.post('/create-event', function (request, response) {
    console.log('received event: ' + JSON.stringify(request.body));
    // TODO: validation
    // TODO: save --> id
    let event = new Event(request.body);
    event.save(function(err) {
        if (err) {
            console.log(`unable to save event: ${err}`);
            response.sendStatus(500);
        } else {
            response.status(201).send(event);
        }
    });
});

app.get('/event/:eventID', function(request, response) {
    let eventID = request.params.eventID;
    Event.findById(eventID, function(err, result) {
        if (err) {
            response.sendStatus(404);
        } else {
            response.send(result);
        }
    });
});