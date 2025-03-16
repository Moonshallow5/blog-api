const express=require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();
const bcrypt = require("bcrypt");


const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Parse JSON requests

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

app.post("/register", async(req,res)=> {
  const { username, password } = req.body;

  const existingUser = await pool.query("SELECT id FROM users WHERE username = $1", [username]);

    if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "Username already taken" });
    }
    const hashedpass=await bcrypt.hash(password,10);

    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashedpass]
  );

  return res.json({ message: "User registered successfully", user_id: result.rows[0].id });



})

app.post("/login", async (req, res) => {
    const { username,password } = req.body;
    console.log("Login attempt for:", username);  // Log received username

  
    // Check if user exists
    const result = await pool.query("SELECT id, username,password FROM users WHERE username = $1", [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(password)
      console.log(bcrypt.hash(password, 10))

      if (passwordMatch) {
          const token = generateToken(username);
          return res.json({ message: "Login successful", token, user_id: user.id });
      } else {
          return res.status(401).json({ message: "Invalid password" });
      }
  } else {
      return res.status(401).json({ message: "User not found" });
  }
  

  });

  
// Add Blog Posttt
app.post("/add-post", async (req, res) => {
    const { userId, title, content } = req.body;
  
  
    // Insert blog post
    await pool.query("INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)", [userId, title, content]);
    res.json({ message: "Post added successfully" });
  });

  app.get("/posts/:userId", async (req, res) => {
    const userId = req.params.userId;
  
  
    // Fetch user posts
    const posts = await pool.query("SELECT * FROM posts WHERE user_id = $1", [userId]);
    res.json(posts.rows);
  });
  app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (post.rowCount === 0) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post.rows[0]);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

  app.delete("/delete-post/:id", async (req, res) => {
    const postId = req.params.id;
    const userId = req.query.user_id; // ✅ Get user_id from query parameter

  
    try {
      const result = await pool.query(
        "DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *",
        [postId, userId]
      );
  
      if (result.rowCount === 0) {
        return res.status(403).json({ error: "Unauthorized or post not found" });
      }
  
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });



  app.post("/add-comment",async(req,res) => {
    const { userId, postId, content } = req.body;

    if (!userId || !postId || !content) {
        return res.status(400).json({ error: "All fields are required" });
    } try {
      await pool.query(
          "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3)",
          [userId, postId, content]
      );
      res.json({ message: "Comment added successfully" });
  } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal server error" });
  }

  });

  app.get("/comments/:postId", async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await pool.query(
            "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = $1 ORDER BY created_at ASC",
            [postId]
        );
        res.json(comments.rows);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


  app.listen(port, () => console.log(`Server running on port ${port}`));
