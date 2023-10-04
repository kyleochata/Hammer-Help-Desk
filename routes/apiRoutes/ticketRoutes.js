const router = require('express').Router();
// const { createTicket, editTicket, archiveTicket } = require('../../controllers/ticketControllers');
const ticketController = require('../../controllers/ticketControllers')
// The routes will match '/api/ticket' to handle POST requests.

// POST will call the createTicket controller.

// The routes will also match '/api/ticket/:id' to handle PUT, and DELETE requests.

// PUT will call the editTicket controller.
// DELETE will call the archiveTicket controller.

router.route('/api/ticket')
  .post(ticketController.createTicket);

router.route('/api/ticket/:id')
  .put(ticketController.editTicket)
  .delete(ticketController.archiveTicket)