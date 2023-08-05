import  jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    console.log('hello')
    try {
        const decode = jwt.verify(
            req.headers.authorization, process.env.JWT_SECRET
        )
        req.user = decode;
        console.log(req.user)
        next();     
    } catch (error) {
            console.log(error)
    }    
}

// admin access
export const isAdmin = async (req, res , next)=>{
    try {
            console.log(req.user._id)
            const user = await userModel.findById(req.user._id);
            if(user.role !== 1) {
            return res.status(401).send({
                success:false,
                message: "unAuthorized Access",
            });
        }
        else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}