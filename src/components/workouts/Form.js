import React, { useState, useContext } from "react";
import classes from "./Workouts.module.css";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";

const Form = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [ex, setEx] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [name, setTitle] = useState("");

  const url = "http://localhost:4005";

  const initialValues = {
    type: "",
    name: "",
    description: "",
    exercises: [],
    userId
  };

  const onSubmit = (values, { resetForm }) => {
    values.exercises = exercises;
    console.log('onsub', values.exercises)
    console.log('onsub', exercises)
    resetForm({ values: "" });
    axios
      .post(`${url}/workouts`, values, {
        headers: {
          authorization: token,
        },
      })
      .then(navigate(`${url}/`));
  };

  const addExercise = () => {
    console.log(exercises)
    setExercises([...exercises, `${ex} - sets ${sets} of ${reps} reps`]);
    console.log(exercises, { ex, sets, reps })
    setEx("");
    setSets("");
    setReps("");
  };

  const showExercises = exercises.map((item) => {
    return (
      <li>
        {item.ex} - {item.sets} sets of {item.reps} reps
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
                    name="name"
                    value={values.name}
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
                      placeholder="Add exercises"
                      name="exercise"
                      onChange={(evt) => setEx(evt.target.value)}
                      className={classes.form_r4}
                    ></input>
                    <input
                      type="text"
                      placeholder="Sets"
                      name="sets"
                      onChange={(evt) => setSets(evt.target.value)}
                    ></input>
                    <input
                      type="text"
                      placeholder="Reps"
                      name="reps"
                      onChange={(evt) => setReps(evt.target.value)}
                    ></input>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addExercise}
                >
                  Add Exercise
                </button>

                <button className={classes.submit} type="submit">
                  SAVE WORKOUT
                </button>
              </div>
              {/* add modal to pop up for exercises */}

              {/* <button type="button" onClick={addExercise}>
                Add Exercise
              </button> */}
              <div className={classes.form_left}>
                {/* <textarea
                  placeholder="Exercises added will show here"
                  name="instructions"
                  rows={20}
                  value={values.instructions}
                  onChange={handleChange}
                /> */}
                <ul>{showExercises}</ul>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Form;
