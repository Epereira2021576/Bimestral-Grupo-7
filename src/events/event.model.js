import mongoose from "mongoose";


const EventSchema = new mongoose.Schema( {
    eventTitle: {
        type: String,
        required: true
    },
    eventDescription: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    location: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }],
    additionalInfo: [{
        type: String,
    }],
    eventServices: [{
        type: String,
    }],

} );

export default mongoose.model( 'Event', EventSchema );