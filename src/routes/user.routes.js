const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const UserController = require("../controllers/UserController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const upload = multer(uploadConfig.MULTER)

const userRouter = Router()

const userController = new UserController()

// create user
userRouter.post("/", userController.create)
userRouter.put("/", ensureAuthenticated, userController.update)
// patch -> single attribute update
userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  (req, res) => {
    console.log(req.file.filename)
    return res.status(200).json()
  }
)

module.exports = userRouter
