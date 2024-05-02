import jwt from 'jsonwebtoken';

export const generarJWT = (uid = '', email = '', role = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid, email, role }; // Aquí se incluye el rol en el payload
        jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h'
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('We had a problem generating the token');
                } else {
                    resolve(token);
                }
            }
        );
    });
};
