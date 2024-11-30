import {User} from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const register = async(req, res) =>{

    try{
        const {fullname , email , phoneNumber, password , role} = req.body;
        if(fullname || email ||  phoneNumber || password || role){
            return res.status(400).json({
                message:"Some values are missing",
                success: false
            })
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User alrady exist with this mail",
                success: false
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname , 
            email ,
            phoneNumber, 
             password: hashPassword,
            role
        })

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });

    }
    catch(error){
        console.log(error)
    }
}

export const login = async(req, res) =>{
try{

    const {email,password ,role} = req.body;
    if( email ||   password || role){
        return res.status(400).json({
            message:"Some values are missing",
            success: false
        })
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"Incorrect Email or password",
            success: false
        })
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword){
        return res.status(400).json({
            message:"Incorrect  Password",
            success: false
        })
    }
    // check role correct or not

    if(role != user.role){
        return res.status(400).json({
            message:"Incorrect  Role",
            success: false
        })
    }

    const tokenData ={
        userId : user._id
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'})

    user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile
    }

    return res.status(200).cookie("token", token ,{maxAge: 1*24*60*60*1000, httpOnly:true ,sameSite:'strict'}).json({
        message:"Welcome back user",
        user,
        success: true
    })
}
catch(error){
    console.log(error);
}
   
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) =>{
    try{
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const skillsArray = skills.split(",")
        const userId = req.id;
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message:"user not found",
                success: false
            })

        }

                // updating data
                if(fullname) user.fullname = fullname
                if(email) user.email = email
                if(phoneNumber)  user.phoneNumber = phoneNumber
                if(bio) user.profile.bio = bio
                if(skills) user.profile.skills = skillsArray
        
        
        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })

        
    }
    catch (error) {
        console.log(error);
    }
}