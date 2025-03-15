const express=require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Parse JSON requests

// PostgreSQL Pool
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "blog",
//   password: process.env.DB_PASSWORD,
//   port: 5432,
// });
const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: { rejectUnauthorized: false }
  });

const generateToken = (username) => Buffer.from(username + Date.now()).toString("base64");

app.post("/login", async (req, res) => {
    const { username } = req.body;
    console.log("Login attempt for:", username);  // Log received username

  
    // Check if user exists
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  
    if (result.rows.length > 0) {
      // Generate simple token
      const token = generateToken(username);
      return res.json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ message: "User not found" });
    }
  });

  
// Add Blog Post
app.post("/add-post", async (req, res) => {
    const { username, title, content } = req.body;
  
    // Find user ID
    const userResult = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
    if (userResult.rows.length === 0) return res.status(401).json({ message: "User not found" });
  
    const userId = userResult.rows[0].id;
  
    // Insert blog post
    await pool.query("INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)", [userId, title, content]);
    res.json({ message: "Post added successfully" });
  });

  app.get("/posts/:username", async (req, res) => {
    const username = req.params.username;
  
    // Find user ID
    const userResult = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
    if (userResult.rows.length === 0) return res.status(401).json({ message: "User not found" });
  
    const userId = userResult.rows[0].id;
  
    // Fetch user posts
    const posts = await pool.query("SELECT * FROM posts WHERE user_id = $1", [userId]);
    res.json(posts.rows);
  });


  app.listen(port, () => console.log(`Server running on port ${port}`));
