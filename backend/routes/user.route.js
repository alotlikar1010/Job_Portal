import express from "express";
const { login, logout, register, updateProfile } = require('../controllers/userController.js');
const {isAuthenticated } =require("../middlewares/isAuthenticated.js");
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;
