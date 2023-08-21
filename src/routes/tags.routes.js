const { Router } = require("express")

const TagsController = require("../controllers/TagsController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const tagsRouter = Router()

const tagsController = new TagsController()

tagsRouter.use(ensureAuthenticated)

// linkage
tagsRouter.post("/create", tagsController.create)
tagsRouter.post("/index", tagsController.index)
tagsRouter.post("/show", tagsController.show)

module.exports = tagsRouter
