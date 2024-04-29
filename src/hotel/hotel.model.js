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
    stars: {
        type: Number,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Hotel', HotelSchema);