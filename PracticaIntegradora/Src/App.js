import express from "express";
import cors from "cors";
import __dirname from "./utils.js";
import UsersRouter from "./Routes/Users.router.js"
import CoursesRouter from "./Routes/Courses.router.js";
import ViewsRouter from "./Routes/Views.router.js";
import PetsRouter from "./Routes/Pets.router.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URL;
const connection = mongoose.connect(MONGO_URI);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/**
 * Middlewares
 */
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", ViewsRouter);
app.use("/api/pets", PetsRouter);

app.use("/api/users", UsersRouter);

app.use("/api/courses", CoursesRouter);

const server = app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));