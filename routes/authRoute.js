const router = require("express").Router();
const {singup, login, verifyUserAccount, sendEmailFunc, auhthorization}= require("../controllers/authController");




// /api/auth/register
router.post("/register", singup);


// /api/auth/sendemail
router.get("/sendemail", sendEmailFunc);


// /api/auth/login
router.post("/login", login);
 
// /api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccount);


// /api/auth/authorization
router.post("/access", auhthorization);




module.exports = router;