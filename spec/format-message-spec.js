const formatMessage = require('../lib/format-message');
const fs = require('fs');
const path = require('path');

describe('formatMessage()', () => {
  describe('amount', () => {
    let event;

    beforeEach(() => {
      const rawEvent = fs.readFileSync(path.join(__dirname, '../example_data/transaction1.json'));
      event = JSON.parse(rawEvent).data;
    });

    it('Correctly inserts the decimal point', () => {
      const message = formatMessage(event);

      expect(message).toMatch(/3\.50/);
    });

    it('Correctly converts all values into absolute ones', () => {
      const message = formatMessage(event);

      expect(message).toMatch(/[^\-\+]3\.50/);
    });
  });

  describe('direction', () => {
    let event;

    it('Correctly detects debits', () => {
      event = {
        account_id: 'acc_00008gju41AHyfLUzBUk8A',
        amount: -350,
        created: '2015-09-04T14:28:40Z',
        currency: 'GBP',
        description: 'Ozone Coffee Roasters',
      };
      const message = formatMessage(event);

      expect(message).toMatch(/charged/);
    });

    it('Correct detects credits', () => {
      event = {
        account_id: 'acc_00008gju41AHyfLUzBUk8A',
        amount: 350,
        created: '2015-09-04T14:28:40Z',
        currency: 'GBP',
        description: 'Ozone Coffee Roasters',
      };
      const message = formatMessage(event);

      expect(message).toMatch(/credited/);
    });
  });

  describe('who', () => {
    let event;

    beforeEach(() => {
      const rawEvent = fs.readFileSync(path.join(__dirname, '../example_data/transaction1.json'));
      event = JSON.parse(rawEvent).data;
    });

    it('Correctly inserts the account', () => {
      const message = formatMessage(event);

      expect(message).toMatch(/Ozone Coffee Roasters/);
    });
  });
});
