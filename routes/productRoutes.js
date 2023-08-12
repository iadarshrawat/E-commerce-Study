import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, productFiltersController, searchProductController, braintreeTokenController, brainTreePaymentController } from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// routes
router.post('/createProduct', requireSignIn, isAdmin, formidable(), createProductController)

// get products
router.get('/getProduct', getProductController )

// single products
router.get('/getSingleProduct/:slug', getSingleProductController )

// get photo
router.get('/productPhoto/:pid', productPhotoController)

// delete product
router.delete('/deleteProduct/:pid', requireSignIn, isAdmin, deleteProductController)

// update product
router.put('/updateProduct/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

// filter product
router.post('/productFilter', productFiltersController);


// search product
router.get('/search/:keyword', searchProductController);

// payment routes

// token
router.get('/braintree/token', braintreeTokenController)

// payment
router.post('/braintree/payment', requireSignIn, brainTreePaymentController)

export default router;