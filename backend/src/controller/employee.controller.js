
import employeeModel from "../model/employee.model.js"
import userModel from "../model/user.model.js"
import uploadOnCloudinary from "../util/Cloudinary.js"

const addEmployee = async (req, res) => {

	const { name, email, position, contactNumber, profileImage } = req.body
	const { _id } = req.user
	try {

		const user = await userModel.findById(_id)

		if (!user || user.role !== "admin") {
			return res.status(400).json({
				message: "You are not a admin",
				success: false
			})
		}

		if (!name || !email || !position || !contactNumber) {
			return res.status(400).json({
				message: "All fields are required",
				success: false
			})
		}

		const existsEmployee = await employeeModel.findOne({ email })

		if (existsEmployee) {
			return res.status(500).json({
				message: "Employee already exists",
				success: false
			})
		}

		const filePath = req.file.path

		const uploadedImage = await uploadOnCloudinary(filePath)

		if (!uploadedImage?.url) {
			return res.status(500).json({
				message: "Something went wrong",
				success: false
			})
		}

		const newEmployee = new employeeModel({
			name,
			email,
			position,
			contactNumber,
			profileImage: uploadedImage.url
		})

		console.log(newEmployee)
		await newEmployee.save()

		return res.status(200).json({
			message: "Employee added successfully",
			success: true
		})
	} catch (error) {

		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}


const getEmployees = async (req, res) => {
	const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', search } = req.query;

	try {
		const filter = {};

		if (search) {
			filter.$or = [
				{ name: { $regex: search, $options: "i" } },
				{ email: { $regex: search, $options: "i" } },
				{ position: { $regex: search, $options: "i" } }
			];
		}

		const employees = await employeeModel.find(filter)
			.sort({ [sortBy]: order === 'desc' ? -1 : 1 })
			.skip((page - 1) * limit)
			.limit(parseInt(limit));

		const totalEmployees = await employeeModel.countDocuments(filter);

		res.status(200).json({
			employees,
			totalPages: Math.ceil(totalEmployees / limit),
			currentPage: parseInt(page),
			totalEmployees
		});
	} catch (error) {
		res.status(500).json({ message: 'Error fetching employees', error: error.message });
	}
};


const deleteEmployee = async (req, res) => {
	const { _id } = req.user
	try {
		const user = await userModel.findById(_id)
		if (!user || user.role !== "admin") {
			return res.status(400).json({
				message: "You are not a admin",
				success: false
			})
		}
		const em = await employeeModel.findById(req.params.id)
		if (!em) {
			return res.status(400).json({
				message: "Employee not found",
				success: false
			})
		}
		await employeeModel.findByIdAndDelete(req.params.id)
		return res.status(200).json({
			message: "Employee deleted successfully",
			success: true
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const singleView = async (req, res) => {
	const { _id } = req.user
	try {
		const user = await userModel.findById(_id)

		if (!user || user.role !== "admin") {
			return res.status(400).json({
				message: "You are not a admin",
				success: false
			})
		}

		const employee = await employeeModel.findById(req.params.id)
		if (!employee) {
			return res.status(404).json({
				message: "Employee not found",
				success: false
			})
		}
		return res.status(200).json({
			employee,
			success: true
		})
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		})
	}
}

const updateEmployee = async (req, res) => {
	const { _id } = req.user;
	const { name, email, position, contactNumber } = req.body;

	try {
		const user = await userModel.findById(_id);
		if (!user || user.role !== "admin") {
			return res.status(400).json({
				message: "You are not an admin",
				success: false
			});
		}

		const employee = await employeeModel.findById(req.params.id);
		if (!employee) {
			return res.status(404).json({
				message: "Employee not found",
				success: false
			});
		}

		let uploadedImage;
		if (req.file) {
			const filePath = req.file.path;
			uploadedImage = await uploadOnCloudinary(filePath);

			if (!uploadedImage?.url) {
				return res.status(500).json({
					message: "Image upload failed",
					success: false
				});
			}
			employee.profileImage = uploadedImage.url;
		}

		if (name) employee.name = name;
		if (email) employee.email = email;
		if (position) employee.position = position;
		if (contactNumber) employee.contactNumber = contactNumber;

		await employee.save();

		return res.status(200).json({
			message: "Employee updated successfully",
			success: true,
		});

	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false
		});
	}
};






export default { addEmployee, getEmployees, deleteEmployee, singleView, updateEmployee }

