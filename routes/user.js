const router = require('express').Router();
const User = require('../handlers/user');
const Upload = require('../middleware/upload');

router.post('/uploadPhoto', Upload.single('profilePicture'), User.uploadProfilePhoto);

module.exports = router;