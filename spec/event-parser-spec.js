const eventParser = require('../lib/event-parser.js');
const fs = require('fs');
const path = require('path');

describe('eventParser()', function() {
  it ('Should return false if passed invalid JSON', function() {
    const invalidJson = '{ someval; 123 '
    var res = eventParser(invalidJson);

    expect(res).toBe(false);
  });

  it ('Should return false if passed an invalid event', function() {
    const invalidEvent = {
      type: 'transaction.deleted',
      data: {
        "account_id": "acc_00008gju41AHyfLUzBUk8A"
      }
    }

    var res = eventParser(invalidEvent);

    expect(res).toBe(false);
  });

  describe('Passed a valid event', function() {
    var event;

    beforeEach(function() {
      event = fs.readFileSync(path.join(__dirname, '../example_data/transaction1.json'))
    });

    describe('as a string', function() {

      it ('Should return the events data', function() {
        var res = eventParser(event);

        expect(typeof res).toBe('object');
        expect(res.amount).toBe(-350);
      });
    });

    describe('as JSON', function() {

      it ('Should return the events data', function() {
        const jsonEvent = JSON.parse(event);
        var res = eventParser(jsonEvent);

        expect(typeof res).toBe('object');
        expect(res.amount).toBe(-350);
      });
    });
  });
});
