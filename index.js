const express = require("express");
const rdsCon = require("./Database/db.config");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const notesRouter = require("./Routers/notes.router.js");
const tasksRouter = require("./Routers/tasks.router.js");
const serverless = require("serverless-http");

app.use(cors());
app.use(express.json());

app.use("/api", notesRouter);
app.use("/api", tasksRouter);

// app.listen(PORT, () => {

//     console.log(`Server is running on port ${PORT}`);

// });

exports.handler = serverless(app);
