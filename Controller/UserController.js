const catchAsyncErrors = require("../midleware/catchAsyncErrors")
const Users = require("../Models/UsersModel")
const Errorhandler = require("../Utils/Errorhandler")
const sendToken = require("../Utils/jwtToken")


exports.Getallusers=(req,res,next)=>{
res.status(200).json({message:"user Route working"})
}
//Create User
exports.createuser=catchAsyncErrors(async(req,res,next)=>{
  


    const { name, email, password } = req.body;
    const doesEmailExist = await Users.findOne({ email });
    if (doesEmailExist) {
       throw new Errorhandler("Email already exists"); 
    }
  const user = await Users.create({
    name,
    email,
    password,
    avatar: {
      public_id: "myCloud",
      url: "myCloud",
    },
  });
 
  sendToken(user,200,res)

})
 


// loginuser
 exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
  
    // checking if user has given password and email both
  
    if (!email || !password) {
      return next(new Errorhandler("Please Enter Email & Password", 400));
    }
  
    const user = await Users.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new Errorhandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new Errorhandler("Invalid email or password", 401));
    }
    sendToken(user,200,res)

  });
//logout
  exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });
