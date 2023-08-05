import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { allCategoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

// create category
router.post('/createCategory', requireSignIn, isAdmin, createCategoryController)

// update category
router.put('/updateCategory/:id', requireSignIn, isAdmin, updateCategoryController)

// getAll category
router.get('/allCategory', allCategoryController)

// get-single category
router.get('/singleCategory/:slug', singleCategoryController)

// get-single category
router.delete('/deleteCategory/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;