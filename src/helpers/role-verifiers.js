import User from '../user/user.model.js'


export const hasPlataformAdmin = async (req, res, next) => {
    try {
        const userID = req.headers['authorized'];
        const checkUser = await User.findById(userID);
        if (!checkUser || checkUser.role !== 'PLATAFORM_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized'
            });
        }
        next(); // Proceed to the next middleware
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to verify user role.',
            error: error.message
        });
    }
};

export const hasHotelAdmin = async (req, res, next) => {
    try {
        const userID = req.headers['authorized'];
        const checkUser = await User.findById(userID);
        if (!checkUser || checkUser.role !== 'HOTEL_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized'
            });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to verify user role.',
            error: error.message
        });
    }
};

export const hasUser = async (req, res, next) => {
    try {
        const userID = req.headers['authorized'];
        const checkUser = await User.findById(userID);
        if (!checkUser || checkUser.role !== 'USER_ROLE') {
            return res.status(401).json({
                msg: 'Unauthorized'
            });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Failed to verify user role.',
            error: error.message
        });
    }
};
