import { Router } from "express";
import { check } from "express-validator";
import { postEvent, getEvents, putEvent, deleteEvent } from "./event.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js"
import { hasHotelAdmin } from '../helpers/role-verifiers.js'


const router = Router();

router.post(
    '/add',
    [
        validarJWT,
        hasHotelAdmin,
        check( 'eventTitle', 'Event title is required' ).not().isEmpty(),
        check( 'eventDescription', 'Event description is required' ).not().isEmpty(),
        check( 'eventDate', 'Event date is required' ).not().isEmpty(),
        check( 'checkIn', 'checkIn is required' ).not().isEmpty(),
        check( 'checkOut', 'checkOut is required' ).not().isEmpty(),
        check( 'price', 'price is required' ).not().isEmpty(),
        validarCampos
    ], postEvent
);

router.get(
    '/',
    getEvents
);

router.put(
    '/put/:id',
    [
        validarJWT,
        hasHotelAdmin,
        check( 'eventTitle', 'Event title is required' ).not().isEmpty(),
        check( 'eventDescription', 'Event description is required' ).not().isEmpty(),
        check( 'eventDate', 'Event date is required' ).not().isEmpty(),
        check( 'checkIn', 'checkIn is required' ).not().isEmpty(),
        check( 'checkOut', 'checkOut is required' ).not().isEmpty(),
        check( 'price', 'price is required' ).not().isEmpty(),
        validarCampos
    ], putEvent
);
router.delete(
    '/delete/:id',
    [
        validarJWT,
        hasHotelAdmin,
        validarCampos,
    ], deleteEvent
);

export default router;