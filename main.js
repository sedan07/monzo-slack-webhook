var ApiBuilder = require('claudia-api-builder'),
    api = new ApiBuilder();

module.exports = api;

api.post('/', function () {
    return 'hello world';
});
