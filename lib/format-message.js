module.exports = function FormatMessage(event) {
  const amount = Math.abs(event.amount / 100).toFixed(2);

  const direction = (event.amount < 0) ? 'charged' : 'credited';

  return `Your account has been ${direction} £${amount} by ${event.description}`;
};
