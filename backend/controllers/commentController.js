const pool = require("../models/db");

exports.addComment= async(req,res) => {
    const { userId, postId, content } = req.body;

    if (!userId || !postId || !content) {
        return res.status(400).json({ error: "All fields are required" });
    } 
    try {
      await pool.query(
          "INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3)",
          [userId, postId, content]
      );
      res.json({ message: "Comment added successfully" });
  } catch (error) {
      res.status(500).json({ error: "Internal server error" });
  }

  }

  
  exports.getCommentByPost= async (req, res) => {
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
}
