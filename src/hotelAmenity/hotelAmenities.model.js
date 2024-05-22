import mongose, { Schema } from "mongoose";

const HotelAmenitiesSchema = mongose.Schema( {
    nameAmenity: {
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
} );

export default mongose.model( 'HotelAmenities', HotelAmenitiesSchema );
