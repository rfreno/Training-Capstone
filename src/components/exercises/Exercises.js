import React, { useState } from "react";
import ExerciseCard from "./ExerciseCard";
import classes from "./ExerciseCard.module.css";

let allExercises = require('../../db/db_ex.json')

const DUMMY_DATA = [
  {
    name: "barbell pullover to press",
    bodyPart: "back",
    target: "lats",
    equipment: "barbell",
    gifURL: "http://d205bpvrqc9yn1.cloudfront.net/0022.gif",
  },
  {
    name: "barbell rack pull",
    bodyPart: "upper legs",
    target: "glutes",
    equipment: "barbell",
    gifURL: "http://d205bpvrqc9yn1.cloudfront.net/0074.gif",
  },
  {
    name: "barbell rear delt raise",
    bodyPart: "shoulders",
    target: "delts",
    equipment: "barbell",
    gifURL: "http://d205bpvrqc9yn1.cloudfront.net/0075.gif",
  },
  {
    name: "barbell rear delt row",
    bodyPart: "shoulders",
    target: "delts",
    equipment: "barbell",
    gifURL: "http://d205bpvrqc9yn1.cloudfront.net/0076.gif",
  },
  {
    name: "barbell rear lunge",
    bodyPart: "upper legs",
    target: "glutes",
    equipment: "barbell",
    gifURL: "http://d205bpvrqc9yn1.cloudfront.net/0078.gif",
  },
];

const Exercises = () => {
  console.log(allExercises)
  const [list, setList] = useState();
  const [grid, setGrid] = useState();
  
  const exercisesShown = allExercises.exercises
    // .filter((recipe) => {
    //   let name = recipe.recipe_name.toLowerCase();
    //   // console.log(name)
    //   let searched = search.toLowerCase();
    //   return name.includes(searched);
    // })
    .map((exercise) => {
      return <ExerciseCard exercise={exercise} />;
    });

  return (
    <div>
      <div className={classes.sort_bar}>
        {/* MAKE THESE BUTTONS 
            ADD MOUSEOVER DETAILS
            ADD STATE TO CHANGE EXERCISESSHOWN
        */}
          <div className={classes.sort_options}>
            <button>Grid View </button>
            <button>List View</button>
          </div>
          <div className={classes.sort_options}>
            <p>filter:  </p>
            <button>Equipment </button>
            <button>Target Muscle</button>
          </div>
      </div>
      <div className={classes.exercise_display}>{exercisesShown}</div>
    </div>
  );
};

export default Exercises;