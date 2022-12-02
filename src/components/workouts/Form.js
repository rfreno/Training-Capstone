import React, { useState } from "react";
import classes from "./Workouts.module.css";
import { Formik } from "formik";
import axios from "axios";

const Form = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");

  const initialValues = {
    type: "",
    workoutNmae: "",
    description: "",
    exercises: []
  };

  const onSubmit = (values, { resetForm }) => {
    values.exercises = exercises;
    console.log(values);
    resetForm({ values: "" });
    // axios
    // .post(`https://recipes.devmountain.com/recipes`, values)
  };

  const addExercise = () => {
    setIngredients([...ingredients, { name, quantity }]);
    setName("");
    setQuantity("");
  };

  const showExercises = ingredients.map((item) => {
    return (
      <li>
        {item.quantity} {item.name}
      </li>
    );
  });

  return (
    <section>
      <div className={classes.form_base}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ values, handleChange, handleSubmit, handleReset }) => (
            <form
              onSubmit={handleSubmit}
              onReset={handleReset}
              className={classes.form_layout}
            >
              <div className={classes.form_right}>
                <h1 className={classes.form_r1}>NEW WORKOUT</h1>
                <div>
                  <input
                    type="text"
                    placeholder="workout name"
                    name="workoutName"
                    value={values.workoutName}
                    onChange={handleChange}
                    className={classes.form_r2}
                  ></input>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="description & notes"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className={classes.form_r3}
                  ></input>
                </div>

                <div>
                  <div>
                    <input
                      type="text"
                      placeholder="search for exercises"
                      name="exercise"
                      onChange={(evt) => setName(evt.target.value)}
                      className={classes.form_r4}
                    ></input>
                  </div>
                </div>

                <button className={classes.submit} type="submit">
                  SAVE WORKOUT
                </button>
              </div>
              {/* add modal to pop up for exercises */}

              {/* <button type="button" onClick={addExercise}>
                Add Exercise
              </button> */}
              <div className={classes.form_left}>
                <textarea
                  placeholder="Exercises added will show here"
                  name="instructions"
                  rows={20}
                  value={values.instructions}
                  onChange={handleChange}
                />
                {/* <ul>{showExercises}</ul> */}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Form;