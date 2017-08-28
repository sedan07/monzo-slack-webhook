const eventParser = require('../lib/event-parser.js');
const fs = require('fs');
const path = require('path');

describe('eventParser()', () => {
  it('Should return false if passed invalid JSON', () => {
    const invalidJson = '{ someval; 123 ';
    const res = eventParser(invalidJson);

    expect(res).toBe(false);
  });

  it('Should return false if passed an invalid event', () => {
    const invalidEvent = {
      type: 'transaction.deleted',
      data: {
        account_id: 'acc_00008gju41AHyfLUzBUk8A',
      },
    };

    const res = eventParser(invalidEvent);

    expect(res).toBe(false);
  });

  describe('Passed a valid event', () => {
    let event;

    beforeEach(() => {
      event = fs.readFileSync(path.join(__dirname, '../example_data/transaction1.json'));
    });

    describe('as a string', () => {
      it('Should return the events data', () => {
        const res = eventParser(event);

        expect(typeof res).toBe('object');
        expect(res.amount).toBe(-350);
      });
    });

    describe('as JSON', () => {
      it('Should return the events data', () => {
        const jsonEvent = JSON.parse(event);
        const res = eventParser(jsonEvent);

        expect(typeof res).toBe('object');
        expect(res.amount).toBe(-350);
      });
    });
  });
});
