const express = require('express');
const router_talent = express.Router();

const router = require('./route');

router.get('/reports/relocation_data', (req, res, next) => {
  data = [
    ['Task', 'Hours per Day'],
    ['Work', 11],
    ['Eat', 2.7],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ];
  console.log("Data from the server :", data);
  res.json(data);
});

module.exports = router;
