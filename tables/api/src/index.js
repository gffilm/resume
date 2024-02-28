const express = require("express");
const fs = require("fs").promises; // Use the promises version of fs for async/await
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Handle POST request to save data to a JSON file
app.post("/save-data", async (req, res) => {
  try {
    const data = req.body;
    const filePath = path.join(__dirname, "../../web/public/assets/people.json");

    // Convert the JavaScript object to a JSON string
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON data to a file
    await fs.writeFile(filePath, jsonData);

    res.status(200).json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error while saving data to JSON file:", error);
    res.status(500).json({ success: false, message: "Failed to save data" });
  }
});

app.get("*", (req, res) => {
  res.send({
    status: true
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
