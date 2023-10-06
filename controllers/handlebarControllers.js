const { Log, User, Ticket } = require('../models');

const handlebarController = {
  renderTicket: async (req, res) => {
    try {
      const getTicket = await Ticket.findByPk(id, {
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
            // Come back to this, does it return all the logs for that TICKET??? Should I include some attributes?
            model: Log,
          }
        ]
      });
      if (getTicket.isArchived) {
        res.redirect('/home');
      }
      if (req.session.user.role === 'client' && getTicket.clientId !== req.session.user.id) {
        res.redirect('/home');
        return;
      }
      res.render('ticket', {
        loggedIn: true,
        title: req.session.ticket.subject,
        layout: 'main',
        role: req.session.user.role
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
        where.techId = req.session.user_id;
        // Need to ask Rachel if the Op.or doesn't work. Do we need to require it somehow?
        // where['Op.or'] = {techId: req.session.user_id, status: 'Open' } // Op.or
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
      console.log(tickets);
      const isTech = (req.session.role !== 'client') ? true : false
      res.render('home',
        {
          tickets,
          loggedIn: true, // req.session.loggedIn
          title: 'Dashboard',
          layout: 'main',
          userType: req.session.role,
          isTech,
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