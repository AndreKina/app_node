const { Router } = require("express")

const NotesController = require("../controllers/NotesController")

const notesRouter = Router()

const notesController = new NotesController()

// list routs
notesRouter.post("/create", notesController.create)
notesRouter.post("/index", notesController.index)
notesRouter.post("/show", notesController.show)

module.exports = notesRouter
