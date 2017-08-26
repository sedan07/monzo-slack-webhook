module.exports = function parseEvent (rawEvent) {
  var event;

    // Lets double check Claudia parsed the body as JSON
  if (rawEvent.data === undefined) {
    try {
      event = JSON.parse(rawEvent)
    } catch (e) {
      console.error(rawEvent)
      console.error(e.message)
      return false;
    }
  } else {
    event = rawEvent
  }

  // Only dealing with one event type for the moment
  if (event.type !== 'transaction.created') {
    console.error('Event type "'+event.type+'" is not supported')
    return false;
  }

  return event.data;
}
