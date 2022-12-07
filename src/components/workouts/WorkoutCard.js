import React from "react";
import classes from './Workouts.module.css'

const WorkoutCard = (workout) => {
    const exerciseList = (workout.workout.exercises)
    // .map(exercise => {
    //     return (
    //         <li>{exercise.ex}: {exercise.sets} sets of {exercise.reps} reps</li>
    //     )
    // })

    console.log(workout)

  return (
    <div className={classes.work_card}>
      <div className={classes.work_title}>
        <h3>{workout.workout.name}</h3>
        <p>Created by {workout.workout.user.username}</p>
      </div>
      <div className={classes.detail_container}>
        <h4 className={classes.desc}>DESCRIPTION: {workout.workout.description}</h4>
        <ul className={classes.list}>{exerciseList}</ul>
      </div>
      {/* <button className={classes.detail_btn}>See Details</button>  */}
      {/* Add Modal to pop up for details (set and reps for exercises) */}
    </div>
  );
};

export default WorkoutCard;


// title, userId, desc, exercises