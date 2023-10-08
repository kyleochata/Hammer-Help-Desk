const { Log, User, Ticket } = require('../models');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');

const handlebarController = {
  renderTicket: async (req, res) => {
    try {
      const getTicket = await Ticket.findByPk(req.params.id, {
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['firstName', 'lastName', 'id', 'role'],
          },
          {
            model: User,
            as: 'tech',
            attributes: ['firstName', 'lastName', 'id', 'role'],
          },
          {
            model: Log,
          }
        ]
      });
      const ticketData = getTicket.get({ plain: true});
      if (ticketData.isArchived) {
        res.redirect('/');
      }
      if (req.session.role === 'client' && ticketData.clientId !== req.session.user_id) {
        res.redirect('/');
        return;
      }
      res.render('ticket', {
        loggedIn: req.session.loggedIn,
        ticketData,
        title: ticketData.subject,
        layout: 'main', // TODO: this might need to be 'ticket' to direct to the ticket layout
        role: req.session.role,
        firstName: req.session.firstName,
        lastName:req.session.lastName,
        user: req.session.user_id,
        // current signed in user
      })
    } catch (err) {
      res.status(500).send("Error retrieving Ticket");
    }
  },

  renderLogin: async (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/')
    }
    res.render('login', {
      layout: 'login'
    })
  },

  renderDashboard: async (req, res) => {
    try {
      const status = req.params.status || '';
      // console.log(status)
      const where = {};
      if (status) {
        where.status = status;
      };
      if (req.session.role === 'client') {
        where.clientId = req.session.user_id
      } else {
        //where.techId = req.session.user_id;
        if (status !== 'Open' && status !== '') {
          where.techId = req.session.user_id;
        } else {
          where[Op.or] = [
            { techId: req.session.user_id },
            { techId: null }
          ]
        }
      }
      // IF for req.session.role === tech
      console.log(where);
      const ticketData = await Ticket.findAll({
        where: where,
        include: [
          {
            model: User,
            as: 'client',
            attributes: ['firstName', 'lastName', 'id', 'role'],
          },
          {
            model: User,
            as: 'tech',
            attributes: ['firstName', 'lastName', 'id', 'role'],
          },
        ]
      })
      let tickets = ticketData.map((tickets) => tickets.get({ plain: true }));
      console.log(tickets)
      const isTech = (req.session.role !== 'client') ? true : false;

      //notClaimed needed for handlebars to know that if the techId on the ticket is null, then the claim button should appear


      const testTicket = (tickets) => {
        for (const ticket of tickets) {
          if (ticket.techId !== null) {
            ticket.notClaimed = false
          } else {
            ticket.notClaimed = true
          }
        }
        return tickets
      }

      tickets = await testTicket(tickets);

      res.render('home',
        {
          tickets: [...tickets.map(ticket => ({ ...ticket, isTech }))],
          userid:req.session.user_id,
          isTech,
          loggedIn: true, // req.session.loggedIn
          title: 'Dashboard',
          layout: 'main',
          userType: req.session.role,
          firstName: req.session.firstName
        }
      )
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
}



module.exports = handlebarController