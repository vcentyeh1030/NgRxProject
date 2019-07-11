var express = require('express');
var router = express.Router();
var reportService = require('../service/reports.service');

/** get report */
router.get('/', (req, res) => {
  reportService.getReports()
    .then((result) => {
      res.json({ success: true, payload: result });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
