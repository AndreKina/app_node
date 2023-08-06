const { Router } = require("express")

const auth = require("../middleware/auth")

const userRoutes = require("./user.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")

const routes = Router()

// linkage to routers
routes.use("/users", userRoutes)
routes.use("/notes", auth, notesRoutes)
routes.use("/tags", auth, tagsRoutes)

module.exports = routes
