import React, { useState, useEffect } from "react";

import classes from "./Dropdown.module.css";

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Dropdown = ({ placeHolder, options, onChange, clear }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = (evt) => {
    evt.stopPropagation();
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (clear === false) {
      return placeHolder
    }
    if (selectedValue) {
      return selectedValue.label;
    }
  };

  const onItemClick = (opt) => {
    setSelectedValue(opt);
    onChange(opt)
  };

  const isSelected = (opt) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === opt.value;
  };

  return (
    <div className={classes.dropdown_container}>
      <div onClick={handleInputClick} className={classes.dropdown_input}>
        {showMenu && (
          <div className={classes.dropdown_menu}>
            {options.map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`${classes.dropdown_item} ${isSelected(option) && "selected"}`}
              >
                {option.label}{" "}
              </div>
            ))}
          </div>
        )}

        {/* className={classes.dropdown-selected-value} */}
        <div>{getDisplay()}</div>
        {/* className={classes.dropdown-tools} */}
        <div>
          {/* className={classes.dropdown-tool} */}
          <div>
            <Icon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;