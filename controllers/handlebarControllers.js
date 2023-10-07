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
  // Homepage
  // The Dashboard view will be displayed when the URL path is '/:status?'.
  // This view will be rendered with the home view, the main layout, the title of 'Dashboard', and whichever user type the user authenticated with.
  // If the user is not logged in, they will be automatically redirected away from this view to the Login page instead though the withAuth middleware.
  // If the user is signed in as a client:

  // We will need to query to the Ticket model where clientId matches the user.userId of the signed in user from the session object, and include User data.
  // Only tickets where their user id is present on the 'clientId' field will be included.
  // If the user is signed in as a tech:

  // We will need to query to the Ticket model and include User data.
  // Tickets where their user id is present on the 'techId' field will be included, as well as any tickets which have the 'status' of 'Open'.
  // If the status parameter is applied to the request, filter the tickets to only those whose status value match the request.
  // All tickets should include client and tech firstName lastName id and role from associated Users.
  // Only tickets which have not been archived should be included in these results.
  // We will need to serialize the data before the view renders.
  // This view should receive the required values based on context, but also

  // loggedIn: BOOLEAN
  // title: STRING
  // layout: STRING
  // userType: STRING
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