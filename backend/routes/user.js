const userController = require("../controllers/userController");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndUserAuthorization } = require("../controllers/verifyToken");

const router = require("express").Router();
//GET ALL USERS
router.get("/", verifyToken, (req, res) => {
    userController.getAllUsers(req, res);
});

//DELETE USER
router.delete("/:id", verifyTokenAndUserAuthorization, (req, res) => {
    userController.deleteUser(req, res);
});

module.exports = router;
