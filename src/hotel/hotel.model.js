import { Schema, model } from 'mongoose';

const HotelSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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
    img: {
        type: String,
    },
    amenities: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});


export default model('Hotel', HotelSchema);