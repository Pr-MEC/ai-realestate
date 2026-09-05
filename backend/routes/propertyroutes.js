const express = require("express");
const router = express.Router();
const Property = require("../models/property");

console.log("Property Routes Loaded");

// GET all properties (supports optional filters via query params)
router.get("/", async (req, res) => {
    try {
        const { location, minPrice, maxPrice, type } = req.query;
        const filter = {};

        if (location) filter.location = new RegExp(location, "i");
        if (type) filter.type = type;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const properties = await Property.find(filter);
        res.status(200).json({ success: true, data: properties });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// GET property by ID
router.get("/:id", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }
        res.status(200).json({ success: true, data: property });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// POST add property
router.post("/", async (req, res) => {
    try {
        const newProperty = await Property.create(req.body);
        res.status(201).json({
            success: true,
            message: "Property Added",
            data: newProperty
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update property
router.put("/:id", async (req, res) => {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedProperty) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        res.status(200).json({
            success: true,
            message: `Property ${req.params.id} Updated`,
            data: updatedProperty
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE property
router.delete("/:id", async (req, res) => {
    try {
        const deletedProperty = await Property.findByIdAndDelete(req.params.id);

        if (!deletedProperty) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        res.status(200).json({
            success: true,
            message: `Property ${req.params.id} Deleted`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;