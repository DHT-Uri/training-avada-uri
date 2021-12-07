const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.js')

router.route('/')
    .get(UserController.getUser)
    .post()
    .patch()
    .put()
    .delete()

module.exports = router;