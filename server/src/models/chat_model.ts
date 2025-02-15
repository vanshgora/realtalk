const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    file: {
        type: Object
    },
    // roomId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Room',
    //     required: true
    // },
    // replayFor: {
    //     type: Schema.Types.ObjectId,,
    //     ref: 'Chat'
    // }
});

const chatModel = mongoose.model('Chat', ChatSchema);
export default chatModel;