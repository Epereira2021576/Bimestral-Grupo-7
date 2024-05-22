import { Router } from "express";
import { check } from "express-validator";
import { postEvent, getEvents, putEvents, deleteEvents } from "./event.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.post(
    '/event/add',
    [
        validarJWT,
        check( 'eventTitle', 'Event title is required' ).not().isEmpty(),
        check( 'eventDescription', 'Event description is required' ).not().isEmpty(),
        check( 'eventDate', 'Event date is required' ).not().isEmpty(),
        check( 'location', 'Location is required' ).not().isEmpty(),
    ], postEvent
);

router.get(
    '/events',
    getEvents
);

router.put(
    '/event/put/:id',
    [
        validarJWT,
        check( 'eventTitle', 'Event title is required' ).not().isEmpty(),
        check( 'eventDescription', 'Event description is required' ).not().isEmpty(),
        check( 'eventDate', 'Event date is required' ).not().isEmpty(),
        check( 'location', 'Location is required' ).not().isEmpty(),
        check( 'additionalInfo', 'Additional info is required' ).not().isEmpty(),
        check( 'eventServices', 'Event services is required' ).not().isEmpty(),
    ], putEvents
);
router.delete(
    '/event/delete/:id',
    validarJWT,
    deleteEvents
);

export default router;