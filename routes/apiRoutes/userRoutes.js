const router = require('express').Router();
const userController = require('../../controllers/userControllers');


// POST will call the loginUser controller.

// DELETE will call the logoutUser controller.

router.route('/api/user')
  .post(userController.loginUser)
  .delete(userController.logoutUser)

module.exports = router;