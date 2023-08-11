import express from "express";
import {forgotPasswordController, registerController, updateProfileController} from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";
import { testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router Object
const router = express.Router()

// routing
// REGISTER || METHOD POST
router.post('/register', registerController)

// LOGIN || METHOD POST
router.post('/login', loginController)

// Forgot Password || Post
router.post('/forgotPassword', forgotPasswordController)

// TEST ROUTE
router.get('/test', requireSignIn, isAdmin, testController)

// protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
})

// Admin route route auth
router.get('/adminAuth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})


router.put('/profile', requireSignIn, updateProfileController)


export default router;