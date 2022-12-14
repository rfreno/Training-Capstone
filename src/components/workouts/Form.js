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
  const [username, setUsername] = useState("");

  const url = "http://localhost:4005";

  const initialValues = {
    type: "",
    name: "",
    description: "",
    exercises: "",
    username:"",
  };

  const onSubmit = (values,  {resetForm} ) => {

    values.exercises = exercises;
    resetForm({ values: "" });
    axios
      .post(`${url}/workouts`, values, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res)
        navigate(`${url}/`)}
        );
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      `${ex.label} --- ${sets} --- ${reps} --- ${ex.gifURL}`,
    ]);
    setEx(null);
    setSets("sets");
    setReps("reps");
    setShow(false)
  };

  const showExercises = exercises.map((item) => {
    let j = item.split("---");
    return (
      <li>
        ◆ {j[0]} - {j[1]} sets of {j[2]} reps
      </li>
    );
  });

  return (
    <section>
      <div className={classes.form_base}>


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
                        }}
                      ></input>
                      <input
                        type="text"
                        placeholder={reps}
                        name="reps"
                        onChange={(evt) => {
                          setReps(evt.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  <button type="button" onClick={addExercise} className={classes.detail_btn}>
                    ADD
                  </button>
                </WorkoutModal>

        <Formik initialValues={initialValues} 
            onSubmit={onSubmit}> 
          {({ values, handleChange, handleSubmit, handleReset }) => (
            <form
              onSubmit={handleSubmit}
              onReset={handleReset}
              className={classes.form_layout}
            >
              <div >
                <h1 className={classes.form_r2}>NEW WORKOUT</h1>
                <div>
                  <input
                    type="text"
                    placeholder="workout name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className={classes.form_r2}
                  ></input>
                  <input
                    type="text"
                    placeholder="creator name"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    className={classes.form_r2}
                  ></input>
                </div>

                <div className={classes.form_r3}>
                  <input
                    type="text"
                    placeholder="description & notes"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    
                  ></input>
                <button className={classes.submit} type="submit" onClick={onSubmit}>
                  SAVE WORKOUT
                </button>
                </div>
  

              </div>


            </form>
          )}
        </Formik>



        <div className={classes.form_left}>
        <button className={classes.add} onClick={() => setShow(true)}>Add Exercises</button>
                <ul className={classes.list}>{showExercises}</ul>
              </div>

      </div>
    </section>
  );
};

export default Form;
