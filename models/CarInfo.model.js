const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CarInfoSchema = new Schema({
	brand: { type: String, required: true },
	model: { type: String, required: true },
	image: {
		type: String,
		default:
			"https://images.unsplash.com/photo-1573401491021-c5f127195de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
	},
	year: { type: Number },
	consumption: { type: String, enum: ["High", "Medium", "Low"] },
	user: { type: Schema.Types.ObjectId, ref: "CarInfo" },
});

module.exports = model("CarInfo", CarInfoSchema);
