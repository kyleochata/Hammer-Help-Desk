const User = require('../models/User');
const bcrypt = require('bcrypt');

const userController = {

    // Login User
    // The route will match '/login' to handle GET calls.
    // This should run the renderLogin handlebars controller
    // Shows login page API ROUTE once click submit run the func brings to dashboard
    loginUser: async (req, res) => {
        try {
            const userData = await User.findOne({ where: { email: req.body.email } });
            console.log(userData)
            if (!userData) {
                res.status(404)
                    .json({ message: 'Incorrect email or password, please try again.' });
                return;
            } console.log(userData);
            const checkPassword = await userData.checkPassword(req.body.password);
            console.log(checkPassword);
            if (!checkPassword) {
                res.status(400)
                    .json({ message: 'Incorrect email or password, please try again.' });
                return;
            }
            // res.render to Home handlebars
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.loggedIn = true;
                req.session.role = userData.role;
                req.session.firstName = userData.firstName;
                req.session.lastName = userData.lastName;
                res.status(200).json(userData);
            });
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
