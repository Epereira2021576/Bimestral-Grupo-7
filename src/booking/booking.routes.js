import { Router } from 'express';
import { createBooking, getAllBookings, getAllBookingsByUser } from './booking.controller.js';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { hasUser } from '../helpers/role-verifiers.js'

const router = Router();

router.post('/add', [
    validarJWT,
    hasUser,
    check('room', 'Room is required').not().isEmpty(),
    check('checkInDate', 'CheckInDate is required').not().isEmpty(),
    check('checkOutDate', 'CheckOutDate is required').not().isEmpty(),
    check('totalPrice', 'TotalPrice is required').not().isEmpty(),
    validarCampos
], createBooking);

router.get('/', getAllBookings);

router.get('/:id', validarJWT, getAllBookingsByUser);

export default router;