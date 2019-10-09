const data = require('./data');
const fs = require('fs');
const utils = require('./utils');

jest.mock('./utils', () => ({
	mkdirs: jest.fn(),
}));

jest.mock('fs', () => ({
	unlinkSync: jest.fn(),
	writeFileSync: jest.fn(),
}));

test('utils.mkdirs was called correctly', () => {
	expect(utils.mkdirs).toHaveBeenCalledTimes(1);
	expect(utils.mkdirs).toHaveBeenCalledWith('./data/events');
});

test('saveEvent', () => {
	const event = {
		id: 'string-name-hyphen-dot-thanks',
		name: 'just the first thing out',
	};
	data.saveEvent(event);
	expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
	expect(fs.writeFileSync.mock.calls[0][0]).toEqual('./data/events/string-name-hyphen-dot-thanks.json');
	const savedEvent = JSON.parse(fs.writeFileSync.mock.calls[0][1]);
	expect(savedEvent).toEqual(event);
});
test('deleteEvent', () => {
	const eventID = 'my-event-identifier';
	data.deleteEvent(eventID);
	expect(fs.unlinkSync).toHaveBeenCalledTimes(1);
	expect(fs.unlinkSync).toBeCalledWith('./data/events/my-event-identifier.json');
});
