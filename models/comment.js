const mongoose = require('mongoose');
const Notification = require('./notification');

const commentSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

commentSchema.pre('remove', async function(next) {
    try { 
        await Notification.remove({ comment: this._id });

        next();
    } catch(err) {
        return next();
    }
});

module.exports = mongoose.model('Comment', commentSchema);