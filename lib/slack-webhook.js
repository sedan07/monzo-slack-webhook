const https = require('https');
const URL = require('url');

module.exports = function SlackWebhook(options) {
  let url;

  if ((options !== undefined) && (options.url !== undefined)) {
    url = URL.parse(options.url);
  }

  this.sendMessage = function (message) {
    return new Promise(function (resolve, reject) {
      if (url === undefined) {
        throw 'You must set the slack webhook url before sending any messages'
      }
      const postBody = JSON.stringify({
        text: message
      });

      const options = {
        protocol: url.protocol,
        hostname: url.hostname,
        path: url.path,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postBody)
        },
        method: 'POST'
      }

      let req = https.request(options, function(response) {
        if (response.statusCode !== 200) {
          return reject('Slack API returned HTTP code: ' + response.statusCode)
        }

        resolve()
      });


      req.on('error', function(e) {
        console.error(`problem with request: ${e.message}`);
        reject(e);
      });

      req.write(postBody);
      req.end();
    });
  }

};
