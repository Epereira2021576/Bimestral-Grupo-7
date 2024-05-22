import { Router } from 'express';
import { check } from 'express-validator';
import { register, login, registerPlataformAdmins } from './auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { existeEmail } from '../helpers/db-validators.js';
import { hasPlataformAdmin } from '../helpers/role-verifiers.js';

const router = Router();

router.post( '/register', [
    check( 'email', 'Este no es un correo válido' ).isEmail(),
    check( 'email' ).custom( existeEmail ),
    check( 'name', 'El name es obligatorio' ).not().isEmpty(),
    check( 'lastName', 'El lastname es obligatorio' ).not().isEmpty(),
    check( 'username', 'El username es obligatorio' ).not().isEmpty(),
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

router.post( '/register-plataform-admins', [
    hasPlataformAdmin,
    check( 'email', 'Este no es un correo válido' ).isEmail(),
    check( 'email' ).custom( existeEmail ),
    check( 'name', 'El name es obligatorio' ).not().isEmpty(),
    check( 'lastName', 'El lastname es obligatorio' ).not().isEmpty(),
    check( 'username', 'El username es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password debe de ser mayor a 6 caracteres' ).isLength( { min: 6, } ),
    validarCampos
], registerPlataformAdmins );

export default router;