const router = require('express').Router();
// const { createTicket, editTicket, archiveTicket } = require('../../controllers/ticketControllers');
const ticketController = require('../../controllers/ticketControllers')

// POST will call the createTicket controller.

// PUT will call the editTicket controller.
// DELETE will call the archiveTicket controller.


// The routes will match '/api/ticket' to handle POST requests.
router.route('/api/ticket')
.post(ticketController.createTicket);

// The routes will also match '/api/ticket/:id' to handle PUT, and DELETE requests.
router.route('/api/ticket/:id')
  .put(ticketController.editTicket)
  .delete(ticketController.archiveTicket)

module.exports = router;