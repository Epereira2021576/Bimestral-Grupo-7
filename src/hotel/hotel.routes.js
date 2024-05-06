import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { postHotel, getHotel, updateHotel, deleteHotel } from './hotel.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post('/agregar', [
    validarJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('pricePerNight', 'Price per night is required').not().isEmpty(),
    check('amenities', 'Amenities is required').not().isEmpty(),
    check('owner', 'Owner is required').not().isEmpty(),
    validarCampos
], postHotel);

router.get('/', [
    validarJWT
], getHotel);

router.put('/:id', [
    validarJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('phone', 'Phone is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('pricePerNight', 'Price per night is required').not().isEmpty(),
    check('amenities', 'Amenities is required').not().isEmpty(),
    check('owner', 'Owner is required').not().isEmpty(),
    validarCampos
], updateHotel);

router.delete('/:id', [
    validarJWT
],deleteHotel);

export default router;