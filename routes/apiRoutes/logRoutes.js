const router = require('express').Router();
const logController = require('../../controllers/logControllers');

// POST will call the createLog controller.
router.route('/api/log/:ticketId?drawer=BOOLEAN')
  .post(logController.createLog);

// PUT will call the editLog controller.
// DELETE will call the deleteLog controller.

router.route('/api/log/:ticketId/:logId?drawer=BOOLEAN')
  .put(logController.editLog)
  .delete(logController.deleteLog);


module.exports = router;