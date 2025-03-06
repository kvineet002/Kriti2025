const deployedWebsites = require("../models/deployedWebsites");

exports.addDeployedWebsite = async (req, res) => {
    try {
        const { email, websiteName, websiteLink,websiteCode,websiteImage } = req.body;
        
        if (!email || !websiteName || !websiteLink) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let userWebsites = await deployedWebsites.findOne({ email });
        
        if (!userWebsites) {
            userWebsites = new deployedWebsites({ email, websites: [] });
        }
     
        userWebsites.websites.push({ websiteName,websiteCode, websiteLink,websiteImage });
        await userWebsites.save();

        res.status(201).json({ message: "Website added successfully", data: userWebsites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.checkDeployed = async (req, res) => {

    try {
        const {email}=req.params;
        const {websiteCode } = req.body;
        
        if (!email || !websiteCode) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userWebsites = await deployedWebsites.findOne({ email });
        
        if (!userWebsites) {
            return res.send({ status: false});
        }

        const website = userWebsites.websites.find((site) => site.websiteCode === websiteCode);
        
        if (!website) {
            return res.send({ status: false});
        }
        else {
            return res.json({ status: true, websiteLink: website.websiteLink });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
exports.getDeployedWebsites = async (req, res) => {
    try {
        const { email } = req.params;
        
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const userWebsites = await deployedWebsites.findOne({ email });
        
        if (!userWebsites) {
            return res.status(404).json({ message: "Websites not found" });
        }

        res.status(200).json({ data: userWebsites.websites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};