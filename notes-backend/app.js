const express = require("express");
const app = express();
const dotenv = require("dotenv");
const todosRouter = require("./routers/Todos");
const notesRouter = require("./routers/Notes")
const usersRouter = require("./routers/Users")
const cookieParser = require("cookie-parser");
dotenv.config();

// using middlewares
app.use(express.json());
app.use(cookieParser())
app.use(todosRouter);
app.use(notesRouter);
app.use(usersRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
