const User = require('../models/User');
const bcrypt = require('bcrypt');

const userController = {

    // Login User
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).send('Invalid credentials');
            }

            req.session.user = {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName
            };

            return res.redirect('/home'); // Redirect to home page

        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    },

    // Logout User
    logoutUser: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send('Server Error during logout');
            }
            return res.redirect('/login'); // Redirect to login page
        });
    }

};

module.exports = userController;
