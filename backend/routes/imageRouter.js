const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const express = require("express");
const router = express.Router();

cloudinary.config({ 
    cloud_name: "djzzrbrny", 
    api_key: "483651354228974", 
    api_secret: "eVaGealW3wFUYaNBqgMrMAsmt0E"
});

router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        res.json({ url: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
