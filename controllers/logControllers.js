const { Log, User, Ticket } = require("../models");

const logController = {

    // Create Log
    createLog: async (req, res) => {
        try {
            const { message, type } = req.body;
            const isHidden = req.body.isHidden === 'true' ? true : false;
            req.body.isHidden = isHidden;
            console.log(req.body);

            console.log("this is isHidden: \n\n");
            console.log(isHidden);
            console.log("end of isHidden: \n\n");

            // Check the validity of the type
            const allowedTypes = ["Created", "Modified", "Message"];
            if (!allowedTypes.includes(type)) {
                return res.status(400).send("Invalid log type provided.");
            }

            // Get userID from session
            const userId = req.session.user_id;

            // Get ticketId from request parameters
            const { ticketId } = req.params;

            

            const log = await Log.create({
                userId,
                ticketId,
                message,
                type,
                isHidden: isHidden || false // Default to false if not provided
            });

            // Check for drawer query parameter
            const redirectTo = req.query.drawer === "true"
                ? `/ticket/${ticketId}?drawer=true`
                : `/ticket/${ticketId}`;

            return res.redirect(redirectTo);

        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    },

    // Edit Log
    editLog: async (req, res) => {
        try {
            const { logId } = req.params;
            const { message, type, isHidden } = req.body;

            

            const log = await Log.findByPk(logId);
            if (!log) {
                return res.status(404).send("Log not found.");
            }

            log.message = message;
            log.type = type;
            log.isHidden = isHidden;

            await log.save();

            // console.log(ticketId);

            // const redirectTo = req.query.drawer === "true"
            //     ? `/ticket/${log.ticketId}?drawer=true`
            //     : `/ticket/${log.ticketId}`;

            // return res.status(200).json({ message: "Log updated successfully." });

        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    },

    // Delete Log
    deleteLog: async (req, res) => {
        try {
            const { ticketId } = req.params;
            const log = await Log.findOne({ where: { ticketId } });

            if (!log) {
                return res.status(404).send("Log not found.");
            }

            await log.destroy();

            const redirectTo = req.query.drawer === "true"
                ? `/ticket/${ticketId}?drawer=true`
                : `/ticket/${ticketId}`;

            return res.redirect(redirectTo);

        } catch (error) {
            console.error(error);
            res.status(500).send("Server Error");
        }
    }

};

module.exports = logController;
