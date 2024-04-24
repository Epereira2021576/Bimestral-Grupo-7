import User from '../user/user.model.js'
import Room from '../room/room.model.js'

export const existeEmail = async (email = '') => {
    const existe = await User.findOne({ email })
    if (existe) {
        throw new Error(`El email ${email} ya fue registrado`)
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id)
    if (!existeUsuario) {
        throw new Error(` el ID: ${id} no existe`)
    }
}

export const existeHabitacionById = async (id = '') => {
    const existeHabitacion = await Room.findById(id);
    if (!existeHabitacion) {
        throw new Error(`Room with ID: ${id} don't exists`);
    }
}
