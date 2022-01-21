const express = require("express");
const router = express.Router();
const CarInfo = require("../models/CarInfo.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const mongoose = require("mongoose");

// POST /api/carinfo - Create a new car
router.post("/api/carinfo", async (req, res, next) => {
	try {
		// Get the data from the request body
		const { brand, model, image, year, consumption } = req.body;
		console.log("test", req.body);

		// Save the data in the db
		const createdCarInfo = await CarInfo.create({
			brand,
			model,
			image,
			year,
			consumption,
		});

		res.status(201).json(createdCarInfo); // 201 Created
	} catch (error) {
		res.status(500).json(error); // Internal Server Error
	}
});

// GET /api/carinfo - Get all existing carshops
router.get("/api/carinfo", async (req, res, next) => {
	try {
		const allCarInfo = await CarInfo.find(); //.populate("User");

		res.status(200).json(allCarInfo);
	} catch (error) {
		res.status(500).json(error);
	}
});

// GET /api/carshop:carinfoId  - Get a specific carshop
router.get("/api/carinfo/:carinfoId", async (req, res, next) => {
	try {
		// Get the carinfo id from the URL
		const { carinfoId } = req.params; //   in Express `:` means `req.params`

		if (!mongoose.Types.ObjectId.isValid(carinfoId)) {
			res.status(400).json({ message: "Invalid object id" });
			return;
		}

		// Make a DB query
		const onecarInfo = await CarInfo.findById(carinfoId); //.populate("user");

		// Send the response
		res.status(200).json(onecarInfo);
	} catch (error) {
		res.status(500).json(error);
	}
});

// PUT  /api/carinfo:carinfoId  - Update a specific carInfo
router.put("/api/carinfo/:carinfoId", async (req, res, next) => {
	try {
		// Get the carInfo id
		const { carinfoId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(carinfoId)) {
			res.status(400).json({ message: "Invalid object id" });
			return;
		}

		// Values to use for updating the slope
		const { brand, model, image, year, consumption, user } = req.body;

		const updatedCarInfo = await CarInfo.findByIdAndUpdate(
			carinfoId,
			{
				brand,
				model,
				image,
				year,
				consumption,
				user,
			},
			{ new: true }
		);

		res.status(200).json(updatedCarInfo);
	} catch (error) {
		res.status(500).json(error);
	}
});

// DELETE /api/carinfo:carinfoId - Delete a specific carInfo
router.delete("/api/carinfo/:carinfoId", async (req, res, next) => {
	try {
		const { carinfoId } = req.params;

		if (!mongoose.Types.ObjectId.isValid(carinfoId)) {
			res.status(400).json({ message: "Invalid object id" });
			return;
		}

		await CarInfo.findByIdAndDelete(carinfoId);

		res.status(204).send(); // No Content
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
