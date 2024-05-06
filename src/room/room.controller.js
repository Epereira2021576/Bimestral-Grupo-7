import { response, request } from "express";
import Room from './room.model.js'

export const roomsGet = async (req, res) => {
    try {
        const rooms = await Room.find({ estado: true });

        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las habitaciones.',
            error: error.message
        });
    }
};

export const roomsPost = async (req, res) => {
    try {
        const { _id, estado, ...room } = req.body;

        if (req.user.role !== 'HOTEL_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }

        const newRoom = new Room({
            _id,
            estado,
            ...room
        });

        const savedRoom = await newRoom.save();

        res.json({
            message: 'Room created',
            savedRoom
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al agregar la habitación.',
            error: error.message
        });
    }
};

export const roomsPut = async (req, res) => {
    try {
        const roomId = req.params.id;
        const { _id, estado, ...rooms } = req.body;

        let room = await Room.findById(roomId);

        if (req.user.role !== 'HOTEL_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }

        if (!room) {
            return res.status(404).json({ msg: 'Habitación no encontrada.' });
        }

        room.set({
            _id: roomId,
            estado: estado,
            ...rooms
        });
        

        const updatedRoom = await room.save();

        res.json({
            message: 'Room update',
            updatedRoom
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la habitación.',
            error: error.message
        });
    }
};