const express = require("express");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&format=json&addressdetails=1&limit=5`,
      {
        headers: {
          "User-Agent": "PrintIT-App",
          "Accept": "application/json",
        },
      }
    );

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch {
      console.error("Invalid JSON from Nominatim:", text);
      res.json([]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Location search failed" });
  }
});

router.get("/reverse", async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ message: "lat/lng required" });
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      {
        headers: {
          "User-Agent": "PrintIT-App",
          "Accept": "application/json",
        },
      }
    );

    const text = await response.text();

    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch {
      console.error("Reverse invalid JSON:", text);
      res.json({});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Reverse failed" });
  }
});

module.exports = router;