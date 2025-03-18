const pool = require("../models/db");


// Add Blog Posttt
exports.addPost= async (req, res) => {
    const { userId, title, content } = req.body;
  
  
    try{
    await pool.query("INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3)", [userId, title, content]);
    res.json({ message: "Post added successfully" });
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
};
  

  exports.getPostByUser= async (req, res) => {
    const userId = req.params.userId;
  
  
    // Fetch user posts
    try{
        const posts = await pool.query("SELECT * FROM posts WHERE user_id = $1", [userId]);
        res.json(posts.rows);
    }catch(error){
        res.status(500).json({ message: "Internal server error" });
    }
  };

  exports.updatePost=async(req,res)=>{
    const { id } = req.params;
    const { title, content } = req.body;
    
    try {
      const result = await pool.query(
          "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
          [title, content, id]
      );

      if (result.rowCount === 0) {
          return res.status(404).json({ message: "Post not found" });
      }

      res.json({ message: "Post updated successfully", post: result.rows[0] });
  } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal server error" });
  }
  }

  exports.getPostById= async (req, res) => {
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
    };

    
  exports.deletePost= async (req, res) => {
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
      res.status(500).json({ error: "Internal server error" });
    }
  };

