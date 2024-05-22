import Booking from './booking.model.js';
import Room from '../room/room.model.js';

// Create a new Booking
export const createBooking = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;

        // Obtener el ID del usuario de req.user
        const idUser = req.user.uid;

        // Verificar la disponibilidad de la habitación
        const room = await Room.findById(resto.room);
        if (!room) {
            return res.status(404).json({
                msg: 'Room not found'
            });
        }

        if (room.available === 'UNAVAILABLE') {
            return res.status(400).json({
                msg: 'Room is not available'
            });
        }

        // Actualizar la disponibilidad de la habitación
        const availability = await Room.findByIdAndUpdate(room._id, { available: 'UNAVAILABLE' }, { new: true });

        // Verificar y parsear las fechas
        const checkInDate = new Date(resto.checkInDate);
        const checkOutDate = new Date(resto.checkOutDate);

        if (isNaN(checkInDate) || isNaN(checkOutDate)) {
            return res.status(400).json({
                msg: 'Invalid date format'
            });
        }

        // Calcular la diferencia en días
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (isNaN(diffDays) || diffDays <= 0) {
            return res.status(400).json({
                msg: 'Invalid date range'
            });
        }

        // Verificar el precio por noche
        if (typeof room.pricePerNight !== 'number' || room.pricePerNight <= 0) {
            return res.status(400).json({
                msg: 'Invalid room price per night'
            });
        }

        // Calcular el precio total
        resto.totalPrice = room.pricePerNight * diffDays;

        console.log(`Total Price Calculation: ${room.pricePerNight} * ${diffDays} = ${resto.totalPrice}`);

        // Crear la reserva
        const booking = new Booking({
            ...resto,
            user: idUser,
            room: room._id,
            availability
        });

        // Guardar la reserva
        const savedBooking = await booking.save();

        // Responder con la reserva creada
        res.json({
            message: 'Booking created successfully',
            savedBooking
        });
    } catch (error) {
        // Manejar errores
        res.status(500).send({
            message: error.message
        });
    }
}

//Listar Reservaciones
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        // if there are no bookings
        if (!bookings) {
            return res.status(404).json({
                msg: 'No bookings found'
            });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}

//Buscar Reservacion por Usuario
export const getAllBookingsByUser = async (req, res) => {
    try {
        const idUser = req.user.uid;
        const bookings = await Booking.find({ user: idUser });
        //compruebe si la identificación del token en req.user es la misma identificación que idUser
        if (req.user.uid !== idUser) {
            return res.status(401).json({
                msg: 'Unauthorized'
            });
        }
        //check for bookings with true status
        if (!bookings) {
            return res.status(404).json({
                msg: 'No bookings found'
            });
        }
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}