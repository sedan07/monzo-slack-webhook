const slackWebhook = require('../lib/slack-webhook');
const nock = require('nock');

describe('slackWebhook', () => {
  describe('sendMessage', () => {
    it('Should make a HTTP request to hooks.slack.com', (done) => {
      const scope = nock('https://hooks.slack.com')
        .post('/services/THISISDUMMY/URL')
        .reply(200, 'ok');

      const slack = new slackWebhook({
        url: 'https://hooks.slack.com/services/THISISDUMMY/URL',
      });

      slack.sendMessage('test').then(() => {
        expect(scope.isDone()).toBe(true);
        done();
      });
    });

    it('Should reject the promise if slack returns an error', (done) => {
      const scope = nock('https://hooks.slack.com')
        .post('/services/THISISDUMMY/URL')
        .reply(400, 'ok');

      const slack = new slackWebhook({
        url: 'https://hooks.slack.com/services/THISISDUMMY/URL',
      });

      slack.sendMessage('test').then(() => {
        expect('Promise not to resolve').toBe(false);
        done();
      }).catch(() => {
        expect(scope.isDone()).toBe(true);
        done();
      });
    });

    it('Should throw an error if URL is not set', (done) => {
      const slack = new slackWebhook();

      slack.sendMessage('test').then(() => {
        expect('Promise not to resolve').toBe(false);
        done();
      }).catch((e) => {
        expect(e).toMatch(/slack webhook url/);
        done();
      });
    });
  });
});
