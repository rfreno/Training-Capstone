import React, { useState } from "react";
import classes from "./Workouts.module.css";
import WorkoutModal from "./WorkoutModal";

const WorkoutCard = (workout) => {
  const [show, setShow] = useState(false);

  let list = workout.workout.exercises.slice(2).slice(0, -2).split('","');

  const exerciseList = list.map((i) => {
    let j = i.split("---");
    return (
      <li>
        <p>· {j[0]} - {j[1]} sets of {j[2]} reps</p>
      </li>
    );
  });
  const imgList = list.map((i) => {
    let j = i.split("---");
    return (
      <li>
        <p>· {j[0]} - {j[1]} sets of {j[2]} reps</p>
        <img src={j[3]}></img>
      </li>
    );
  });

  return (
    <div className={classes.work_display}>
    <div className={classes.work_card}>
      <div className={classes.work_title}>
        <h3>{workout.workout.name}</h3>
        <p>Created by {workout.workout.user.username}</p>
      </div>
      <div className={classes.detail_container}>
        <h4 className={classes.desc}>
          Workout Description: 
        </h4>
        <p>{workout.workout.description}</p>
        <ul className={classes.list}>{exerciseList}</ul>
      </div>
      <button className={classes.detail_btn} onClick={() => setShow(true)}>
        See Details
      </button>
      <WorkoutModal
        show={show}
        onClose={() => setShow(false)}
        title={workout.workout.name}
      >
        <h3 >
          DESCRIPTION: {workout.workout.description}
        </h3>
        <ul>{imgList}</ul>
      </WorkoutModal>
    </div>
    </div>
  );
};

export default WorkoutCard;

// title, userId, desc, exercises
