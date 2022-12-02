import React, {useContext, useState, useEffect} from "react";
import WorkoutCard from "./workouts/WorkoutCard";
import axios from "axios";
import classes from "./workouts/Workouts.module.css";

import AuthContext from "../store/authContext";
const DUMMY_DATA = [
  {
    title: "big girl Leg Day",
    username: "brw",
    desc: "simple, straightforward exercises",
    exercises: [
      { name: "leg press", sets: 4, reps: 12 },
      { name: "squat", sets: 50, reps: 100 },
    ],
  },
  {
    title: "ez Chest and Tri",
    username: "brw",
    desc: "push day",
    exercises: [
      { name: "bench press", sets: 5, reps: 5 },
      { name: "push up", sets: 10, reps: 10 },
    ],
  },
  {
    title: "example",
    username: "tester",
    desc: "fake",
    exercises: [
      { name: "leg press", sets: 4, reps: 12 },
      { name: "squat", sets: 50, reps: 100 },
    ],
  },
  {
    title: "cardio",
    username: "brw",
    desc: "ez",
    exercises: [
      { name: "bench press", sets: 5, reps: 5 },
      { name: "push up", sets: 10, reps: 10 },
    ],
  },
];

const Home = () => {

  const url = 'http://localhost:4005'

  const {userId} = useContext(AuthContext)

  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
      axios.get(`${url}/workouts`)
      .then(res => {setWorkouts(res.data)})
      //     if (userId) {
      //         const otherUsersPosts = res.data.filter(workout => userId !== workout.userId)
      //         setWorkouts(otherUsersPosts)
      //     } else {
      //         setWorkouts(res.data)
      //     }
      // })
      .catch(err => {
          console.log(err)
      })
  }, [userId])

  const workoutsShown = workouts.map((workout) => {
    return <WorkoutCard workout={workout} />;
  });

  return (
    <div>
      {workoutsShown}
    </div>
  );
};

export default Home;
