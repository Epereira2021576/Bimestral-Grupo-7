import { Router } from "express";
import { check } from "express-validator";

import { roomsGet, roomsPost, roomsPut } from "./room.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existeHabitacionById } from "../helpers/db-validators.js";


const router = Router();

router.get(
    '/list',
    roomsGet
);

router.post(
    '/agregar',
    [
        validarJWT,
        check('roomNumber', 'El numero de habitacion es obligatorio').not().isEmpty(),
        check('typeRoom', 'El tipo de habitación es obligatorio').not().isEmpty(),
        check('cleanlinessStatus', 'El estado de la habitacion es obligatorio').not().isEmpty(),
        check('priceForNight', 'El precio de la habitacion es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    roomsPost
)

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(existeHabitacionById),
        validarCampos,
    ],
    roomsPut
);

export default router;