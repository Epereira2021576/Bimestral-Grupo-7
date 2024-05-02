import Hotel from './hotel.model';

//Post Hotel
export const postHotel = async (req, res) => {
    try {
        const { name, description, address, phone, category, pricePerNight, amenities, owner } = req.body;
        const newHotel = new Hotel({
            name, description, address, phone, category, pricePerNight, amenities, owner
        });
        //check if role is HOTEL_ADMIN_ROLE
        if (req.user.role !== 'HOTEL_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized'
            });
        }
        await newHotel.save();

        return res.status(201).json({
            msg: 'Hotel is created successfully',
            newHotel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to create hotel.',
            error: error.message
        });
    }
}

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
export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, address, phone, category, pricePerNight, amenities, owner } = req.body;
        const hotel = await Hotel.findById(id);
        //check if role is HOTEL_ADMIN_ROLE
        if (req.user.role !== 'HOTEL_ADMIN_ROLE') {
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
        // update hotel
        const updatedHotel = await Hotel.findByIdAndUpdate(id, {
            name, description, address, phone, category, pricePerNight, amenities, owner
        }, { new: true });
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
        const hotel = await Hotel.findById(id);
        //check if role is HOTEL_ADMIN_ROLE
        if (req.user.role !== 'HOTEL_ADMIN_ROLE') {
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
        // delete hotel
        await Hotel.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'Hotel deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to delete hotel.',
            error: error.message
        });
    }
}

