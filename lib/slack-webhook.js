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
      const messageJson = {
        text: message
      }

      const options = {
        protocol: url.protocol,
        hostname: url.hostname,
        path: url.path,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(messageJson))
        },
        method: 'POST'
      }

      let req = https.request(options, function(response) {
        var body = '';
        response.on('data', function(d) {
          body += d;
        });
        response.on('end', function() {
          console.log(response.statusCode)
          console.log(body);
          resolve()
        });
      });


      req.on('error', function(e) {
        console.error(`problem with request: ${e.message}`);
        reject(e);
      });

      req.write(JSON.stringify(messageJson));
      req.end();
    });
  }

};
