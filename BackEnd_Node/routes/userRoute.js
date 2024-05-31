const {Router}=require("express")
const {userPost,userLogin, userGet,userUpdate,userDelete, getLogin, getSignUp, optGet, passwordReset} = require("../controllers/userController")
const passport = require("passport")
const isExists = require("../middlewares/Validate")
const userRoute=Router()

userRoute.get("/",userGet)

userRoute.post("/",userPost)
userRoute.patch("/:id",userUpdate)
userRoute.delete("/:id",userDelete)
userRoute.post("/login",userLogin)

// Using Passport js Login
userRoute.post("/passportLogin", passport.authenticate("local"), (req, res) => {
    res.send("logged in");
  });
  userRoute.get("/admin",isExists,(req,res)=>{
    res.send({user:req.user,msg:"Welcome"})
  })
userRoute.get("/login",getLogin)
userRoute.get("/signup",getSignUp)

// Password reser
userRoute.post("/otp",optGet)
userRoute.post("/resetPassword",passwordReset)


module.exports=userRoute