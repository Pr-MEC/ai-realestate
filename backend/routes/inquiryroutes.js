const express = require("express");
const router = express.Router();
const Inquiry = require("../models/inquiry");

console.log("Inquiry Routes Loaded");

// GET all inquiries
router.get("/", async (req, res) => {
    try {
        const { status, propertyId } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (propertyId) filter.propertyId = propertyId;

        const inquiries = await Inquiry.find(filter).populate("propertyId");
        res.status(200).json({ success: true, data: inquiries });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// GET inquiry by ID
router.get("/:id", async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id).populate("propertyId");
        if (!inquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }
        res.status(200).json({ success: true, data: inquiry });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// POST create inquiry
router.post("/", async (req, res) => {
    try {
        const { name, email, phone, message, propertyId } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newInquiry = await Inquiry.create({
            name,
            email,
            phone,
            message,
            propertyId
        });

        res.status(201).json({
            success: true,
            message: "Inquiry Submitted",
            data: newInquiry
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update inquiry (e.g. change status)
router.put("/:id", async (req, res) => {
    try {
        const updatedInquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updatedInquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }

        res.status(200).json({
            success: true,
            message: `Inquiry ${req.params.id} Updated`,
            data: updatedInquiry
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE inquiry
router.delete("/:id", async (req, res) => {
    try {
        const deletedInquiry = await Inquiry.findByIdAndDelete(req.params.id);

        if (!deletedInquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }

        res.status(200).json({
            success: true,
            message: `Inquiry ${req.params.id} Deleted`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;