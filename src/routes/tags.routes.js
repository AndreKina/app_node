const { Router } = require("express")

const TagsController = require("../controllers/TagsController")

const tagsRouter = Router()

const tagsController = new TagsController()

// linkage
tagsRouter.post("/create", tagsController.create)
tagsRouter.post("/index", tagsController.index)
tagsRouter.post("/show", tagsController.show)

module.exports = tagsRouter
