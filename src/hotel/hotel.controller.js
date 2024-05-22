import Hotel from './hotel.model.js';

// Crear un nuevo hotel
export const postHotel = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;
        const hotel = new Hotel({
            _id, ...resto
        });
        // Guardar los datos
        await hotel.save();
        // Retornar el hotel
        return res.status(201).json({
            msg: 'Hotel creado exitosamente',
            hotel
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al crear el hotel.',
            error: error.message
        });
    }
};

// Obtener todos los hoteles
export const getHotel = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        // Si no hay hoteles
        if (!hotels || hotels.length === 0) {
            return res.status(404).json({
                msg: 'No se encontraron hoteles'
            });
        }
        // Retornar los hoteles
        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener los hoteles.',
            error: error.message
        });
    }
}

// Actualizar un hotel existente
export const putHotel = async (req, res) => {
    try {
        const idRoom = req.params.id;
        const { _id, ...resto } = req.body;

        const hotel = await Hotel.findById(idRoom);
        // Si el hotel no se encuentra
        if (!hotel) {
            return res.status(404).json({
                msg: 'Hotel no encontrado'
            });
        }
        // Actualizar el hotel
        hotel.set({
            _id: idRoom,
            ...resto
        });
        const updatedHotel = await hotel.save();
        // Retornar el hotel actualizado
        res.status(200).json({
            msg: 'Hotel actualizado exitosamente',
            hotel: updatedHotel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el hotel.',
            error: error.message
        });
    }
}

// Eliminar un hotel
export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findByIdAndDelete(id);

        // Si el hotel no se encuentra
        if (!hotel) {
            return res.status(404).json({
                msg: 'Hotel no encontrado'
            });
        }
        // Retornar el hotel eliminado
        res.status(200).json({
            msg: 'Hotel eliminado exitosamente',
            hotel
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el hotel.',
            error: error.message
        });
    }
}
