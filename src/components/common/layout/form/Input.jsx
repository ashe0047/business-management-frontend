import React from "react";
import { FormControl } from "react-bootstrap";

/**
 * Summary. 
 * Custom Form Control Component
 * 
 * Description.
 * Custom Form Control Component capable of showing validation messages
 * 
 * @param {boolean} isValid
 * @param {boolean} isInvalid
 * @param {string} feedback
 * @returns Form Control component with validation Message
 */

const Input = ({
  id,
  type,
  label,
  value,
  onChange,
  feedback,
  className,
  ...props
}) => {
  return (
    <>
        <FormControl
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            className={className}
            {...props}
        />
        <FormControl.Feedback type={"isInvalid" in props? "invalid":"valid"}>{feedback}</FormControl.Feedback>
    </>
  );
};

export default Input;
