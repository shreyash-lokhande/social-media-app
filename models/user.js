const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const Comment = require('./comment');
const Post = require('./post');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique:true, max: 20},
    firstName: {type:String, default: '', max: 20},
    lastName: {type: String, default: '', max: 20},
    profilePicture: {type: String, default: ''},
    bio: {type: String, default: '', max: 150},
    email: {type: String, required: true, unique: true, max: 80},
    password: {type: String, required: true, min: 6},
    operations: {
        operationType: {
            type: String,
            enum: ["REMOVE_ACCOUNT", "FORGOT_CREDENTIALS"]
        },
        expiresAt: {type: Date},
        operationId: {type: String}
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(this.password, salt);
        
        this.password = hashed;
        
        next();
    } catch(err) {
        return next(err);
    }
});

userSchema.pre('remove', async function(next) {
    try {
        await Comment.remove({ author: this._id });
        await Post.remove({ author: this._id });

        next();
    } catch(err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(password, cb) {
    try {
        const compare = await bcrypt.compare(password, this.password);
        return cb(null, compare);
    } catch(err) {
        return cb(err, null);
    }
}

userSchema.methods.addOperation = async function(opType, cb) {
    try {
        let text = `${opType}+${Math.random()}+${Date.now()}`;
        const salt = await bcrypt.genSalt(5);
        const operationId = await bcrypt.hash(text, salt);
        const expiresAt = moment(moment().format()).add(5, 'm').toDate();

        this.operations.operationType = opType.toUpperCase();;
        this.operations.operationId = operationId;
        this.operations.expiresAt = expiresAt;

        return cb(null, {operationType: opType, msg: '5 minutes to perform this action.' });
    } catch(err) {
        return cb(err, null);
    }
}

module.exports = mongoose.model('User', userSchema);