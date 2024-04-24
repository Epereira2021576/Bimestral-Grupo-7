import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true
    },
    typeRoom: {
        type: String,
        required: true
    },
    cleanlinessStatus: {
        type: String,
        required: true
    },
    priceForNight: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
});



export default mongoose.model('Room', RoomSchema);
