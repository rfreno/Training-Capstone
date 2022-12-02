const { Workout } = require("../models/workout");
const { User } = require("../models/user");

module.exports = {
  getAllWorkouts: async (req, res) => {
    try {
      const workouts = await Workout.findAll({
        include: [
          {
            model: User,
            required: true,
            attributes: [`username`],
          },
        ],
      });
      console.log("SUCCESS: gAP");
      res.status(200).send(workouts);
    } catch (err) {
      console.log("error in getAllWorkouts", err);
      res.sendStatus(400);
    }
  },

  addWorkout: async (req, res) => {
    try {
      const { name, description, exercises, userId } = req.body;
      console.log(exercises)
      await Workout.create({ name, description, exercises, userId });
      console.log("SUCCESS: addWorkout");
      res.sendStatus(200);
    } catch (err) {
      console.log("error in addWorkout", err);
      res.sendStatus(400);
    }
  },
};
