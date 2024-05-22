import Router from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';
import { deleteReview, postReview, putReview, getReview } from './review.controller.js';
import { hasUser } from '../helpers/role-verifiers.js';


const router = Router();

router.post(
    "/add",
    [
        validarJWT,
        hasUser,
        check("userId", "The user ID is obligatory").not().isEmpty(),
        check("hotelId", "The hotel ID is obligatory").not().isEmpty(),
        check("userReview", "The review is obligatory").not().isEmpty(),
        validarCampos
    ], postReview
);

router.put(
    "/put/:id",
    [
        validarJWT,
        hasUser,
        check("userId", "The user ID is obligatory").not().isEmpty(),
        check("hotelId", "The hotel ID is obligatory").not().isEmpty(),
        check("userReview", "The review is obligatory").not().isEmpty(),
        validarCampos
    ], putReview
);

router.delete(
    "/delete/:id",
    [
        validarJWT,
        hasUser
    ], deleteReview
)

router.get(
    "/get",
    [
        validarJWT
    ], getReview
)

export default router;