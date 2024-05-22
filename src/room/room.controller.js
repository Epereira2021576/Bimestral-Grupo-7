import { response, request } from "express";
import Room from './room.model.js'


export const getRooms = async (req, res) => {
    try {
        // get all rooms
        const rooms = await Room.find();
        // return the rooms
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
        //save data
        const savedRoom = await newRoom.save();
        //return the room
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

        // if the room is not found
        if (!room) {
            return res.status(404).json({ msg: 'Habitación no encontrada.' });
        }
        // update the room
        room.set({
            _id: roomId,
            ...rooms
        });

        // save the room
        const updatedRoom = await room.save();
        // return the updated room
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