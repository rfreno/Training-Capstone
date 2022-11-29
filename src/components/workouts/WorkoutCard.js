import React from "react";
import classes from './Workouts.module.css'

const WorkoutCard = (workout) => {

    const exerciseList = (workout.workout.exercises).map(exercise => {
        return (
            <li>{exercise.name}: {exercise.sets} sets of {exercise.reps} reps</li>
        )
    })

  return (
    <div className={classes.work_card}>
      <div className={classes.work_title}>
        <h3>{workout.workout.title}</h3>
        <p>Created by {workout.workout.username}</p>
      </div>
      {/* <div className={classes.img_container}>
      <img src={exercise.exercise.gifURL}></img>
    </div> */}
      <div className={classes.detail_container}>
        <h4 className={classes.desc}>DESCRIPTION: {workout.workout.desc}</h4>
        <ul className={classes.list}>{exerciseList}</ul>
      </div>
      <button className={classes.detail_btn}>See Details</button> 
      {/* Add Modal to pop up for details (set and reps for exercises) */}
    </div>
  );
};

export default WorkoutCard;


// title, userID, description, public, exercises