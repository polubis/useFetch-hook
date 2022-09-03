import React from "react";

import ErrorIcon from '@mui/icons-material/Error';

import csx from "./FieldBase.module.scss";

interface Props {
  label: string;
  children: React.ReactNode;
  className?: string;
  error?: string;
}

export const FieldBase = ({
  label,
  error,
  children,
  className = "",
}: Props) => {
  return (
    <div
      className={`${csx.fieldBase} ${className} ${error ? csx.invalid : ""}`}
    >
      <label>{label}</label>
      {children}
      <div className={csx.validation}>
        {error && <ErrorIcon />}
        <span className={csx.error} title={error}>
          {error}
        </span>
      </div>
    </div>
  );
};
