import express from "express";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const router = express.Router();

const usersFile = path.join(process.cwd(), "data", "users.json")

// POST /api/register
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    let users = [];
    if (fs.existsSync(usersFile)) {
        try {
            const data = fs.readFileSync(usersFile, 'utf8');
            if (data.trim()) {
                users = JSON.parse(data);
            }
        } catch (error) {
            console.log('Error reading users file, starting with empty array:', error.message);
        }
    }

    if(!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const userExists = users.find(user => user.email === email);
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = {
            id: crypto.randomBytes(16).toString("hex"),
            username,
            email,
            password: hashedPassword
        }

        users.push(newUser);
        fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

        res.status(201).json(
            { message: "User registered successfully", user: { id: newUser.id, username: newUser.username, email: newUser.email } }
        );
    } catch(err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;