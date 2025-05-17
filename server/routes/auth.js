const {signupValidation,loginValidation} = require("../middlewares/authValidation");
const {signup, login} = require('../controllers/authcontroller');
const router = require("express").Router();

router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);

module.exports = router;