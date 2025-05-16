const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const userFilePath = path.join(__dirname, "../data/user.json");

router.post("/", (req, res) => {
    const newUser = req.body;

    let users = [];
    if (fs.existsSync(userFilePath)) {
        const data = fs.readFileSync(userFilePath, "utf-8");
        users = data ? JSON.parse(data) : [];
    }

    const isDuplicate = users.some(user => user.email === newUser.email);
    if (isDuplicate) {
        return res.status(409).json({ message: "This email has already been used." });
    }

    users.push(newUser);
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), "utf-8");

    res.status(200).json({ message: "Register successfully" });
});

module.exports = router;
