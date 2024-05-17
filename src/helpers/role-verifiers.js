import User from '../user/user.model.js'

export const hasPlataformAdmin = async ( req, res, next ) => {
    const userID = req.headers['authorized']
    const checkUser = await User.findById( userID )
    if ( !checkUser.role === 'PLATAFORM_ADMIN_ROLE' ) {
        return res.status( 401 ).json( {
            msg: 'Unauthorized'
        } );
    }
}

export const hasHotelAdmin = async ( req, res, next ) => {
    const userID = req.headers['authorized']
    const checkUser = await User.findById( userID )
    if ( !checkUser.role === 'HOTEL_ADMIN_ROLE' ) {
        return res.status( 401 ).json( {
            msg: 'Unauthorized'
        } );
    }
}

export const hasClient = async ( req, res, next ) => {
    const userID = req.headers['clientID']
    const checkUser = await User.findById( userID )
    if ( !checkUser.role === 'CLIENT_ROLE' ) {
        return res.status( 401 ).json( {
            msg: `Can't process this request without a client`
        } );
    }
}