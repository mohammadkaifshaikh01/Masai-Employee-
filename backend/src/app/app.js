import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "../routes/user.routes.js";
import employeeRouter from "../routes/employee.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/em", employeeRouter);

app.get("/", (req, res) => res.send("🌐 Server is Running..."));

export default app;