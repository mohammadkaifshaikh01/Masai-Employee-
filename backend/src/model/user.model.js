import mongoose from "mongoose";

const userSchema = mongoose.Schema({
	role: {
		type: String,
		required: true,
		default: "admin"
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
}, { timestamps: true, versionKey: false })


const userModel = mongoose.model("User", userSchema)
export default userModel;