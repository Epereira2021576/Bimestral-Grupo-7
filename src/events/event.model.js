import mongoose from "mongoose";


const EventSchema = new mongoose.Schema( {
    eventTitle: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: [true],
    },
    eventDescription: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
        required: [true],
    },
    checkOut: {
        type: Date,
        required: [true],
    },
    price: {
        type: Number,
        required: [true],
    },
    hotel: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',

    }],

    amenities: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: "HotelAmenities"
            }
        ]
    }

} );

export default mongoose.model( 'Event', EventSchema );