import React from "react";
import classes from "./ExerciseCard.module.css";

const ExerciseCard = (exercise) => {
  return (
    <div className={classes.full_card}>
      <div className={classes.title_container}>
        <h3>{exercise.exercise.name}</h3>
      </div>
      <div className={classes.img_container}>
        <img src={exercise.exercise.gifURL}></img>
      </div>
      <div className={classes.detail_container}>
        <h4>Target: {exercise.exercise.target}</h4>
        <h4>Equipment Used: {exercise.exercise.equipment}</h4>
      </div>
    </div>
  );
};

export default ExerciseCard;