import Booking from './booking.model.js';
import Room from '../room/room.model.js';

// Create a new Booking
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, totalPrice } = req.body;
        const idUser = req.user.uid;
        console.log(req.user.uid);
        //check role is USER_ROLE
        if (req.user.role !== 'USER_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }
        //check room is available
        const roomAvailable = await Room.findOne({ _id: room, estado: true });
        if (!roomAvailable) {
            return res.status(400).json({
                msg: 'Room not available'
            });
        }
        
        const booking = new Booking({
            user: req.user.uid,
            room,
            checkInDate,
            checkOutDate,
            totalPrice
        });

        const savedBooking = await booking.save();
        res.json({
            message: 'Booking created successfully',
            savedBooking
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}

// Get all Bookings
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ estado: true });
        res.json(bookings);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}

// Get all Bookings by User
export const getAllBookingsByUser = async (req, res) => {
    try {
        const idUser = req.user.uid;
        const bookings = await Booking.find({ user: idUser, estado: true });
        res.json(bookings);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}