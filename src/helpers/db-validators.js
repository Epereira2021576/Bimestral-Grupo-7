import User from '../user/user.model.js';
import Room from '../room/room.model.js';

// Verificar si ya existe un usuario con el mismo email
export const existeEmail = async (email = '') => {
    const existe = await User.findOne({ email });
    if (existe) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
};

// Verificar si existe un usuario con el ID especificado
export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con ID: ${id} no existe`);
    }
};

// Verificar si existe una habitación con el ID especificado
export const existeHabitacionById = async (id = '') => {
    const existeHabitacion = await Room.findById(id);
    if (!existeHabitacion) {
        throw new Error(`La habitación con ID: ${id} no existe`);
    }
};
