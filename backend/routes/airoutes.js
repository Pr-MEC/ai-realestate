const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const AI = require("../models/aiRecommendation");
const Property = require("../models/property");

console.log("AI Routes Loaded");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/*
========================================================
GET ALL AI REQUESTS
========================================================
*/

router.get("/", async (req, res) => {
    try {
        const { status, userId } = req.query;

        const filter = {};

        if (status) {
            filter.status = status;
        }

        if (userId) {
            filter.userId = userId;
        }

        const requests = await AI.find(filter)
            .populate("userId", "-password")
            .populate("propertyId");

        res.status(200).json({
            success: true,
            data: requests,
        });

    } catch (err) {
        console.error("GET AI requests error:", err);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


/*
========================================================
GET AI REQUEST BY ID
========================================================
*/

router.get("/:id", async (req, res) => {
    try {
        const request = await AI.findById(req.params.id)
            .populate("userId", "-password")
            .populate("propertyId");

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "AI request not found",
            });
        }

        res.status(200).json({
            success: true,
            data: request,
        });

    } catch (err) {
        console.error("GET AI request error:", err);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


/*
========================================================
POST CREATE AI RECOMMENDATION
========================================================
*/

router.post("/", async (req, res) => {
    try {
        const {
            prompt,
            userId,
            location,
            type,
            budget,
        } = req.body;

        /*
        ------------------------------------------------
        Validate prompt
        ------------------------------------------------
        */

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        /*
        ------------------------------------------------
        Validate budget
        ------------------------------------------------
        */

        let maxBudget = null;

        if (budget !== undefined && budget !== null && budget !== "") {
            maxBudget = Number(budget);

            if (isNaN(maxBudget)) {
                return res.status(400).json({
                    success: false,
                    message: "Budget must be a valid number",
                });
            }
        }

        /*
        ------------------------------------------------
        Create AI request
        ------------------------------------------------
        */

        const aiRequest = await AI.create({
            prompt,
            userId: userId || null,
            propertyId: null,
            status: "Pending",
        });

        /*
        ------------------------------------------------
        BUILD PROPERTY FILTER
        ------------------------------------------------
        */

        const filter = {
            status: "Available",
        };

        /*
        Location
        Example:
        Kochi
        kochi
        KOCHI
        ------------------------------------------------
        */

        if (location && location.trim() !== "") {
            filter.location = new RegExp(
                `^${location.trim()}$`,
                "i"
            );
        }

        /*
        Property type
        Example:
        Villa
        Apartment
        House
        ------------------------------------------------
        */

        if (type && type.trim() !== "") {
            filter.type = type.trim();
        }

        /*
        Maximum budget
        ------------------------------------------------
        */

        if (maxBudget !== null) {
            filter.price = {
                $lte: maxBudget,
            };
        }

        console.log("--------------------------------");
        console.log("AI PROPERTY SEARCH");
        console.log("Prompt:", prompt);
        console.log("Location:", location);
        console.log("Type:", type);
        console.log("Budget:", maxBudget);
        console.log("MongoDB Filter:", filter);
        console.log("--------------------------------");

        /*
        ------------------------------------------------
        FIND MATCHING PROPERTIES
        ------------------------------------------------
        */

        const matchingProperties = await Property.find(filter)
            .sort({ price: 1 })
            .limit(5);

        console.log(
            "Matching properties:",
            matchingProperties.map((property) => ({
                id: property._id,
                title: property.title,
                type: property.type,
                location: property.location,
                price: property.price,
                status: property.status,
            }))
        );

        /*
        ------------------------------------------------
        CREATE PROPERTY CONTEXT FOR GEMINI
        ------------------------------------------------
        */

        let propertyContext;

        if (matchingProperties.length > 0) {
            propertyContext = matchingProperties
                .map((property) => {
                    return `
Property ID: ${property._id}
Title: ${property.title}
Type: ${property.type}
Location: ${property.location}
Price: ₹${property.price.toLocaleString("en-IN")}
Bedrooms: ${property.bedrooms || 0}
Bathrooms: ${property.bathrooms || 0}
Area: ${property.area || "Not specified"} sqft
Status: ${property.status}
Description: ${property.description || "No description available"}
`;
                })
                .join("\n--------------------\n");
        } else {
            propertyContext =
                "NO MATCHING PROPERTIES FOUND IN THE DATABASE.";
        }

        /*
        ------------------------------------------------
        GEMINI
        ------------------------------------------------
        */

        let generatedResponse = "";
        let finalStatus = "Completed";

        try {
            const model = genAI.getGenerativeModel({
                model: "gemini-3.6-flash",
            });

            const geminiPrompt = `
You are a real estate recommendation assistant.

USER REQUEST:
${prompt}

USER PREFERENCES:
Location: ${location || "Any location"}
Property Type: ${type || "Any type"}
Maximum Budget: ${
                maxBudget !== null
                    ? `₹${maxBudget.toLocaleString("en-IN")}`
                    : "Any budget"
            }

IMPORTANT RULES:

1. Only recommend properties from the database list below.
2. NEVER invent a property.
3. NEVER recommend a property that is not in the database list.
4. NEVER recommend a property above the user's maximum budget.
5. NEVER recommend a property in a different location.
6. NEVER recommend a different property type.
7. Only recommend properties whose status is Available.
8. If there are no matching properties, clearly tell the user that no matching properties are currently available.
9. Keep the response friendly and concise.
10. Mention the property title, location, type and price when recommending a property.

DATABASE PROPERTIES:

${propertyContext}

Now provide the best recommendation based ONLY on the database properties above.
`;

            const result = await model.generateContent(
                geminiPrompt
            );

            generatedResponse = result.response.text();

        } catch (aiErr) {
            console.error(
                "Gemini generation failed:",
                aiErr
            );

            /*
            If Gemini fails, still give the user
            a useful response based on database results.
            */

            if (matchingProperties.length > 0) {
                generatedResponse =
                    `I found ${matchingProperties.length} matching ${
                        matchingProperties.length === 1
                            ? "property"
                            : "properties"
                    } based on your requirements.`;
            } else {
                generatedResponse =
                    "Sorry, no properties currently match your requirements.";
            }

            finalStatus = "Completed";
        }

        /*
        ------------------------------------------------
        UPDATE AI REQUEST
        ------------------------------------------------
        */

        aiRequest.response = generatedResponse;
        aiRequest.status = finalStatus;

        /*
        Save first recommended property
        */

        if (matchingProperties.length > 0) {
            aiRequest.propertyId =
                matchingProperties[0]._id;
        }

        await aiRequest.save();

        /*
        ------------------------------------------------
        SEND RESPONSE TO FRONTEND
        ------------------------------------------------
        */

        res.status(201).json({
            success: true,
            message: "AI Request Processed",

            data: aiRequest,

            /*
            IMPORTANT:
            Send actual properties to frontend
            */

            properties: matchingProperties,

            count: matchingProperties.length,
        });

    } catch (err) {
        console.error(
            "AI recommendation error:",
            err
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to process AI recommendation",
            error: err.message,
        });
    }
});


/*
========================================================
PUT UPDATE AI REQUEST
========================================================
*/

router.put("/:id", async (req, res) => {
    try {
        const updatedRequest =
            await AI.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "AI request not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `AI Request ${req.params.id} Updated`,
            data: updatedRequest,
        });

    } catch (err) {
        console.error(
            "PUT AI request error:",
            err
        );

        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
});


/*
========================================================
DELETE AI REQUEST
========================================================
*/

router.delete("/:id", async (req, res) => {
    try {
        const deleted =
            await AI.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "AI request not found",
            });
        }

        res.status(200).json({
            success: true,
            message: `AI Request ${req.params.id} Deleted`,
        });

    } catch (err) {
        console.error(
            "DELETE AI request error:",
            err
        );

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


module.exports = router;