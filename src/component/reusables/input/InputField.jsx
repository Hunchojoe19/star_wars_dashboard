import { TextField } from "@mui/material";
import React from "react";

const InputField = ({ label, type, value, onChange, error, helperText }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      margin="normal"
    />
  );
};

export default InputField;
