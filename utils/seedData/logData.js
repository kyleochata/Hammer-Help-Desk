const { Log } = require('../../models');

const logData = [
    {
        userId: 1,
        ticketId: 1,
        message: "Started ticket.",
        type: 'Message',
        isHidden: false,
    },
    {
        userId: 3,
        ticketId: 2,
        message: "Started ticket.",
        type: 'Message',
        isHidden: false,
    },
    {
        userId: 4,
        ticketId: 3,
        message: "Closed ticket.",
        type: 'Message',
        isHidden: false,
    }
]

const seedLog = () => Log.bulkCreate(logData)

module.exports = seedLog;