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
    pricePerNight: {
        type: Number,
        required: true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
    },
    status: {
        type: Boolean,
        default: true
    },
});



export default mongoose.model('Room', RoomSchema);
