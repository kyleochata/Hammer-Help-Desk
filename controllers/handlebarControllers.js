const { Log, User, Ticket } = require('../models');
const { Op } = require('sequelize');

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
      if (getTicket.isArchived) {
        res.redirect('/home');
      }
      if (req.session.role === 'client' && getTicket.clientId !== req.session.user.id) {
        res.redirect('/home');
        return;
      }
      res.render('ticket', {
        loggedIn: true,
        title: getTicket.dataValues.subject,
        layout: 'main', // TODO: this might need to be 'ticket' to direct to the ticket layout
        role: req.session.role
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
      const where = {};
      if (req.session.role === 'client') {
        where.clientId = req.session.user_id
      } else {
        //where.techId = req.session.user_id;
        where[Op.or] = {techId: req.session.user_id, status: 'Open' } // Op.or
      }
      // IF for req.session.role === tech
      if (status) {
        where.status = status;
      }; console.log(where);
      const ticketData = await Ticket.findAll({
        where: where,
        include: [
          {
            model: User,
            as: 'client'
          },
          {
            model: User,
            as: 'tech'
          },
          {
            model: Log,
          }
        ]
      })

      const tickets = ticketData.map((tickets) => tickets.get({ plain: true }));
      const isTech = (req.session.role !== 'client') ? true : false;
      console.log(isTech);
      res.render('home',
        {
          tickets: [...tickets.map(ticket => ({ ...ticket, isTech }))],
          isTech,
          loggedIn: true, // req.session.loggedIn
          title: 'Dashboard',
          layout: 'main',
          userType: req.session.role,
        }
      )
      console.log(status);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
};

module.exports = handlebarController;