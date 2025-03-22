import employeeRouter from "./src/routes/employee.routes.js";
import dotenv from "dotenv";
import ConnectDB from "./src/config/db.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/em", employeeRouter);




const PORT = process.env.PORT || 5000
app.listen(PORT ,async()=>{
   await ConnectDB()
   console.log(`Server Is Running On Port : ${PORT}`)
})



app.get("/", (req, res) => res.send("Api Working..."));
