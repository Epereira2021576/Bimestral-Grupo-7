import User from '../user/user.model.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/generar-JWT.js';

export const register = async ( req, res ) => {
    try {
        const { name, email, password } = req.body;
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync( password, salt );

        const user = await User.create( {
            name,
            email,
            password: encryptedPassword
        } );

        return res.status( 200 ).json( {
            msg: "user has been added to database",
            userDetails: {
                name: user.name,
                email: user.email,
            },
        } );
    } catch ( error ) {
        console.log( error );
        res.status( 500 ).json( {
            msg: 'Error register user'
        } );
    }

}

export const login = async ( req, res ) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne( { email: email } );
        const validPass = bcrypt.compareSync( password, userFound.password );

        if ( userFound && validPass ) {
            const token = await generarJWT( userFound.id, userFound.name );

            return res.status( 200 ).json( {
                msg: 'User logged in',
                userDetails: {
                    name: userFound.name,
                    email: userFound.email,
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