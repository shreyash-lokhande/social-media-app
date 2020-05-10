const Config = require('../config');
const Validations = require('../validations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Notification = require('../models/notification');
const Followers = require('../models/followers');
const Followings = require('../models/followings');

const uploadProfilePhoto = async (req, res) => {
    console.log(req.file.path);
}

const changeProfilePicture = async (req, res) => {

}

const removeProfilePicture = async (req, res) => {

}

const register = async (req, res) => {

}

const resetPassword = async (req, res) => {

}

const forgotPassword = async (req, res) => {

}

const login = async (req, res) => {

}

const removeUser = async (req, res) => {

}

const updateUserData = async (req, res) => {

}

const getUser = async (req, res) => {

}

const followUser = async (req, res) => {

}

const getNewUsers = async (req, res) => {

}

const getUserById = async (req, res) => {

}

const searchUser = async (req, res) => {

}

const getFollowings = async (req, res) => {

}

const getFollowers = async (req, res) => {

}

const unfollowUser = async (req, res) => {

}

const getNotifications = async (req, res) => {

}

module.exports = {
    uploadProfilePhoto,
    changeProfilePicture,
    removeProfilePicture,
    register,
    resetPassword,
    forgotPassword,
    login,
    removeUser,
    updateUserData,
    getUser,
    followUser,
    getNewUsers,
    getUserById,
    searchUser,
    getFollowings,
    getFollowers,
    unfollowUser,
    getNotifications
}