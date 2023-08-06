require("express-async-errors")
const AppError = require("./utils/AppError")

const express = require("express")

const routes = require("./routes")

const PORT = 3333

const app = express()
app.use(express.json())

app.use(routes)

// error handler
app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  console.log(error)

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
})

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
