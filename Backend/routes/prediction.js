const express = require('express');
const jwtDecode = require('jwt-decode');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

const {PREDICTIONSCORE,PREDICTIONSCOREDATE,PREDICTIONACTIVEDATE}=require('../kafka/topics');

router.post('/', checkAuth, (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);

  req.body.path = 'user-get-profile';
  req.body.userId = decoded.id;

  kafka.make_request(PREDICTIONSCORE, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        message:results.data.message,
      }));
    }
  });
});

router.post('/date', checkAuth, (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);

  req.body.path = 'user-get-profile';
  req.body.userId = decoded.id;

  kafka.make_request(PREDICTIONSCOREDATE, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        data:results.data,
      }));
    }
  });
});

router.post('/active', checkAuth, (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);

  req.body.path = 'user-get-profile';
  req.body.userId = decoded.id;

  kafka.make_request(PREDICTIONACTIVEDATE, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        data:results.data,
      }));
    }
  });
});

module.exports = router;
