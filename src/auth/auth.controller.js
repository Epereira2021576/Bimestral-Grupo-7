import User from '../user/user.model.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';

// Registrar un nuevo usuario
export const register = async (req, res) => {
    try {
        const { name, lastName, username, password, email } = req.body;
        
        // Generar una sal para encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const encryptedAdminPass = bcrypt.hashSync('admin657', salt); // Contraseña para el administrador por defecto

        // Verificar si el usuario intenta registrarse con datos de Admin
        if (name === 'Admin' || lastName === 'Admin' || username === 'admin' || email === 'admin@admin.com') {
            return res.status(400).json({ msg: 'No puedes registrarte con estos datos' });
        }

        // Asignar rol HOTEL_ADMIN_ROLE si el email pertenece a hotelmanager.com
        if (email.includes('@hotelmanager.com') && req.headers['admin'] === 'PLATAFORM_ADMIN_ROLE') {
            const user = await User.create({
                name, lastName, username, email, password: encryptedPassword, role: 'HOTEL_ADMIN_ROLE'
            });
            return res.status(200).json({
                msg: "Usuario añadido a la base de datos",
                userDetails: {
                    name: `${user.name} ${user.lastName}`,
                    username: user.username,
                    email: user.email,
                }
            });
        }

        // Crear un usuario normal
        const user = await User.create({ name, lastName, username, email, password: encryptedPassword });

        // Crear administrador por defecto si no existe
        const findHotelAdmin = await User.findOne({ role: 'PLATAFORM_ADMIN_ROLE' });
        if (!findHotelAdmin) {
            await User.create({
                name: 'Admin',
                lastName: 'Admin',
                username: 'admin',
                email: 'admin@admin.com',
                password: encryptedAdminPass,
                role: 'PLATAFORM_ADMIN_ROLE'
            });
        }

        return res.status(200).json({
            msg: "Usuario añadido a la base de datos",
            userDetails: {
                name: `${user.name} ${user.lastName}`,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al registrar el usuario' });
    }
}

// Iniciar sesión de un usuario
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar usuario por email
        const userFound = await User.findOne({ email });
        if (!userFound) {
            return res.status(400).send('Usuario no encontrado');
        }

        // Verificar la contraseña
        const validPass = bcrypt.compareSync(password, userFound.password);
        if (!validPass) {
            return res.status(400).send('Contraseña inválida');
        }

        // Generar JWT si las credenciales son correctas
        const token = await generarJWT(userFound.id, userFound.name, userFound.role);
        return res.status(200).json({
            msg: 'Usuario autenticado',
            userDetails: {
                name: userFound.name,
                email: userFound.email,
                role: userFound.role
            },
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al iniciar sesión' });
    }
}

// Registrar administradores de la plataforma
export const registerPlataformAdmins = async (req, res) => {
    try {
        const { name, lastName, username, password } = req.body;

        // Generar una sal y encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(password, salt);

        // Crear un usuario con el correo formado por nombre + apellido en mayúsculas + @admin.com
        const user = await User.create({
            name,
            lastName,
            username,
            email: `${name}${lastName}`.toUpperCase() + '@admin.com',
            password: encryptedPassword,
            role: 'PLATAFORM_ADMIN_ROLE'
        });

        return res.status(200).json({
            msg: "Administrador añadido a la base de datos",
            userDetails: {
                name: `${user.name} ${user.lastName}`,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error al registrar administradores de la plataforma' });
    }
}
