import React, { useState } from "react";
import classes from "./Workouts.module.css";
import WorkoutModal from "./WorkoutModal";

const WorkoutCard = (workout) => {
  const [show, setShow] = useState(false);

  let list = workout.workout.exercises.slice(2).slice(0, -2).split('","');

  const exerciseList = list.map((i) => {
    let j = i.split("---");
    return (
      <li>
        <p className={classes.card_p}>
          ◆ {j[0]} - {j[1]} sets of {j[2]} reps
        </p>
      </li>
    );
  });
  const imgList = list.map((i) => {
    let j = i.split("---");
    return (
      <li>
        <div className={classes.ex_img}>
        <p className={classes.modal_list}>
          ◆ {j[0]} - {j[1]} sets of {j[2]} reps
        </p>
          <img src={j[3]}></img>
        </div>
      </li>
    );
  });

  return (
    <div className={classes.work_display}>
      <div className={classes.work_card}>
        <div className={classes.work_title}>
          <h1>{workout.workout.name}</h1>
          <p className={classes.card_p}>
            Created by {workout.workout.username}
          </p>
        </div>
        <div className={classes.detail_container}>
          <h5>DESCRIPTION: {workout.workout.description}</h5>
          <ul className={classes.list}>{exerciseList}</ul>
        </div>
        <div className={classes.card_base}>
          <button className={classes.detail_btn} onClick={() => setShow(true)}>
            See Details
          </button>
        </div>
        <WorkoutModal
          show={show}
          onClose={() => setShow(false)}
          title={workout.workout.name}
        >
          <h5>DESCRIPTION: {workout.workout.description}</h5>
          <div className={classes.card_base}>
            <ul className={classes.modal_list}>{imgList}</ul>
          </div>
        </WorkoutModal>
      </div>
    </div>
  );
};

export default WorkoutCard;
