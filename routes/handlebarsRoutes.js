const express = require('express');
const router = require('express').Router();
const path = require('path');
const ticketController = require('../controllers/ticketControllers');
// const withAuth = require('../utils/helpers');
const { Ticket, User, Log } = require('../models');

// The route will match '/login' to handle GET calls.
// This should run the renderLogin handlebars controller
router.get('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400)
        .json({ message: 'Incorrect email or password, please try again.' });
      return;
    }

    const checkPassword = await User.checkPassword(req.body.password);

    if (!checkPassword) {
      res.status(400)
        .json({ message: 'Incorrect email or password, please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are now logged in.' });
    });
  } catch (err) {
    res.status(404).json(err);
  }
})


// The route will match '/:status?' to handle GET calls.
// This should run the renderDashboard handlebars controller.
router.get('/:status?', async (req, res) => {
  let status = req.params.status || '';
  status = status.toString();
  console.log(status);
  try {
    const ticketData = await Ticket.findAll({
      where: {
        status: `${status}`,
        isArchived: {[Op.not]: true}
      },
      include:
        [{ model: User, as: 'client' },
        { model: User, as: 'tech' }]
    });
    console.log(ticketData);
    if (!ticketData) {
      return res.status(404).json({
        message: 'No ticket found by that id'
      })
    }
    const tickets = ticketData.map(eachTicket => eachTicket.get({ plain: true }))


    if (tickets.client.id === req.session.user_id) {
      res.render('home', {
        ...tickets,
        loggedIn: req.session.loggedIn,
        title: "Dashboard",
        layout: "main",
        userType: "client"
      })
    }

    if (tickets.tech.id === req.session.user_id) {

      res.render('home', {
        ...tickets,
        loggedIn: req.session.loggedIn,
        title: "Dashboard",
        layout: "main",
        userType: "tech"
      })
    }
  } catch (err) {
    res.status(404).json(err);
  }
});



// The route will match '/ticket/:id' to handle GET calls.
// This should run the renderTicket handlebars controller.


// router.route('/ticket/:id')
  // .get(ticketController.editTicket);
//   try{
//     const getTicket = await Ticket.findByPk(id, {
//       include: [
//         {
//           model: User,
//           as: 'client',
//           attributes: ['firstName', 'lastName', 'id', 'role'],
//         },
//         {
//           model: User,
//           as: 'tech',
//           attributes: ['firstName', 'lastName', 'id', 'role'],
//           model: Log,
//         }
//       ]
//     });
//     if (getTicket.isArchived) {
//       res.redirect('/home');
//     }
//     if (req.session.user.role === 'client' && ticket.clientId !== req.session.user.id) {
//       res.redirect('/home');
//       return;
//     }
//     res.render('ticket', {
//       loggedIn: true,
//       title: req.session.ticket.subject,
//       layout: 'main',
//       role: req.session.user.role 
//     })
//   } catch(err) {
//     res.status(400).json(err);
//   }
// });

module.exports = router;