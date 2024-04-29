import Hotel from './hotel.model';

//Post Hotel
export const postHotel = async (req, res) => {
    try {
        const { name, description, address, phone, starts, pricePerNight } = req.body;
        const newHotel = new Hotel({ name, description, address, phone, starts, pricePerNight });
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