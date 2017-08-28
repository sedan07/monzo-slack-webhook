const formatMessage = require('../lib/format-message');
const fs = require('fs');
const path = require('path')

describe('formatMessage()', function() {

  describe('amount', function() {
    var event;

    beforeEach(function() {
      const rawEvent = fs.readFileSync(path.join(__dirname, '../example_data/transaction1.json'))
      event = JSON.parse(rawEvent).data;
    });

    it('Correctly inserts the decimal point', function() {
      var message = formatMessage(event)

      expect(message).toMatch(/3\.50/)
    });

    it('Correctly converts all values into absolute ones', function() {
      var message = formatMessage(event)

      expect(message).toMatch(/[^\-\+]3\.50/)
    });

  });

  describe('direction', function() {
    var event;

    it('Correctly detects debits', function() {
      event = {
        "account_id": "acc_00008gju41AHyfLUzBUk8A",
        "amount": -350,
        "created": "2015-09-04T14:28:40Z",
        "currency": "GBP",
        "description": "Ozone Coffee Roasters"
      }
      var message = formatMessage(event)

      expect(message).toMatch(/charged/)
    });

    it('Correct detects credits', function() {
      event = {
        "account_id": "acc_00008gju41AHyfLUzBUk8A",
        "amount": 350,
        "created": "2015-09-04T14:28:40Z",
        "currency": "GBP",
        "description": "Ozone Coffee Roasters"
      }
      var message = formatMessage(event)

      expect(message).toMatch(/credited/)
    });

  });

  describe('who', function() {
    var event;

    beforeEach(function() {
      const rawEvent = fs.readFileSync(path.join(__dirname, '../example_data/transaction1.json'))
      event = JSON.parse(rawEvent).data;
    });

    it('Correctly inserts the account', function() {
      var message = formatMessage(event)

      expect(message).toMatch(/Ozone Coffee Roasters/)
    });

  });

});
