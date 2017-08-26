var ApiBuilder = require('claudia-api-builder'),
    eventParser = require('./lib/event-parser'),
    api = new ApiBuilder();

module.exports = api;

api.post('/', function (request) {
  const event = eventParser(request.body)
  return event;
});
