const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

console.log("Starting Server...");

connectDB();

app.use(cors());
app.use(express.json());

console.log("Registering Routes...");

app.use("/api/users", require("./routes/userroutes"));
app.use("/api/properties", require("./routes/propertyroutes"));
app.use("/api/inquiries", require("./routes/inquiryroutes"));
app.use("/api/ai", require("./routes/airoutes"));

console.log("Routes Registered Successfully");

app.get("/", (req, res) => {
    res.send("AI Real Estate API is Running...");
});

const PORT = process.env.PORT || 5600;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});