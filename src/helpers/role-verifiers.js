import User from '../user/user.model.js';

// Middleware para verificar si el usuario tiene el rol de administrador de plataforma
export const hasPlataformAdmin = async (req, res, next) => {
    try {
        const userID = req.headers['authorized'];
        const checkUser = await User.findById(userID);
        
        // Verificar si el usuario existe y tiene el rol de administrador de plataforma
        if (!checkUser || checkUser.role !== 'PLATAFORM_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'No autorizado'
            });
        }
        
        // Si pasa la verificación, pasar al siguiente middleware
        next();
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al verificar el rol del usuario.',
            error: error.message
        });
    }
};

// Middleware para verificar si el usuario tiene el rol de administrador de hotel
export const hasHotelAdmin = async (req, res, next) => {
    try {
        const userID = req.headers['authorized'];
        const checkUser = await User.findById(userID);
        
        // Verificar si el usuario existe y tiene el rol de administrador de hotel
        if (!checkUser || checkUser.role !== 'HOTEL_ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'No autorizado'
            });
        }
        
        // Si pasa la verificación, pasar al siguiente middleware
        next();
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al verificar el rol del usuario.',
            error: error.message
        });
    }
};

// Middleware para verificar si el usuario tiene el rol de usuario regular
export const hasUser = async (req, res, next) => {
    try {
        const userID = req.headers['authorized'];
        const checkUser = await User.findById(userID);
        
        // Verificar si el usuario existe y tiene el rol de usuario regular
        if (!checkUser || checkUser.role !== 'USER_ROLE') {
            return res.status(401).json({
                msg: 'No autorizado'
            });
        }
        
        // Si pasa la verificación, pasar al siguiente middleware
        next();
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        console.error(error);
        res.status(500).json({
            msg: 'Error al verificar el rol del usuario.',
            error: error.message
        });
    }
};
