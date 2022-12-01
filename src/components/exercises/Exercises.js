import React, { useState } from "react";
import ExerciseCard from "./ExerciseCard";
import classes from "./ExerciseCard.module.css";

let allExercises = require('../../db/db_ex.json')

const Exercises = () => {
  // const [grid, setGrid] = useState();
  
  const exercisesShown = allExercises.exercises
    .map((exercise) => {
      return <ExerciseCard exercise={exercise} />;
    });

  return (
    <div>
      {/* <div className={classes.sort_bar}>
          <div className={classes.sort_options}>
            <button>Grid View </button>
            <button>List View</button>
          </div>
          <div className={classes.sort_options}>
            <p>filter:  </p>
            <button>Equipment </button>
            <button>Target Muscle</button>
            <button onMouseOver={}>Target Muscle</button> 
          </div>
      </div> */}
      <div className={classes.exercise_display}>{exercisesShown}</div>
    </div>
  );
};

export default Exercises;