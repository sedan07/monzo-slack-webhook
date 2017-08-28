const slackWebhook = require('../lib/slack-webhook')
const nock = require('nock')

describe('slackWebhook', function() {

  describe('sendMessage', function() {
    it('Should make a HTTP request to hooks.slack.com', function(done) {
      var scope = nock('https://hooks.slack.com')
          .post('/services/THISISDUMMY/URL')
          .reply(200, 'ok');

      var slack = new slackWebhook({
        url: 'https://hooks.slack.com/services/THISISDUMMY/URL'
      });

      slack.sendMessage('test').then(function() {
        expect(scope.isDone()).toBe(true)
        done()
      })
    });

    it('Should reject the promise if slack returns an error', function(done) {
      var scope = nock('https://hooks.slack.com')
          .post('/services/THISISDUMMY/URL')
          .reply(400, 'ok');

      var slack = new slackWebhook({
        url: 'https://hooks.slack.com/services/THISISDUMMY/URL'
      });

      slack.sendMessage('test').then(function() {
        expect('Promise not to resolve').toBe(false)
        done()
      }).catch(function() {
        expect(scope.isDone()).toBe(true)
        done()
      });
    });

    it('Should throw an error if URL is not set', function(done) {
      var slack = new slackWebhook();

      slack.sendMessage('test').then(function() {
        expect('Promise not to resolve').toBe(false)
        done()
      }).catch(function(e) {
        expect(e).toMatch(/slack webhook url/)
        done()
      });
    });
  });

});
