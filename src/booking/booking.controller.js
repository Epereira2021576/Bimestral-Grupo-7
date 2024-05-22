import Booking from './booking.model.js';
import Room from '../room/room.model.js';

// Crear una nueva reserva
export const createBooking = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;

        // Obtener el ID del usuario desde req.user
        const idUser = req.user.uid;

        // Verificar la disponibilidad de la habitación
        const room = await Room.findById(resto.room);
        if (!room) {
            return res.status(404).json({ msg: 'Habitación no encontrada' });
        }

        if (room.available === 'UNAVAILABLE') {
            return res.status(400).json({ msg: 'La habitación no está disponible' });
        }

        // Actualizar la disponibilidad de la habitación a 'UNAVAILABLE'
        const availability = await Room.findByIdAndUpdate(room._id, { available: 'UNAVAILABLE' }, { new: true });

        // Verificar y parsear las fechas de check-in y check-out
        const checkInDate = new Date(resto.checkInDate);
        const checkOutDate = new Date(resto.checkOutDate);

        if (isNaN(checkInDate) || isNaN(checkOutDate)) {
            return res.status(400).json({ msg: 'Formato de fecha inválido' });
        }

        // Calcular la diferencia en días entre las fechas
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (isNaN(diffDays) || diffDays <= 0) {
            return res.status(400).json({ msg: 'Rango de fechas inválido' });
        }

        // Verificar el precio por noche de la habitación
        if (typeof room.pricePerNight !== 'number' || room.pricePerNight <= 0) {
            return res.status(400).json({ msg: 'Precio por noche de la habitación inválido' });
        }

        // Calcular el precio total de la reserva
        resto.totalPrice = room.pricePerNight * diffDays;

        console.log(`Cálculo del Precio Total: ${room.pricePerNight} * ${diffDays} = ${resto.totalPrice}`);

        // Crear la reserva con los datos recibidos
        const booking = new Booking({
            ...resto,
            user: idUser,
            room: room._id,
            availability
        });

        // Guardar la reserva en la base de datos
        const savedBooking = await booking.save();

        // Responder con la reserva creada
        res.json({
            message: 'Reserva creada exitosamente',
            savedBooking
        });
    } catch (error) {
        // Manejar errores y enviar respuesta con error
        res.status(500).send({ message: error.message });
    }
}

// Listar todas las reservaciones
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        // Si no hay reservaciones
        if (!bookings) {
            return res.status(404).json({ msg: 'No se encontraron reservaciones' });
        }
        // Responder con las reservaciones encontradas
        res.status(200).json(bookings);
    } catch (error) {
        // Manejar errores y enviar respuesta con error
        res.status(500).send({ message: error.message });
    }
}

// Buscar reservaciones por usuario
export const getAllBookingsByUser = async (req, res) => {
    try {
        const idUser = req.user.uid;
        const bookings = await Booking.find({ user: idUser });

        // Verificar si el ID del token en req.user es el mismo que idUser
        if (req.user.uid !== idUser) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        // Verificar si hay reservaciones
        if (!bookings) {
            return res.status(404).json({ msg: 'No se encontraron reservaciones' });
        }

        // Responder con las reservaciones del usuario
        res.status(200).json(bookings);
    } catch (error) {
        // Manejar errores y enviar respuesta con error
        res.status(500).send({ message: error.message });
    }
}
