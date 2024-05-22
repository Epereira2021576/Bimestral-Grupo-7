import { response, request } from "express";
import Room from './room.model.js'

// Obtener todas las habitaciones
export const getRooms = async (req, res) => {
    try {
        // Buscar y obtener todas las habitaciones de la base de datos
        const rooms = await Room.find();
        
        // Responder con todas las habitaciones encontradas
        res.status(200).json(rooms);
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las habitaciones.',
            error: error.message
        });
    }
};

// Agregar una nueva habitación
export const postRooms = async (req, res) => {
    try {
        // Extraer el ID y el resto de los datos de la habitación de la solicitud
        const { _id, ...room } = req.body;

        // Crear una nueva instancia de Room con los datos de la solicitud
        const newRoom = new Room({
            _id,
            ...room
        });
        
        // Guardar la nueva habitación en la base de datos
        const savedRoom = await newRoom.save();
        
        // Responder con un mensaje de éxito y la habitación creada
        res.json({
            message: 'Habitación creada',
            savedRoom
        });

    } catch (error) {
        // Manejar cualquier error que pueda ocurrir y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al agregar la habitación.',
            error: error.message
        });
    }
};

// Actualizar una habitación existente
export const putRooms = async (req, res) => {
    try {
        const roomId = req.params.id;
        const { _id, ...rooms } = req.body;

        // Buscar la habitación por ID
        let room = await Room.findById(roomId);

        // Verificar si la habitación fue encontrada
        if (!room) {
            return res.status(404).json({ msg: 'Habitación no encontrada.' });
        }
        
        // Actualizar los datos de la habitación
        room.set({
            _id: roomId,
            ...rooms
        });

        // Guardar la habitación actualizada en la base de datos
        const updatedRoom = await room.save();
        
        // Responder con un mensaje de éxito y la habitación actualizada
        res.json({
            message: 'Habitación actualizada',
            updatedRoom
        });
    } catch (error) {
        // Manejar cualquier error que pueda ocurrir y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la habitación.',
            error: error.message
        });
    }
};
