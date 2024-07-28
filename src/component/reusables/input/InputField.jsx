import { TextField } from "@mui/material";
import React from "react";

const InputField = React.forwardRef((props, ref) => {
  const {
    label,
    type,
    value,
    onChange,
    error,
    helperText,
    name,
    handleBlur,
    handleFocus,
  } = props;

  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      sx={{ width: "335px", height: "48px", marginBottom: "16px" }}
      variant="outlined"
      margin="normal"
      required
      inputRef={ref}
      onBlur={handleBlur}
      onFocus={handleFocus}
      name={name}
    />
  );
});

export default InputField;
