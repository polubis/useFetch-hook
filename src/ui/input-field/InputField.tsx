import React from "react";

import { FieldBase } from "../field-base";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  className?: string;
  error?: string;
}

export const InputField = ({
  label,
  error,
  className,
  ...inputProps
}: Props) => {
  return (
    <FieldBase label={label} error={error} className={className}>
      <input {...inputProps} />
    </FieldBase>
  );
};
