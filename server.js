const express = require("express");
const axiom = require("axiom");
require("dotenv").config();

const app = express();

const PORT = 3000;

//Serve frontend files
app.use(express.static("public"));

app.get("/ip/:address", async (req, res) => {
  try {
    // Get IP from URL
    const ip = req.params.address;

    // Log request info
    console.log("Time:", new Date().toISOString());
    console.log("IP Requested:", ip);
    console.log("Method:", req.method);
    console.log("Client IP:", req.ip);

    // Forward request to IPStack
    const response = await axios.get(
      `http://api.ipstack.com/${ip}?access_key=${process.env.IPSTACK_KEY}`
    );

    // Send response back to client
    res.json(response.data);

  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
})