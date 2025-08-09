import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

// POST /api/register
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            id: Date.now(),
            username,
            email,
            password: hashedPassword
        }
        res.status(201).json(
            { message: "User registered successfully", user: newUser }
        );
    } catch(err) {
        console.error("Error registering user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;