import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import { deleteHotelAmenities, getHotelAmenities, postHotelAmenitie, putHotelAmenities } from "./hotelAmenities.controller.js";
import { hasHotelAdmin } from '../helpers/role-verifiers.js'

const router = Router();

router.get(
    "/",
    [
    ], getHotelAmenities
)

router.post(
    "/add",
    [
        validarJWT,
        hasHotelAdmin,
        check( "nameAmenity", "The nameAmenity is obligatory" ).not().isEmpty(),
        check( "amenityDescription", "The description is oblogatory" ).not().isEmpty(),
        check( "amenityCost" ).isNumeric(),
        validarCampos
    ], postHotelAmenitie
);


router.put(
    "/put/:id",
    [
        validarJWT,
        hasHotelAdmin,
        check( "nameAmenity", "The name cant be empty" ).not().isEmpty(),
        check( "amenityDescription", "The description is oblogatory" ).not().isEmpty(),
        check( "amenityCost" ).isNumeric(),
        validarCampos
    ], putHotelAmenities
);

router.delete(
    "/delete/:id",
    [
        validarJWT,
        hasHotelAdmin,
        validarCampos
    ], deleteHotelAmenities
)


export default router;