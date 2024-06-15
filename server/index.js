const express = require("express");
// const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;
const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Post } = require("./models/post");

const {
  getUsersPokemon,
  addRandomPokemon,
} = require("./controllers/randomPokemon");

const { register, login } = require("./controllers/auth");
const { isAuthenticated } = require("./middleware/isAuthenticated");

app.use(express.json());
// app.use(cors());

Post.belongsTo(User);

app.post("/posts", isAuthenticated, addRandomPokemon);

app.post("/register", register);
app.post("/login", login);

app.get("/userposts/:userId", getUsersPokemon);

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

// Most Recent- Random Pokemon working:
// git reset --hard b61a7eb190f9e2e6bcba94e5c19068fc4346626c

// Username: admin38
// Password: pw123
