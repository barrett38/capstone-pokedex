const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;
const { sequelize } = require("./util/database");
const { register, login } = require("./controllers/auth");

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`DB Sync successful & server running on port ${PORT}.`)
    );
  })
  .catch((err) => console.log(err));

// https://github.com/barrett38/capstone-pokedex
// Use Code is needed:
// git reset --hard COMMIT_ID

// Sign Up is set up:
// c0cb4a38c005f99c15a52a1ab98d6e320508451e
