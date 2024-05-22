import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { postHotel, getHotel, putHotel, deleteHotel } from './hotel.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { hasPlataformAdmin } from '../helpers/role-verifiers.js'

const router = Router();

router.post('/add', [
    validarJWT,
    hasPlataformAdmin,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('amenities', 'Amenities is required').not().isEmpty(),
    check('owner', 'Owner is required').not().isEmpty(),
    validarCampos
], postHotel);

router.get('/', [
], getHotel);

router.put('/edit/:id', [
    validarJWT,
    hasPlataformAdmin,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('amenities', 'Amenities is required').not().isEmpty(),
    check('owner', 'Owner is required').not().isEmpty(),
    validarCampos
], putHotel);

router.delete('/delete/:id', [
    validarJWT,
    hasPlataformAdmin
], deleteHotel);

export default router;