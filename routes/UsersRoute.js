const router =require("express").Router();
const { getAllUsers, getUserProfileCtrl, updateUserCtrl, UsersCountCtrl, ActivateUser,desactivateUser} = require("../controllers/usersController");
const { VerifyTokenAdmin, verifyTokenOnlyUser, verifyTokenAuthorization } = require("../middlewares/verifyToken");
const  validateId = require("../middlewares/validateId");

// /api/users/profile
router.route("/profile").get(VerifyTokenAdmin ,getAllUsers);



// /api/users/profile/:id
router.route("/profile/:id")
    .get(validateId,getUserProfileCtrl)
    .put(validateId, verifyTokenOnlyUser, updateUserCtrl);
    

// /api/users/count
router.route("/count").get(VerifyTokenAdmin, UsersCountCtrl)


// /api/users/activate/:id
router.route("/activate/:id").put(validateId,verifyTokenAuthorization, ActivateUser);

// /api/users/desactivate/:id
router.route("/desactivate/:id").put(validateId,verifyTokenAuthorization,desactivateUser);



module.exports = router;