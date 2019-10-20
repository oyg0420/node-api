const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const _ = require('lodash');

const users = [
  {id: 1, name: 'alice'},
  {id: 2, name: 'jake'},
  {id: 3, name: 'yoon'},
];

app.use(morgan('dev'));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.json({ data: 'hello world' });
});

app.get('/users', (req, res) => {

  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  // :id가 숫자형이 아닌경우
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const user = users.filter(u => u.id === id)[0];

  // id에 대당하는 user가 존재하지 않는 경우
  if (!user) {
    return res.status(404).end();
  }

  return res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (Number.isNaN(id)) return res.status(400).end();

  return res.status(204).end();
});

app.post('/users', (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.status(400).end();
  }

  if (_.some(users, (u) => u.name === name)) {
    return res.status(409).end();
  }

  const id = Date.now();
  const user = { id, name };
  users.push(user);

  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  const user = users.filter(u => u.id === id)[0];
  if (_.size(user) === 0) return res.status(404).end();
  if (_.some(users, (u) => u.name === name)) return res.status(409).end();

  user.name = name;

  res.status(200).json(user);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
