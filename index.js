const { send, json } = require('micro');
const cors = require('micro-cors')();
const { router, get, post } = require('microrouter');

const db = require('./db');
const { getTaxes } = require('./getTax');

const home = (req, res) => send(res, 200, 'You talkin\' to me?');
const countries = (req, res) => send(res, 200, {
  countries: db.get('countries').value()
});
const rules = (req, res) => send(res, 200, {
  rules: db.get('taxRules').value()
});
const taxes = async (req, res) => {
  const query = await json(req);

  return send(res, 200, getTaxes(query));
};

module.exports = cors(router(
  get('/', home),
  get('/countries', countries),
  get('/rules', rules),
  post('/taxes', taxes),
));

