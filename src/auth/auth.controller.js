import User from '../user/user.model.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/generar-JWT.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(password, salt);

        const user = await User.create({
            name,
            email,
            password: encryptedPassword
        });

        return res.status(200).json({
            msg: "user has been added to database",
            userDetails: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error register user'
        });
    }

}