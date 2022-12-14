import React, { useContext, useState, useEffect } from "react";
import WorkoutCard from "./workouts/WorkoutCard";
import axios from "axios";
import classes from "./workouts/Workouts.module.css";

import AuthContext from "../store/authContext";

const Home = () => {
  const url = "http://localhost:4005";

  const { userId } = useContext(AuthContext);

  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/workouts`)
      .then((res) => {
        setWorkouts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const workoutsShown = workouts.map((workout) => {
    return <WorkoutCard workout={workout} />;
  });

  return (
    <div>
      {/* {workouts.length < 1 ? workoutsShown : <p>No workouts to display.</p>} */}
      {workoutsShown}
    </div>
  );
};

export default Home;
