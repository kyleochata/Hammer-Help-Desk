const router = require('express').Router();
const logController = require('../../controllers/logControllers');

// POST will call the createLog controller.
// '/api/log/:ticketId/:logId?drawer=BOOLEAN?? 
router.route('/api/log/:ticketId?')
  .post(logController.createLog);

// PUT will call the editLog controller.
// DELETE will call the deleteLog controller.
// '/api/log/:ticketId/:logId?drawer=BOOLEAN??
router.route('/api/log/:ticketId/:logId?')
  .put(logController.editLog)
  .delete(logController.deleteLog);


module.exports = router;