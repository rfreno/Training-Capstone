import React, { useState, useContext } from "react";
import classes from "./Workouts.module.css";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/authContext";
import Dropdown from "../exercises/Dropdown";
import WorkoutModal from "./WorkoutModal";

const allExercises = require("../../db/db_ex.json");

const exerciseOptions = allExercises.exercises.map((exercise) => ({
  value: `${exercise.name}`,
  label: `${exercise.name}`,
  target: `${exercise.target}`,
  equip: `${exercise.equipment}`,
  gifURL: `${exercise.gifURL}`,
}));

const Form = () => {
  const { token, userId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [ex, setEx] = useState(null);
  const [sets, setSets] = useState("sets");
  const [reps, setReps] = useState("reps");
  const [show, setShow] = useState(false);

  const url = "http://localhost:4005";

  const initialValues = {
    type: "",
    name: "",
    description: "",
    exercises: "",
    userId,
  };

  const onSubmit = async (values, { resetForm }) => {
    values.exercises = exercises;
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
    setExercises([
      ...exercises,
      `${ex.label} --- ${sets} --- ${reps} --- ${ex.gifURL}`,
    ]);
    setEx(null);
    setSets("sets");
    setReps("reps");
  };

  const showExercises = exercises.map((item) => {
    let j = item.split("---");
    return (
      <li>
        · {j[0]} - {j[1]} sets of {j[2]} reps
      </li>
    );
  });

  return (
    <section>
      <div className={classes.form_base}>
        <Formik initialValues={initialValues}
           onSubmit={onSubmit}> 
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
                <button onClick={() => setShow(true)}>Add Exercises</button>
                <WorkoutModal
                  show={show}
                  onClose={() => setShow(false)}
                  title="Add Exercises"
                >
                  <div>
                    <Dropdown
                      placeHolder="Select exercises from the list below"
                      options={exerciseOptions}
                      onChange={(evt) => setEx(evt)}
                      isSearchable
                    />
                    <div>
                      <input
                        type="text"
                        placeholder={sets}
                        name="sets"
                        onChange={(evt) => {
                          setSets(evt.target.value);
                          // evt.target.value = "";
                        }}
                      ></input>
                      <input
                        type="text"
                        placeholder={reps}
                        name="reps"
                        onChange={(evt) => {
                          setReps(evt.target.value);
                          // evt.target.value = "";
                        }}
                      ></input>
                    </div>
                  </div>
                  <button type="button" onClick={addExercise}>
                    ADD
                  </button>
                </WorkoutModal>

                <button className={classes.submit} type="submit" onClick={onSubmit}>
                  SAVE WORKOUT
                </button>
              </div>

              <div className={classes.form_left}>
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
