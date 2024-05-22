import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema( {
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
    available: {
        type: String,
        required: true,
        enum: ["AVAILABLE", "UNAVAILABLE"],
        default: "AVAILABLE"
    }
} );



export default mongoose.model( 'Room', RoomSchema );
