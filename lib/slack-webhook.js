const https = require('https');
const URL = require('url');

module.exports = function SlackWebhook(options) {
  let url;

  if ((options !== undefined) && (options.url !== undefined)) {
    url = URL.parse(options.url);
  }

  this.sendMessage = function sendMessage(message) {
    return new Promise(((resolve, reject) => {
      if (url === undefined) {
        throw new Error('You must set the slack webhook url before sending any messages');
      }
      const postBody = JSON.stringify({
        text: message,
      });

      const reqOptions = {
        protocol: url.protocol,
        hostname: url.hostname,
        path: url.path,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postBody),
        },
        method: 'POST',
      };

      const req = https.request(reqOptions, (response) => {
        if (response.statusCode !== 200) {
          return reject(`Slack API returned HTTP code: ${response.statusCode}`);
        }

        return resolve();
      });


      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e);
      });

      req.write(postBody);
      req.end();
    }));
  };
};
