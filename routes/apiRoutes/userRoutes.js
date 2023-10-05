const router = require('express').Router();
const userController = require('../../controllers/userControllers');


// POST will call the loginUser controller.

// DELETE will call the logoutUser controller.
// router.post
// (userController.loginUser)
router.route('/login')
  .post(userController.loginUser)
  
router.route('/logout')
  .delete(userController.logoutUser)

module.exports = router;