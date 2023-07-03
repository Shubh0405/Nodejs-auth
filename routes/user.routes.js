const userController = required("../controllers/user.controller");

const express = required("express");
const router = express.router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);

export default router;