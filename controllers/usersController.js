const asyncHandler = require("express-async-handler");
const {User, validateUpdateUser} = require("../models/User");
const bcrypt = require("bcryptjs");

/**---------------------------------------
 * @desc GET all profiles users
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 --------------------------------------- */
 module.exports.getAllUsers = asyncHandler(async (req, res) => {
   const users = await User.find().select("-password");
   res.status(200).json(users);
});

/**-----------------------------------------------
 * @desc    Get User Profile
 * @route   /api/users/profile/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
 module.exports.getUserProfileCtrl = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id).select("-password")
   if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
   res.status(200).json(user);
 })

/**-----------------------------------------------
 * @desc    Update User Profile
 * @route   /api/users/profile/:id
 * @method  PUT
 * @access  private (only user himself)
 ------------------------------------------------*/
 module.exports.updateUserCtrl = asyncHandler(async (req, res) => {
   const { error } = validateUpdateUser(req.body);
   if (error) {
     return res.status(400).json({ message: error.details[0].message });
   }
 
   if (req.body.password) {
     const salt = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password, salt);
   }
 
   const updatedUser = await User.findByIdAndUpdate(
     req.params.id,
     {
       $set: {
         fullname: req.body.fullname,
         password: req.body.password,
       },
     },
     { new: true }
   ).select("-password")
 
   res.status(200).json(updatedUser);
 });

/**-----------------------------------------------
 * @desc    Get Users Count
 * @route   /api/users/count
 * @method  GET
 * @access  private (only admin)
 ------------------------------------------------*/
 module.exports.UsersCountCtrl = asyncHandler(async (req, res) => {
   const allUsersCount = await User.countDocuments();
   const activeUsersCount = await User.countDocuments({active : true});
   const verifiedUsersCount = await User.countDocuments({isAccountVerified : true});
   const adminCount = await User.countDocuments({isAdmin : true});
   res.status(200).json({allUsers : allUsersCount, 
                          activeUsers : activeUsersCount,
                          verifiedUsers : verifiedUsersCount,
                          adminCount : adminCount
                          });
 });

 /**-----------------------------------------------
 * @desc    PUT users Activate
 * @route   /api/users/activate/:id
 * @method  PUT
 * @access  private (only admin)
 ------------------------------------------------*/
 module.exports.ActivateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log("user from node js " +  user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //Activation of user account
    user.active = true;
    await user.save();
    res.json({ message: 'The user account has been successfully activated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  } 
 });

 /**-----------------------------------------------
 * @desc    PUT users Desactivate
 * @route   /api/users/desactivate/:id
 * @method  PUT
 * @access  private (only admin)
 ------------------------------------------------*/
 exports.desactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      //Deactivation of user account
      user.active = false;
      await user.save();

      res.status(200).json({ message: 'User account successfully disabled' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};



  

 
