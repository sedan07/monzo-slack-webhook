const slackWebhook = require('../lib/slack-webhook')
const nock = require('nock')

describe('slackWebhook', function() {

  describe('sendMessage', function() {
    it('Should make a HTTP request to hooks.slack.com', function() {
      var scope = nock('https://hooks.slack.com')
          .post('/services/THISISDUMMY/URL')
          .reply(200, '');

      var slack = new slackWebhook({
        url: 'https://hooks.slack.com/services/THISISDUMMY/URL'
      });
      slack.sendMessage('test')

      expect(scope.isDone()).toBe(true)
    
    });

  });

});
