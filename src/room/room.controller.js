import { response, request } from "express";
import Room from './room.model.js'


export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las habitaciones.',
            error: error.message
        });
    }
};

//role hotel admin
export const postRooms = async (req, res) => {
    try {
        const { _id, ...room } = req.body;

        const newRoom = new Room({
            _id,
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

//role hotel admin
export const putRooms = async (req, res) => {
    try {
        const roomId = req.params.id;
        const { _id, ...rooms } = req.body;

        let room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ msg: 'Habitación no encontrada.' });
        }

        room.set({
            _id: roomId,
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