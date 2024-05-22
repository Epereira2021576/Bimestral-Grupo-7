import Hotel from './hotel.model.js';


//role platform admin
export const postHotel = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;
        const hotel = new Hotel({
            _id, ...resto
        });
        await hotel.save();
        return res.status(201).json({
            msg: 'Hotel is created successfully',
            hotel
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to create hotel.',
            error: error.message
        });
    }
};

export const getHotel = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        if (!hotels || hotels.length === 0) {
            return res.status(404).json({
                msg: 'No hotel found'
            });
        }
        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to get hotels.',
            error: error.message
        });
    }
}


// role plataform admin
export const putHotel = async (req, res) => {
    try {
        const idRoom = req.params.id;
        const { _id, ...resto } = req.body;

        const hotel = await Hotel.findById(idRoom);

        if (!hotel) {
            return res.status(404).json({
                msg: 'Hotel not found'
            });
        }

        hotel.set({
            _id: idRoom,
            ...resto
        });
        const updatedHotel = await hotel.save();

        res.status(200).json({
            msg: 'Hotel updated successfully',
            hotel: updatedHotel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to update hotel.',
            error: error.message
        });
    }
}


//role platform admin
export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findByIdAndDelete(id);
        if (!hotel) {
            return res.status(404).json({
                msg: 'Hotel not found'
            });
        }
        res.status(200).json({
            msg: 'Hotel deleted successfully',
            hotel
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to delete hotel.',
            error: error.message
        });
    }
}
