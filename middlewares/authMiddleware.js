import  jwt  from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(
            req.headers.authorization, process.env.JWT_SECRET
        )
        console.log(decode)
        req.user = decode;
        next();    
    } catch (error) {
            console.log(error)
    }    
}

// admin access
export const isAdmin = async (req, res , next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        console.log(user.role);
        if(user.role !== 1) {
            return res.status(404).send({
                success:false,
                message: "unAuthorized Access",
            })
        }
        else {
            next();
        }
    } catch (error) {
        res.status(401).send({
            success:false,
            message:'error in admin middleware',
        })
        console.log(error)
    }
}