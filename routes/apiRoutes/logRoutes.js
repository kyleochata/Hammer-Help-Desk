const router = require('express').Router();
const logController = require('../../controllers/logControllers');
const { withAuth } = require('../../utils/helpers')
// POST will call the createLog controller.
// '/api/log/:ticketId/:logId?drawer=BOOLEAN?? 
router.route('/:ticketId?')
  .post(withAuth, logController.createLog);

// PUT will call the editLog controller.
// DELETE will call the deleteLog controller.
// '/api/log/:ticketId/:logId?drawer=BOOLEAN??
router.route('/:ticketId/:logId?drawer=BOOLEAN?')
  .put(withAuth, logController.editLog)
  .delete(withAuth, logController.deleteLog);


module.exports = router;