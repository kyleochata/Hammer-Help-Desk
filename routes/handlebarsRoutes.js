const express = require('express');
const router = require('express').Router();
const path = require('path');
const handlebarController = require('../controllers/handlebarControllers');


// The route will match '/:status?' to handle GET calls.
// This should run the renderDashboard handlebars controller.
// change to router.get ('/:status?') async etc
router.route('/:status?')
  .get(handlebarController.renderDashboard);



// The route will match '/ticket/:id' to handle GET calls.
// This should run the renderTicket handlebars controller.

router.route('/ticket/:id')
  .get(handlebarController.renderTicket);

router.get('/login', async (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }
  res.render('login');
});

module.exports = router;