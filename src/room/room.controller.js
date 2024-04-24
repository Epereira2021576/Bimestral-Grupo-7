import { response, request } from "express";
import Room from './room.model.js'

export const roomsGet = async (req, res) => {
    try {
        // Utilizar populate para obtener la información de la categoría
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
        const { roomNumber, typeRoom, cleanlinessStatus, priceForNight } = req.body;

        const newRoom = new Room({
            roomNumber,
            typeRoom,
            cleanlinessStatus,
            priceForNight
        });

        const savedRoom = await newRoom.save();

        res.status(201).json(savedRoom);
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
        const { roomNumber, typeRoom, cleanlinessStatus, priceForNight } = req.body;

        let room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ msg: 'Habitación no encontrada.' });
        }

        room.roomNumber = roomNumber;
        room.typeRoom = typeRoom;
        room.cleanlinessStatus = cleanlinessStatus;
        room.priceForNight = priceForNight;

        const updatedRoom = await room.save();

        res.status(200).json(updatedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar la habitación.',
            error: error.message
        });
    }
};