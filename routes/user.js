const router = require('express').Router();
const User = require('../handlers/user');
const Upload = require('../middleware/upload');
const Auth = require('../middleware/auth');

router.get('/', Auth, User.getUser);
router.post('/register', User.register);
router.post('/login', User.login);
router.post('/reset-password', Auth, User.resetPassword);
router.put('/update', Auth, User.updateUserData);
router.delete('/delete', Auth, User.removeUser);
router.post('/uploadPhoto', [Upload.single('profilePicture'), Auth], User.uploadProfilePhoto);

module.exports = router;