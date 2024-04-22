import { Router } from 'express';
import { check } from 'express-validator';
import { register, login } from './auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeEmail } from '../helpers/db-validators.js';

const router = Router();

router.post( '/register', [
    check( 'name', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'email', 'El email es obligatorio' ).isEmail(),
    check( 'email' ).custom( existeEmail ),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password debe de ser mayor a 6 caracteres' ).isLength( { min: 6, } ),
    validarCampos
], register );

router.post( '/login',
    [
        check( 'email', 'El email es obligatorio' ).isEmail(),
        check( 'password', 'El password es obligatorio' ).not().isEmpty(),
        validarCampos
    ], login
);

export default router;