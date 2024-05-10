import Hotel from './hotel.model.js';

export const postHotel = async (req, res) => {
    try {
        const { _id, status, ...resto } = req.body;

        //check if role is PLATAFORM_ADMIN_ROLE
        if (req.user.role !== 'PLATAFORM_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }

        const hotel = new Hotel({
            _id, status, ...resto
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
        const hotel = await Hotel.find({ status: true });
        // check for hotels with true status
        if (!hotel) {
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
        const { _id, status, ...resto } = req.body;
        const hotel = await Hotel.findById(idRoom);

        console.log(req.user.role);

        //check if role is PLATAFORM_ADMIN_ROLE
        if (req.user.role !== 'PLATAFORM_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized',
                role: req.user.role
            });
        }
        // check if hotel exists
        if (!hotel) {
            return res.status(404).json({
                msg: 'Hotel not found'
            });
        }
        //check if status is true
        if (!hotel.status) {
            return res.status(404).json({
                msg: 'Hotel is not available'
            });
        }
        // update hotel
       hotel.set({
            _id: idRoom,
            status: status,
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
        const hotel = await Hotel.findByIdAndUpdate(id, { status: false });

        //check if role is PLATAFORM_ADMIN_ROLE
        if (req.user.role !== 'PLATAFORM_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized'
            });
        }
        // check if hotel exists
        if (!hotel) {
            return res.status(404).json({
                msg: 'Hotel not found'
            });
        }
        //check if status is true
        if (!hotel.status) {
            return res.status(404).json({
                msg: 'Hotel is not available'
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

