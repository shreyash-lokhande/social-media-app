const Config = require('../config');
const Validations = require('../validations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Notification = require('../models/notification');
const Followers = require('../models/followers');
const Followings = require('../models/followings');

const uploadProfilePhoto = async (req, res) => {
    res.send('s');
}

const changeProfilePicture = async (req, res) => {

}

const removeProfilePicture = async (req, res) => {

}

const register = async (req, res) => {
    const { error } = Validations.registerValidation(req.body);
    if(error) return res.json({message: error.details[0].message});

    const emailExist = await User.findOne({ $or: [{email: req.body.email}, {username: req.body.username}]});
    if(emailExist) return res.status(400).json({ message: 'User exists' });

    try {
        const newUser = await User.create(req.body);
        newUser.generateToken(newUser, (err, token) => {
            if(err) return res.status(400).json({ message: 'Could not sign you in. Try again.' }); 
            return res.status(201).json({
                token,
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    profilePicture: newUser.profilePicture,
                    bio: newUser.bio,
                    email: newUser.email
                }
            });
        });
    } catch (err) {
        return res.status(500).json({ message: err.messsage });
    }
}

const login = async (req, res) => {
    const { error } = Validations.loginValidation(req.body);
    if(error) return res.json({message: error.details[0].message});

    const getUser = await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]});
    if(!getUser) return res.status(400).json({ message: 'User does not exist' });

    try {
        getUser.comparePassword(req.body.password, (err, isMatch) => {
            if(err) return res.status(400).json({ message: 'An error occured'});
            if(!isMatch) return res.status(400).json({ message: 'password does not match' });
            getUser.generateToken(getUser, (err, token) => {
                if(err) return res.status(400).json({ message: 'An error occured' });
                return res.json({
                    token,
                    user: {
                        id: getUser._id,
                        username: getUser.username,
                        firstName: getUser.firstName,
                        lastName: getUser.lastName,
                        profilePicture: getUser.profilePicture,
                        bio: getUser.bio,
                        email: getUser.email
                    }
                });
            });
        });
    } catch(err) {
        return res.status(200).json({ message: err.message });
    }
}

const resetPassword = async (req, res) => {
    const getUser = await User.findById(req.user.id);
    getUser.comparePassword(req.body.oldPassword, async (err, isMatch) => {
        if(err) return res.status(500).json({message: err.message});
        if(!isMatch) return res.status(401).json({ message: 'Password does not match.' });
        
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        
        const newUser = await User.findByIdAndUpdate(req.user.id, {password: hash}, { new: true });
        
        return res.json({message: 'Password changed.'});
    });
}

const forgotPassword = async (req, res) => {

}

const removeUser = async (req, res) => {
    const getUser = await User.findById(req.user.id);
    getUser.comparePassword(req.body.password, async (err, isMatch) => {
        if(err) return res.status(500).json({message: err.message});
        if(!isMatch) return res.status(401).json({ message: 'Password does not match.' });

        await User.findByIdAndRemove(req.user.id);

        return res.json({ message: 'Account deleted.' });
    });
}

const updateUserData = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {$set: req.body}, {new:true});
    res.json({
        id: updatedUser._id,
        username: updatedUser.email, 
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        profilePicture: updatedUser.profilePicture,
        bio: updatedUser.bio
    });
}

const getUser = async (req, res) => {
    const currentUser = await User.findById(req.user.id);
    res.json({
        id: currentUser._id,
        username: currentUser.email, 
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        profilePicture: currentUser.profilePicture,
        bio: currentUser.bio
    });
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