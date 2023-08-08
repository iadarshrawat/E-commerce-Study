import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController, updateProductController, productFiltersController } from "../controllers/productController.js";
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

export default router;