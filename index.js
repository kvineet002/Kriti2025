const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3005;

app.use(cors({origin:["http://localhost:3000","https://kriti2025-pi.vercel.app"]}));
app.use(bodyParser.json());

app.post("/deploy", async (req, res) => {
    const htmlContent = req.body.html;
    if (!htmlContent) {
        return res.status(400).json({ error: "HTML content is required!" });
    }

    const folderPath = path.join(__dirname, "deploy-folder");
    const filePath = path.join(folderPath, "index.html");
    const customDomain = `ogata-${Date.now()}.surge.sh`;

    try {
        // Write HTML content
        fs.writeFileSync(filePath, htmlContent, "utf8");
        exec(
            `npx surge whoami`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Surge Error: ${error.message}`);
                    return res.status(500).json({ error: "Surge login failed!" });
                }
                if (stderr) {
                    console.error(`Stderr: ${stderr}`);
                }
                console.log(`🔐 Logged in to Surge`);
            }
        );
        // Deploy using Surge token from environment
        exec(
            `npx surge ${folderPath} ${customDomain} --no-confirm`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error(`Deployment Error: ${error.message}`);
                    return res.status(500).json({ error: "Deployment failed!" });
                }
                if (stderr) {
                    console.error(`Stderr: ${stderr}`);
                }
                console.log(`✅ Deployed: https://${customDomain}`);
                res.json({ url: `https://${customDomain}` });
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});