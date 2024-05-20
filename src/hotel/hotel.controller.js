import Hotel from './hotel.model.js';

export const postHotel = async (req, res) => {
    try {
        const { _id, ...resto } = req.body;

        // Check if role is PLATAFORM_ADMIN_ROLE
        if (req.user.role !== 'PLATAFORM_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }

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


//Get Hotel by status true
export const getHotel = async (req, res) => {
    try {
        const hotel = await Hotel.find();

        // Check for hotels
        if (!hotel || hotel.length === 0) {
            return res.status(404).json({
                msg: 'No hotel found'
            });
        }

        res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to get hotel.',
            error: error.message
        });
    }
}

//Update Hotel by id
export const putHotel = async (req, res) => {
    try {
        const idRoom = req.params.id;
        const { _id, ...resto } = req.body;
        const hotel = await Hotel.findById(idRoom);

        console.log(req.user.role);

        // Check if role is PLATAFORM_ADMIN_ROLE
        if (req.user.role !== 'PLATAFORM_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }

        // Check if hotel exists
        if (!hotel) {
            return res.status(404).json({
                msg: 'Hotel not found'
            });
        }

        // Update hotel
        hotel.set({
            _id: idRoom,
            ...resto
        });
        const updatedHotel = await hotel.save();

        res.status(200).json({
            msg: 'Hotel updated successfully',
            hotel: updatedHotel
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to update hotel.',
            error: error.message
        });
    }
}

//Delete Hotel by id
export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if role is PLATAFORM_ADMIN_ROLE
        if (req.user.role !== 'PLATAFORM_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized'
            });
        }

        const hotel = await Hotel.findById(id);

        // Check if hotel exists
        if (!hotel) {
            return res.status(404).json({
                msg: 'Hotel not found'
            });
        }

        // Delete hotel
        await Hotel.findByIdAndDelete(id);

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

