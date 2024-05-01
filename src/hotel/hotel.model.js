import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    amenities: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Hotel', HotelSchema);