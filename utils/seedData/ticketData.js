const { Ticket } = require('../../models');

const ticketData = [
    {
        clientId: 5,
        techId: 1,
        subject: 'IT Help',
        description: "My computer froze.",
        status: 'OPEN',
        isArchived: 'false',
    },
    {
        clientId: 6,
        techId: 3,
        subject: "Software Help",
        description: "I cannot launch this program.",
        status: 'OPEN',
        isArchived: 'false',

    },
    {
        clientId: 7,
        techId: 4,
        subject: "Hardware Help",
        description: "I don't know if my computer parts are compatible.",
        status: 'CLOSED',
        isArchived: 'true',
    }
]

const seedTickets = () => Ticket.bulkCreate(ticketData);

module.exports = seedTickets;