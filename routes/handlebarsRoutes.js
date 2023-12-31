const express = require('express');
const router = require('express').Router();
const path = require('path');
const handlebarController = require('../controllers/handlebarControllers');
const { withAuth } = require('../utils/helpers');

// The route will match '/:status?' to handle GET calls.
// This should run the renderDashboard handlebars controller.
// change to router.get ('/:status?') async etc
router.route('/login')
  .get(handlebarController.renderLogin);

router.route('/ticket/:id?drawer=BOOLEAN')
  .get(withAuth, handlebarController.renderTicket)

router.route('/ticket/:id')
  .get(withAuth, handlebarController.renderTicket);

router.route('/:status?')
  .get(withAuth, handlebarController.renderDashboard);

// The route will match '/ticket/:id' to handle GET calls.
// This should run the renderTicket handlebars controller.



module.exports = router;