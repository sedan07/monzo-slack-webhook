const ApiBuilder = require('claudia-api-builder');
const SlackWebhook = require('./lib/slack-webhook');
const eventParser = require('./lib/event-parser');
const formatMessage = require('./lib/format-message');

const api = new ApiBuilder();

module.exports = api;

api.post('/', (request) => {
  if (process.env.SLACK_WEBHOOK === undefined) {
    throw new Error('SLACK_WEBHOOK environment var must be set');
  }
  const webhook = process.env.SLACK_WEBHOOK;
  const event = eventParser(request.body);

  const slack = new SlackWebhook({
    url: webhook,
  });

  const message = formatMessage(event);

  return slack.sendMessage(message)
    .then();
});
