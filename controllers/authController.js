const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getCollections } = require("../config/db");

async function signup(req, res) {
  const { username, password, role, instrument } = req.body;
  const { usersCollection } = getCollections();

  try {
    const user = await usersCollection.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      username,
      password: hashedPassword,
      role,
      instrument,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  const { usersCollection } = getCollections();

  try {
    const user = await usersCollection.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const payload = {
      username: user.username,
      role: user.role,
      instrument: user.instrument || null,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { signup, login };
