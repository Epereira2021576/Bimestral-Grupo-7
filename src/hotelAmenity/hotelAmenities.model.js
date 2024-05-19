import mongoose, { Schema } from "mongoose";

const HotelAmenitiesSchema = new Schema( {
    hotelAmenity: {
        type: String,
        required: true
    },
    amenityDescription: {
        type: String,
        required: true
    },
    amenityCost: {
        type: Number,
        required: true
    },
    amenityUse: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
} );

export default mongoose.model( 'HotelAmenities', HotelAmenitiesSchema );
