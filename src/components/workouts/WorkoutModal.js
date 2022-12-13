import React from "react";
import classes from './WorkoutModal.module.css'

const WorkoutModal = (props) => {
    // remove this later if handling show/hide via CSS
    // https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a
    if (!props.show) {
        return null
    }

  return (
    <div className={classes.modal} onClick={props.onClose}>
      <div className={classes.modal_content} onClick={evt => evt.stopPropagation()}>
        <div className={classes.modal_header}>
          <h3 className={classes.modal_title}>{props.title}</h3>
        </div>
        <div className={classes.modal_body}>{props.children}</div>
        <div className={classes.modal_footer}>
            <button onClick={props.onClose} className={classes.button}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutModal;
