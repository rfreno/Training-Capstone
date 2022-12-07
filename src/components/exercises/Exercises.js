import React, { useState } from "react";
import ExerciseCard from "./ExerciseCard";
import classes from "./ExerciseCard.module.css";
import Dropdown from "./Dropdown";

let allExercises = require("../../db/db_ex.json");

const Exercises = () => {
  // const [grid, setGrid] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [startNum, setStartNum] = useState(0);
  const [muscleFilter, setMuscleFilter] = useState(null);
  const [equipFilter, setEquipFilter] = useState(null);
  const [tSelect, setTSelect] = useState(false);
  const [eSelect, setESelect] = useState(false);
  let perPage = 20;

  const equipOptions = [
    { value: "0", label: "assisted" },
    { value: "1", label: "band" },
    { value: "2", label: "barbell" },
    { value: "3", label: "body weight" },
    { value: "4", label: "bosu ball" },
    { value: "5", label: "cable" },
    { value: "6", label: "dumbbell" },
    { value: "7", label: "elliptical machine" },
    { value: "8", label: "ez barbell" },
    { value: "9", label: "hammer" },
    { value: "10", label: "kettlebell" },
    { value: "11", label: "leverage machine" },
    { value: "12", label: "medicine ball" },
    { value: "13", label: "olympic barbell" },
    { value: "14", label: "resistance band" },
    { value: "15", label: "roller" },
    { value: "16", label: "rope" },
    { value: "17", label: "skierg machine" },
    { value: "18", label: "sled machine" },
    { value: "19", label: "smith machine" },
    { value: "20", label: "stability ball" },
    { value: "21", label: "stationary bike" },
    { value: "22", label: "stepmill machine" },
    { value: "23", label: "tire" },
    { value: "24", label: "trap bar" },
    { value: "25", label: "upper body ergometer" },
    { value: "26", label: "weighted" },
    { value: "27", label: "wheel roller" },
  ];

  const muscleOptions = [
    { value: "0", label: "abductors" },
    { value: "1", label: "abs" },
    { value: "2", label: "adductors" },
    { value: "3", label: "biceps" },
    { value: "4", label: "calves" },
    { value: "5", label: "cardiovascular system" },
    { value: "6", label: "delts" },
    { value: "7", label: "forearms" },
    { value: "8", label: "glutes" },
    { value: "9", label: "hamstrings" },
    { value: "10", label: "lats" },
    { value: "11", label: "levator scapulae" },
    { value: "12", label: "pectorals" },
    { value: "13", label: "quads" },
    { value: "14", label: "serratus anterior" },
    { value: "15", label: "spine" },
    { value: "16", label: "traps" },
    { value: "17", label: "triceps" },
    { value: "18", label: "upper back" },
  ];

  // function SortArray(x, y) {
  //   if (x.name < y.name) {
  //     return -1;
  //   }
  //   if (x.name > y.name) {
  //     return 1;
  //   }
  //   return 0;
  // }

  function filter(arr, criteria) {
    if (criteria.target === null && criteria.equipment === null) {
      return arr;
    } else if (criteria.target != null && criteria.equipment === null) {
      return arr.filter((item) => item.target === criteria.target);
    } else if (criteria.target === null && criteria.equipment != null) {
      return arr.filter((item) => item.equipment === criteria.equipment);
    } else {
      return arr.filter(function (obj) {
        return Object.keys(criteria).every(function (c) {
          return obj[c] === criteria[c];
        });
      });
    }
  }

  const filteredExercises = filter(
    allExercises.exercises,
    muscleFilter && equipFilter
      ? {
          target: muscleFilter.label,
          equipment: equipFilter.label,
        }
      : muscleFilter
      ? { target: muscleFilter.label, equipment: null }
      : equipFilter
      ? { target: null, equipment: equipFilter.label }
      : { target: null, equipment: null }
  );

  const exercisesShown = filteredExercises
    .slice(startNum, startNum + perPage)
    .map((exercise) => {
      return <ExerciseCard exercise={exercise} />;
    });
  // .sort(SortArray)

  return (
    <div>
      <div className={classes.sort_bar}>
        <button
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
              setStartNum(startNum + perPage);
            }
          }}
        >
          Previous
        </button>
        <p>
          Page Number: {pageNumber} of{" "}
          {Math.ceil(filteredExercises.length / perPage)}
        </p>
        <button
          onClick={() => {
            if (pageNumber < filteredExercises.length / perPage) {
              setPageNumber(pageNumber + 1);
              setStartNum(startNum - perPage);
            }
          }}
        >
          Next
        </button>
      </div>
      <div className={classes.sort_bar}>
        <div className={classes.sort_options}>
          <button>Grid View </button>
          <button>List View</button>
        </div>
        <div className={classes.sort_options}>
          <p>filter: </p>
          <Dropdown
            placeHolder="select target muscle..."
            options={muscleOptions}
            onChange={(value) => {
              setMuscleFilter(value);
              setTSelect(true);
            }}
            clear={tSelect}
          />
          <Dropdown
            placeHolder="select equipment..."
            options={equipOptions}
            onChange={(value) => {
              setEquipFilter(value);
              setESelect(true);
            }}
            clear={eSelect}
          />
          <button
            onClick={() => {
              setMuscleFilter(null);
              setEquipFilter(null);
              setTSelect(false);
              setESelect(false);
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className={classes.exercise_display}>
        {filteredExercises.length > 0 ? (
          exercisesShown
        ) : (
          <p>No exercises match the selected filters</p>
        )}
      </div>
    </div>
  );
};

export default Exercises;
