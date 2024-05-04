const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

// working
const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  // editPost,
  // deletePost,
} = require("./controllers/posts");

const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");

app.use(express.json());
app.use(cors());

// working
// User.hasMany(Post);
Post.belongsTo(User);

app.get("/posts", getAllPosts);
app.post("/posts", isAuthenticated, addPost);

app.post("/register", register);
app.post("/login", login);

app.get("/userposts/:userId", getCurrentUserPosts);
// app.put("/posts/:id", isAuthenticated, editPost);
// app.delete("/posts/:id", isAuthenticated, deletePost);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`db sync successful & server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log(err));

// Use code below if needed:
// git reset --hard 2b3b75dc48c03bc26511589b9ab919f71bb40819

// Refer to comments while working: "// working"
