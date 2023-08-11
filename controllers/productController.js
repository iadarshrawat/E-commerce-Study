import slugify from "slugify";
import productModel from "../models/productModel.js"
import fs from 'fs'



export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is require" })
            case !description:
                return res.status(500).send({ error: "description is require" })
            case !price:
                return res.status(500).send({ error: "price is require" })
            case !category:
                return res.status(500).send({ error: "category is require" })
            case !quantity:
                return res.status(500).send({ error: "quantity is require" })
            case !photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is require and less than 1mb" })
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message: "product created successfully",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in creating product"
        })
    }
}


export const getProductController = async (req, res)=>{
    try {
        const products = await productModel.find({}).populate('category').select('-photo').limit(12).sort({createdAt:-1})
        res.status(200).send({
            countTotal: products.length,
            success:true,
            message:"all Products",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting products',
            error:error.message,
        })
    }
}


export const getSingleProductController = async (req, res)=>{
    try {
        const {slug} = req.params;
        const product = await productModel.findOne({slug}).select('-photo').populate('category')
        res.status(200).send({
            success:true,
            message:"single Product fetched",
            product
        })
    } catch (error) {
        console.log(error)
        req.status(500).send({
            success:false,
            message:'error while getting single products',
            error:error.message,
        })
    }
}

export const productPhotoController = async (req, res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set('content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while getting photo',
            error,
        })
    }
}


export const deleteProductController = async (req, res) => {
    try {
        const {pid} = req.params
        await productModel.findByIdAndDelete(pid).select('-photo')
        res.status(200).send({
            success:true,
            message:'Product Deleted Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while deleting product',
            error,
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is require" })
            case !description:
                return res.status(500).send({ error: "description is require" })
            case !price:
                return res.status(500).send({ error: "price is require" })
            case !category:
                return res.status(500).send({ error: "category is require" })
            case !quantity:
                return res.status(500).send({ error: "quantity is require" })
            case !photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo is require and less than 1mb" })
        }

        const {pid} = req.params;
        const products = await productModel.findByIdAndUpdate(pid,{...req.fields, slug:slugify(name)})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success:true,
            message: "product updated successfully",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in updating product"
        })
    }
}

// filters
export const productFiltersController = async (req, res)=>{
    try {
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked
        if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success:true,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error while filtering products",
            error
        })
    }
}


// search product
export const searchProductController = async (req, res)=>{
    try {
        console.log("connting search with backend0")
        const {keyword} = req.params;
        const result = await productModel.find({
            $or:[
                {name:{$regex: keyword, $options:"i"}},
                {description:{$regex: keyword, $options:"i"}}
            ]
        }).select("-photo")
        res.json(result)

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"error in search proudct API",
            error
        })
    }
}