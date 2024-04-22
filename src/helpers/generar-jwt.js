import jwt from 'jsonwebtoken'

export const generarJWT = ( uid = '', email = '' ) => {
    return new Promise( ( resolve, reject ) => {
        const payload = { uid, email }
        jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h'
            },
            ( err, token ) => {
                err ? ( console.log( err ), reject( 'We had a problem generating the token' ) ) : resolve( token )
            }
        )
    } )
}