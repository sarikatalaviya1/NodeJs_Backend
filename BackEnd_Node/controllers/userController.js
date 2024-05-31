const User = require("../models/user")
const bcrypt = require("bcrypt");
const sendMail = require("../service/mail");
const Product = require("../models/product");

const userPost = async (req, res) => {

    try {

        const existingUser = await User.findOne({ where: { email: req.body.email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPassword
        let user = await User.create(req.body)


        //  Success
        res.status(201).send(user)
    } catch (error) {

        res.status(500).json({ error: 'Not Create User' })
    }
}

const userGet = async (req, res) => {
    try {
        let users = await User.findAll({include:Product})
        res.send(users)
    } catch (error) {
        res.send(error)
    }
}

const userUpdate = async (req, res) => {
    try {

        let { id } = req.params;
        let user = await User.findByPk(id)
        user = await user.update(req.body)
        res.status(201).send(user)


    } catch (error) {
        res.status(500).json({ error: 'Not Create User' })

    }
}

const userDelete = async (req, res) => {
    try {
        let { id } = req.params;
        let user = await User.findByPk(id)
        if (!user) {
            res.status(404).send("User Not Found")

        }
        user.destroy()
        res.send(user)
    } catch (error) {
        res.status(500).json({ error: 'Not Create User' })


    }
}

// Page

const getSignUp = (req, res) => {
    res.render("signup")
}

const getLogin = (req, res) => {
    res.render("login")
}

const userLogin = async (req, res) => {
    let { email } = req.body
    let user = await User.findOne({
        where: { email: email }
    }, { raw: true })
    console.log(user)
    if (!user) {
        res.status(404).json({ error: 'User Not Found' })
    }
    let isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
        return res.send("Password MisMatch")
    }
    res.send(user)
}


// reset Passwword
let map=new Map()

const optGet=async(req,res)=>{
    let {email}=req.body;
    let user=await User.findOne({where:{email}})
    if(!user){
        res.send("User Not Found")
    }

    let otp=Math.round(Math.random()*10000)
    map.set(email,otp)
    await sendMail(email,otp)
    res.send("Otp Sent Successfully")
}

const passwordReset=async(req,res)=>{
    let {email,password,otp}=req.body
        if(map.has(email)){
           let oldOtp= map.get(email)
           if(oldOtp===otp){
            let hashPassword = await bcrypt.hash(password, 10)

                let user=await User.findOne({where:{email}})
                user.update({password:hashPassword})
                res.send("Password Updated Successfully")
           }else{
            res.send("OTP Not Match")
           }
        }else{
            res.send("Email Not Found")
        }
}


module.exports = {
    userPost, userGet, userUpdate, userDelete,
    getSignUp,
    getLogin,
    userLogin,
    optGet,
    passwordReset
}