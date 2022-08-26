const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../config/generateToken')
const bcrypt=require('bcrypt')
const { exists } = require('../models/userModel')
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please Enter all the Fileds')
    }


    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400); 
        throw new Error('User Exists')

    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name, email, password:hashedPassword, pic
    })
console.log(user);
    
    if  (user) {

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)

        })
    }
    else {
        res.status(400);
        throw new Error('Error')
    }

})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })
    if (!user) {
      return  res.status(400).json({message:"user Does not exists"})
       
    }

    const isPasswordCorrect= await bcrypt.compare(password,user.password)
    if (!isPasswordCorrect) {
      return  res.status(400).json({ message: "Incorrect password" })

    }

    const token = generateToken(user._id)
    res.status(200).json({user,token})

})



const allUsers = asyncHandler(async (req, res) => {
    console.log('llll');
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {}
    
    const users = await (await User.find(keyword))
    res.send(users)
})
module.exports = { registerUser,authUser ,allUsers}