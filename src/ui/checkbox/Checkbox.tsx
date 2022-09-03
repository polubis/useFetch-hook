import React, { ReactNode } from "react";

import MuiCheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import csx from "./Checkbox.module.scss";

type OnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  value: boolean
) => void;

interface Props {
  className?: string;
  invalid?: boolean;
  label: ReactNode;
  value: boolean;
  dataIdx?: string;
  variant?: "default" | "informing";
  onChange: OnChange;
}

const checkboxClasses = { root: csx.checkbox, checked: csx.checked };

export const Checkbox = ({
  className = "",
  invalid,
  label,
  value,
  variant = "default",
  dataIdx,
  onChange,
}: Props) => {
  return (
    <FormControlLabel
      className={className}
      label={label}
      classes={{
        root: `${csx.checkboxLabel} ${csx[variant]} ${
          invalid ? csx.invalid : ""
        }`,
      }}
      control={
        <MuiCheckbox
          checked={value}
          onChange={onChange}
          classes={checkboxClasses}
          inputProps={
            {
              "data-idx": dataIdx,
            } as any
          }
        />
      }
    />
  );
};
