import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import  jwt  from "jsonwebtoken"


export const registerController = async (req, res)=>{
    try {

        const {name, email, password, phone, address, role} = req.body
        // validations
        if(!name) {
            return res.send({error:"name is required"})
        }
        if(!email) {
            return res.send({error:"email is required"})
        }
        if(!password) {
            return res.send({error:"password is required"})
        }
        if(!phone) {
            return res.send({error:"phone is required"})
        }
        if(!address) {
            return res.send({error:"address is required"})
        }

        // check existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(200).send({
                success:true,
                message:"Already Register please login",
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        const user = new userModel({name, email, phone, address, password:hashedPassword, role}).save()

        res.status(201).send({
            success:true,
            message:"user registered",
            user,
        })

    }  catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in Registration',
            error
        })
    } 
}


export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body

        // validations
        if(!email || !password) {
            return res.status(404).send({
                success:false,
                message:"invalid email or password",
            })
        }

        // check existing user
        const user = await userModel.findOne({email});
        if(user) {
            const match = await comparePassword(password, user.password);
            if(match) {
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                    expiresIn:'7d',
                })
                return res.status(200).send({
                    success:true,
                    message:"login Successfull",
                    user:{
                        name:user.name,
                        email:user.email,
                        phone:user.phone,
                        address:user.address,
                    },
                    token:token,
                })
            }
            return res.status(200).send({
                success:false,
                message:"invalid email or password",
            })
        }
        return res.status(404).send({
            success:false,
            message:"first need to register",
        })

    }  catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login',
            error
        })
    } 
}


// test controller
export const testController = (req, res)=>{
    res.send('test controller')
}