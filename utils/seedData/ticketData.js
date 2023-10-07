const { Ticket } = require('../../models');

const ticketData = [
    {
        clientId: 5,
        techId: 1,
        subject: 'IT Help',
        description: "My computer froze.",
        status: 'Claimed',
        isArchived: false,
    },
    {
        clientId: 6,
        techId: 3,
        subject: "Software Help",
        description: "I cannot launch this program.",
        status: 'Claimed',
        isArchived: false,
    },
    {
        clientId: 7,
        techId: 4,
        subject: "Hardware Help",
        description: "I don't know if my computer parts are compatible.",
        status: 'Resolved',
        isArchived: true,
    },
    {
        clientId: 5,
        techId: 1,
        subject: 'Access issue',
        description: 'Issue with infinite redirects',
        status: 'Pending',
        isArchived: false
    },
    {
        clientId: 6,
        techId: null,
        subject: 'Image broken',
        description: 'Image will not load',
        status: 'Open',
        isArchived: false
    },
    {
        clientId: 7,
        techId: null,
        subject: 'Cannot logout',
        description: 'no logout button',
        status: 'Open',
        isArchived: false
    }
]

const seedTickets = () => Ticket.bulkCreate(ticketData);

module.exports = seedTickets;