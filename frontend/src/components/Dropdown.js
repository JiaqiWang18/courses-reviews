import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateOp } from "../actions";

const DropDown = ({ options, updateOp }) => {
  const [selected, setSelected] = useState(options[0]);
  useEffect(() => {
    updateOp(selected.value);
  }, [selected]);

  const renderedOptions = options.map((option) => {
    //hide item that is already selected
    if (option.value === selected.value) return null;

    return (
      <button
        className="dropdown-item"
        key={option.value}
        onClick={() => setSelected(option)}
      >
        {option.label}
      </button>
    );
  });

  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn text-muted dropdown-btn"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selected.label} <i className="fas fa-chevron-down ml-1"></i>
      </button>
      <div className="dropdown-menu">
        <span className="dropdown-menu-arrow"></span>
        {renderedOptions}
      </div>
    </div>
  );
};

export default connect(null, { updateOp })(DropDown);
