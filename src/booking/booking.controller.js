import Booking from './booking.model.js';
import Room from '../room/room.model.js';

// Create a new Booking
export const createBooking = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;
        const idUser = req.user.uid;
        //console.log(req.user.uid);
        //check role is USER_ROLE
        if (req.user.role !== 'USER_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }
        //check room is available
        const room = await Room.findById(resto.room);
        if (!room) {
            return res.status(404).json({
                msg: 'Room not found'
            });
        }

        const booking = new Booking({
            ...resto,
            user: idUser,
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

//Get bookings by hotel
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();

        // Check role is HOTEL_ADMIN_ROLE
        if (req.user.role !== 'HOTEL_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }

        // Check for bookings
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                msg: 'No bookings found'
            });
        }

        // Show bookings
        res.status(200).json(bookings);

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
        const bookings = await Booking.find({ user: idUser });

        // Check role is USER_ROLE
        if (req.user.role !== 'USER_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }

        // Check for bookings
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                msg: 'No bookings found'
            });
        }

        // Show bookings
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}