import HotelAmenities from "./hotelAmenities.model.js";

// Obtener todas las comodidades de hotel
export const getHotelAmenities = async (req, res) => {
    try {
        const amenities = await HotelAmenities.find();
        // Si no hay comodidades
        if (!amenities) {
            return res.status(404).json({
                msg: 'No se encontraron comodidades'
            });
        }
        // Retornar las comodidades
        res.status(200).json(amenities);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener las comodidades.',
            error: error.message
        });
    }
}

// Agregar una nueva comodidad de hotel
export const postHotelAmenitie = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;
        const hotelAmenity = new HotelAmenities({
            ...resto
        });
        await hotelAmenity.save();
        res.status(200).json({
            msg: "Comodidad de hotel agregada exitosamente",
            hotelAmenity
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error al agregar la comodidad de hotel",
            error: e.message
        });
    }
}

// Actualizar una comodidad de hotel existente
export const putHotelAmenities = async (req, res) => {
    const { id } = req.params;
    const { _id, ...resto } = req.body;
    try {
        const updatedAmenity = await HotelAmenities.findByIdAndUpdate(
            id,
            { ...resto },
            { new: true }
        );
        if (!updatedAmenity) {
            return res.status(404).json({
                msg: "Comodidad de hotel no encontrada"
            });
        }
        res.status(200).json({
            msg: "Comodidad de hotel actualizada exitosamente",
            updatedAmenity
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error al actualizar la comodidad de hotel",
            error: e.message
        });
    }
}

// Eliminar una comodidad de hotel
export const deleteHotelAmenities = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAmenity = await HotelAmenities.findByIdAndDelete(id);
        if (!deletedAmenity) {
            return res.status(404).json({
                msg: "Comodidad de hotel no encontrada"
            });
        }
        res.status(200).json({
            msg: "Comodidad de hotel eliminada exitosamente",
            deletedAmenity
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error al eliminar la comodidad de hotel.',
            error: e.message
        });
    }
}
