import express from "express"
import employeeController from "../controller/employee.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";


const employeeRouter = express.Router();




employeeRouter.post("/add", authMiddleware, upload.single("profileImage"), employeeController.addEmployee);
employeeRouter.get("/all", authMiddleware, employeeController.getEmployees);
employeeRouter.get("/single/:id", authMiddleware, employeeController.singleView);
employeeRouter.delete("/remove/:id", authMiddleware, employeeController.deleteEmployee);
employeeRouter.patch("/update/:id", authMiddleware, upload.single("profileImage"), employeeController.updateEmployee);

export default employeeRouter
