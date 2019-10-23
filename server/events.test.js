const fs = require('fs');

test('doesNotExist', () => {
    try {
        fs.unlinkSync('eventName.json');
        console.log('event never existed!')
    } catch (e) {
        console.log(e)
    }
});