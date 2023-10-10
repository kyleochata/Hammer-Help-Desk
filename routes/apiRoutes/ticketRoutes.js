const router = require('express').Router();
// const { createTicket, editTicket, archiveTicket } = require('../../controllers/ticketControllers');
const ticketController = require('../../controllers/ticketControllers')
const { withAuth } = require('../../utils/helpers')
// POST will call the createTicket controller.

// PUT will call the editTicket controller.
// DELETE will call the archiveTicket controller.


// The routes will match '/api/ticket' to handle POST requests.
router.route('/')
  .post(withAuth, ticketController.createTicket);

// router.post('/:id', ticketController.editTicket);


// The routes will also match '/api/ticket/:id' to handle PUT, and DELETE requests.
router.route('/:id')
  .put( withAuth, ticketController.editTicket)

router.route('/:id')
  .delete(withAuth, ticketController.archiveTicket)


module.exports = router;