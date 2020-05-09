const Config = require('../config');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const uploadPhoto = async (req, res) => {
    console.log(req.file.path);
}

module.exports = {
    uploadPhoto
}