var ApiBuilder = require('claudia-api-builder'),
    eventParser = require('./lib/event-parser'),
    api = new ApiBuilder(),
    slackWebhook = require('./lib/slack-webhook'),
    formatMessage = require('./lib/format-message');

module.exports = api;

api.post('/', function (request) {
  if (process.env.SLACK_WEBHOOK === undefined) {
    throw 'SLACK_WEBHOOK environment var must be set'
  }
  const webhook = process.env.SLACK_WEBHOOK;
  const event = eventParser(request.body)

  var slack = new slackWebhook({
    url: webhook
  });

  const message = formatMessage(event);

  return slack.sendMessage(message)
           .then()
});
