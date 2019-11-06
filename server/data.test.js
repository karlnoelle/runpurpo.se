const data = require('./data');
const fs = require('fs');
const utils = require('./utils');

jest.mock('./utils', () => ({
	mkdirs: jest.fn(),
}));

jest.mock('fs', () => ({
	readdirSync: jest.fn(),
	readFileSync: jest.fn(),
	unlinkSync: jest.fn(),
	writeFileSync: jest.fn()
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

test('loadAllEvents - empty directory', () => {
	fs.readdirSync.mockReturnValue([]);
	const result = data.loadAllEvents();
	expect(fs.readdirSync).toHaveBeenCalledWith(data.EVENT_DIR);
	expect(result).toEqual({});
});

test('loadAllEvents - more than one event', () => {
	fs.readdirSync.mockReturnValue(['string 1', 'string 2', 'string 3']);
	fs.readFileSync.mockImplementation(
		(path, options) => {}


	)
	const expectedResult = {};
	const result = data.loadAllEvents();
	expect(fs.readdirSync).toBeCalledWith(data.EVENT_DIR);
	expect(fs.readFileSync).toHaveBeenCalledTimes(3);
	expect(fs.readFileSync).toHaveBeenCalledWith(data.EVENT_DIR + '/string 1', 'utf8')
	expect(fs.readFileSync).toHaveBeenCalledWith(data.EVENT_DIR + '/string 2', 'utf8')
	expect(fs.readFileSync).toHaveBeenCalledWith(data.EVENT_DIR + '/string 3', 'utf8')
	expect(result).toEqual(expectedResult);
});
