const mongoose = require('mongoose');
const PostLike = require('./postLike');
const Notification = require('./notification');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        default: ""
    },
    photo: {type: String, default: '1589232469458nopic.png'},
    hashtags: {type: Array, default: []},
    tags: {type: Array, default:[]},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, { timestamps: true });

postSchema.pre('remove', async function(next) {
    try {
        await PostLike.remove({ post: this._id });
        await Notification.remove({ post: this._id });

        return next();
    } catch(err) {
        return next(err);
    }
});

module.exports = mongoose.model('Post', postSchema);