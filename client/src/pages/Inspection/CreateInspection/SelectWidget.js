import React from "react";
import {
  Label,
} from "reactstrap";
import FeatherIcon from 'feather-icons-react';

const SelectWidget = (props) => {
  
  const handleChangeOption = (option) => {
    props.handleChange(props.name, option);
  }

  return (
    <React.Fragment>
      <div className="list-group-item select-widget">
        <Label>
          {props.title}
        </Label>
        <div className="d-flex">
          <div className={`check-icon false-check ${props.currentValue === "No" ? "active" : ""}`} onClick={() => handleChangeOption('No')}>
            <FeatherIcon icon="x" />
          </div>
          <div className={`check-icon true-check ${props.currentValue === "Yes" ? "active" : ""}`} onClick={() => handleChangeOption('Yes')}>
            <FeatherIcon icon="check" />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SelectWidget;
