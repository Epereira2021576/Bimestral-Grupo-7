import User from '../user/user.model.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';

export const register = async ( req, res ) => {
    try {
        const { name, lastName, username, password, email } = req.body;
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync( password, salt );
        const encryptedAdminPass = bcrypt.hashSync( 'admin657', salt );

        if ( req.body.name == 'Admin' || req.body.lastName == 'Admin' || req.body.username == 'admin' || req.body.email == 'admin@admin.com' ) {
            return res.status( 400 ).json( {
                msg: 'You cannot register with this data'
            } );
        }

        const user = await User.create( {
            name,
            lastName,
            username,
            email,
            password: encryptedPassword
        } );

        const findHotelAdmin = await User.findOne( { role: 'PLATAFORM_ADMIN_ROLE' } );
        if ( !findHotelAdmin ) {
            const admin = await User.create( {
                name: 'Admin',
                lastName: 'Admin',
                username: 'admin',
                email: 'admin@admin.com',
                password: encryptedAdminPass,
                role: 'PLATAFORM_ADMIN_ROLE'
            } );
        }

        return res.status( 200 ).json( {
            msg: "user has been added to database",
            userDetails: {
                name: user.name + " " + user.lastName,
                username: user.username,
                email: user.email,
            },
        } );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            msg: 'Error registering user'
        } );
    }

}

export const login = async ( req, res ) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne( { email: email } );
        const validPass = bcrypt.compareSync( password, userFound.password );

        if ( userFound && validPass ) {
            const token = await generarJWT( userFound.id, userFound.name, userFound.role );

            return res.status( 200 ).json( {
                msg: 'User logged in!',
                userDetails: {
                    name: userFound.name,
                    email: userFound.email,
                    role: userFound.role
                },
                token
            } );
        }

        if ( !userFound ) {
            return res.status( 400 ).json( {
                msg: 'User not found'
            } );
        }

        if ( !validPass ) {
            return res.status( 400 ).json( {
                msg: 'Invalid password'
            } );
        }

    } catch ( e ) {
        console.log( e );
        res.status( 500 ).json( {
            msg: 'Error when logging in'
        } );
    }
}