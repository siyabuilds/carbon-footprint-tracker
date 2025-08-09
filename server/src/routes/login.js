import express from "express";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const router = express.Router();

const usersFile = path.join(process.cwd(), "data", "users.json");

// POST /api/login
router.post("/", async (req, res) => {
    const { email, username, password } = req.body;
    const identifier = email || username;

    if (!identifier || !password) {
        return res.status(400).json({ message: "Username/Email and password are required" });
    }

    let users = [];
    if (fs.existsSync(usersFile)) {
        try {
            const data = fs.readFileSync(usersFile, 'utf8');
            if (data.trim()) {
                users = JSON.parse(data);
            }
        } catch (error) {
            console.log('Error reading users file:', error.message);
        }
    }

    const user = users.find(user => user.email === identifier || user.username === identifier);
    if (!user) {
        return res.status(401).json({ message: "Invalid username/email or password" });
    }

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username/email or password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;