const { Router } = require("express")

const NotesController = require("../controllers/NotesController")
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const notesRouter = Router()

const notesController = new NotesController()

notesRouter.use(ensureAuthenticated)

// list routs
notesRouter.post("/create", notesController.create)
notesRouter.post("/index", notesController.index)
notesRouter.post("/show", notesController.show)

module.exports = notesRouter
