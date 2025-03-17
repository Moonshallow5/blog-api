const express=require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Parse JSON requests


app.use('/auth',require("./routes/authRoutes"));
app.use('/posts',require("./routes/postRoutes"));
app.use('/comments',require('./routes/commentRoutes'));


  app.listen(port, () => console.log(`Server running on port ${port}`));
