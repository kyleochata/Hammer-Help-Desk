const { Ticket, Log, User } = require('../models');

const ticketController = {

    // Create Ticket
    createTicket: async (req, res) => {
        try {
            const ticket = await Ticket.create(req.body);
            return res.redirect(`/ticket/${ticket.id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    },

    // Edit Ticket
    editTicket: async (req, res) => {
        try {
            const { id } = req.params;
            let ticket = await Ticket.findByPk(id);

            if (!ticket) {
                return res.status(404).send("Ticket not found.");
            }

            // Capture original ticket data before changes
            const originalData = ticket.dataValues;

            // Update ticket
            for (let key in req.body) {
                ticket[key] = req.body[key];
            }

            // If a techId was added, change status to Claimed
            if (req.body.techId) {
                ticket.status = 'Claimed';
            }

            await ticket.save();

            if (req.session && req.session.user) {
                await ticket.logChange(req.session.user.id, originalData);
            }

            return res.redirect(req.headers.referer || `/ticket/${id}`);

        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    },

    // Archive Ticket
    archiveTicket: async (req, res) => {
        try {
            const { id } = req.params;
            let ticket = await Ticket.findOne({
                where: {
                    id: id,
                    status: 'Resolved'
                }
            });

            if (!ticket) {
                return res.status(404).send("Ticket not found or not Resolved.");
            }

            ticket.isArchived = true;
            await ticket.save();

            return res.redirect(req.headers.referer || `/ticket/${id}`);

        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    },

};

module.exports = ticketController;
