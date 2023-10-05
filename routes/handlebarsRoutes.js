const express = require('express');
const router = require('express').Router();
const path = require('path');
const ticketController = require('../controllers/ticketControllers');
// const withAuth = require('../utils/helpers');
const { Ticket, User, Log } = require('../models');

// The route will match '/login' to handle GET calls.
router.get('/login', async (req, res) => {
  try {
    res.render('login', {
      layout: 'login'
    })
  } catch (err) {
    res.status(500).json(err)
  }
})
// This should run the renderLogin handlebars controller
// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res.status(400)
//         .json({ message: 'Incorrect email or password, please try again.' });
//       return;
//     }

//     const checkPassword = await User.checkPassword(req.body.password);

//     if (!checkPassword) {
//       res.status(400)
//         .json({ message: 'Incorrect email or password, please try again.' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.loggedIn = true;
//       res.json({ user: userData, message: 'You are now logged in.' });
//     });
//   } catch (err) {
//     res.status(404).json(err);
//   }
// })


// The route will match '/:status?' to handle GET calls.
// This should run the renderDashboard handlebars controller.
router.get('/:status', async (req, res) => {
  try {
    const status = req.params.status || '';
    console.log(status);

    if (status === 'Open' || status === 'Pending') {
      const ticketData = await Ticket.findAll({
        where: {
          status: req.params.status,
          isArchived: false,
        },
        include: [
          {
            model: User, //I don't think we need this. WIll already have the current user's id from when they log in (req.session.user_id). Then need to compare req.session.user_id to the ticket's id's. If it matches clientId or techId.
            attributes: ['id', 'role']
          }
        ]
      })
      console.log(ticketData);
      if (ticketData.length === 0) {
        res.status(404).json({ message: `open tickets not found` })
      }
      res.status(200).json(ticketData);
    }
    else if (status === 'Resolved') {
      const ticketData = await Ticket.findAll({
        where: {
          status: req.params.status,
        },
        include: [
          {
            model: User,
            attributes: ['id', 'role']
          }
        ]
      })
      console.log(ticketData);
      if (ticketData.length === 0) {
        res.status(404).json({ message: `open tickets not found` })
      }
      res.status(200).json(ticketData);
    }
    else {
      const ticketData = await Ticket.findAll({
        include: [{
          model: User,
          attributes: ['id', 'role']
        }]
      });
      console.log(ticketData);
      if (ticketData.length === 0) {
        res.status(404).json({ message: `open tickets not found` })
      }
      res.status(200).json(ticketData);
    }

  } catch (err) {
    res.status(500).json(err);
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