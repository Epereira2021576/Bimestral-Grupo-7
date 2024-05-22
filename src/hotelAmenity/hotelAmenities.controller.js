import HotelAmenities from "./hotelAmenities.model.js";


//Listar Comodidades
export const getHotelAmenities = async (req, res) => {
    try {
        const amenities = await HotelAmenities.find();
        if (!amenities) {
            return res.status(404).json({
                msg: 'No amenities found'
            });
        }
        res.status(200).json(amenities);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to get amenities.',
            error: error.message
        });
    }
}

//Agregar Comodidad
export const postHotelAmenitie = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;
        const hotelAmenity = new HotelAmenities({
            ...resto
        });
        await hotelAmenity.save();
        res.status(200).json({
            msg: "Hotel amenity added successfully",
            hotelAmenity
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error adding hotel amenity",
            error: e.message
        });
    }
}

//Editar Comodidad
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
                msg: "HotelAmenity not found"
            });
        }
        res.status(200).json({
            msg: "HotelAmenity updated successfully",
            updatedAmenity
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: "Error updating HotelAmenity",
            error: e.message
        });
    }
}

//Eliminar Comodidad
export const deleteHotelAmenities = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAmenity = await HotelAmenities.findByIdAndDelete(id);
        if (!deletedAmenity) {
            return res.status(404).json({
                msg: "HotelAmenity not found"
            });
        }
        res.status(200).json({
            msg: "HotelAmenity successfully deleted",
            deletedAmenity
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Failed to delete HotelAmenity.',
            error: e.message
        });
    }
}

