require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { SERVER_PORT } = process.env;

const { login, register } = require("./controllers/auth");
const { getAllWorkouts, addWorkout } = require("./controllers/workouts");
const { isAuthenticated } = require("./middleware/isAuthenticated");

const { sequelize } = require("./util/database");
const { User } = require("./models/user");
const { Workout } = require("./models/workout");

User.hasMany(Workout);
Workout.belongsTo(User);

app.post("/register", register);
app.post("/login", login);

// app.get("/workouts", getAllWorkouts)

// app.post("/workouts", isAuthenticated, addWorkout)

app.listen(SERVER_PORT, () =>
  console.log(`server listening at ${SERVER_PORT}`)
);
