import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	position: {
		type: String,
		required: true
	},
	contactNumber: {
		type: String,
		required: true
	},
	profileImage: {
		type: String,
	}
}, { timestamps: true, versionKey: false });

const employeeModel = mongoose.model('Employee', employeeSchema);

export default employeeModel;
