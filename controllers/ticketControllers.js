const { Ticket, Log, User } = require('../models');

const ticketController = {

    // Create Ticket
    createTicket: async (req, res) => {
        try {
            const { subject, description, urgency } = req.body;
            const clientId = req.session.user_id;
            const ticket = await Ticket.create({
                clientId,
                subject,
                description,
                urgency,
            });
            return res.redirect(`/ticket/${ticket.id}`);
        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    },

    // Edit Ticket
    editTicket: async (req, res) => {
        try {

            console.log("Edit Ticket function hit!");

            const { id } = req.params;
            let ticket = await Ticket.findByPk(id);

            

            if (!ticket) {
                return res.status(404).send("Ticket not found.");
            }

            // Capture original ticket data before changes
            const originalData = ticket._previousDataValues;
            
            // console.log(originalData);

            // Update ticket
            for (let key in req.body) {
                console.log(key);
                ticket[key] = req.body[key];
            }

            // If a techId was added, change status to Claimed
            if (req.body.techId) {
                ticket.status = 'Claimed';
            }

            console.log('this is current ticket' + ticket.dataValues);
            console.log('this is original data:' + originalData);

            if (req.session && req.session.user_id) {
                await ticket.logChange(ticket.dataValues, originalData);
                await ticket.save();
            }



            //return res.redirect(`/api/ticket/${id}`);

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
