import User from '../user/user.model.js';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';


// Register a new user
export const register = async ( req, res ) => {
    try {
        const { name, lastName, username, password, email } = req.body;
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync( password, salt );
        const encryptedAdminPass = bcrypt.hashSync( 'admin657', salt );

        // check if the user is trying to register with the Admin data
        if ( req.body.name == 'Admin' || req.body.lastName == 'Admin' || req.body.username == 'admin' || req.body.email == 'admin@admin.com' ) {
            return res.status( 400 ).json( {
                msg: 'You cannot register with this data'
            } );
        }

        //if the email includes @hotelmanager.com, assign the HOTEL_ADMIN_ROLE to the user
        if ( email.includes( '@hotelmanager.com' ) && req.headers['admin'] === 'PLATAFORM_ADMIN_ROLE' ) {
            const user = await User.create( {
                name,
                lastName,
                username,
                email,
                password: encryptedPassword,
                role: 'HOTEL_ADMIN_ROLE'
            } );
            //return the userDetails
            return res.status( 200 ).json( {
                msg: "user has been added to database",
                userDetails: {
                    name: user.name + " " + user.lastName,
                    username: user.username,
                    email: user.email,
                },
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
            await User.create( {
                name: 'Admin',
                lastName: 'Admin',
                username: 'admin',
                email: 'admin@admin.com',
                password: encryptedAdminPass,
                role: 'PLATAFORM_ADMIN_ROLE'
            } );
        }
        //return the userDetails
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

//login a user
export const login = async ( req, res ) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne( { email: email } );
        const validPass = bcrypt.compareSync( password, userFound.password );

        //if the user is found and the password is valid, generate a JWT
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
            return res.status( 400 ).send(
                'User not found'
            );
        }

        if ( !validPass ) {
            return res.status( 400 ).send(
                'Invalid password'
            );
        }

    } catch ( e ) {
        console.log( e );
        res.status( 500 ).json( {
            msg: 'Error when logging in'
        } );
    }
}

export const registerPlataformAdmins = async ( req, res ) => {
    try {
        const { name, lastName, username, password } = req.body;
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync( password, salt );

        //Create a user with the email being the combination of the name + lastName in uppercase + @admin.com
        const user = await User.create( {
            name,
            lastName,
            username,
            email: ( name + lastName ).toUpperCase() + '@admin.com',
            password: encryptedPassword,
            role: 'PLATAFORM_ADMIN_ROLE'
        } );

        return res.status( 200 ).json( {
            msg: "user has been added to database",
            userDetails: {
                name: user.name + " " + user.lastName,
                username: user.username,
                email: user.email,
            },
        } );
    } catch ( e ) {
        console.log( e );
        res.status( 500 ).json( {
            msg: 'Error when registering plataform admins'
        } );
    }
}