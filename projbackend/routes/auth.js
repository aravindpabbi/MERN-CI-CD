var express = require('express');
const { check,validationResult } = require('express-validator');


var { signout, signup, signin, isSignedIn } = require("../controllers/auth")

var router = express.Router()


router.post("/signup",[
  check("name","name should be atleast 3 characters").isLength({ min: 5 }),
  check("email","email is required").isEmail(),
  check("password","password should be atleast 3char").isLength({ min: 3 })
], signup)

router.post("/signin",[
  check("email","email is required").isEmail(),
  check("password","password should be atleast 3char").isLength({ min: 1 })
], signin)


router.get("/signout", signout);

router.get("/test",isSignedIn,(req,res) => {
  res.json(req.auth)
}
);

module.exports = router;