import React, { forwardRef } from "react";

import MuiButton from "@mui/material/Button";
import MuiIconButton from "@mui/material/IconButton";

import csx from "./Button.module.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  active?: boolean;
  children: React.ReactNode;
  variant?: "default" | "icon";
  theme?: "primaryDark" | "primaryTransparent" | "danger" | "secondary";
}

export const Button = forwardRef(
  (
    {
      active,
      children,
      variant = "default",
      theme = "primaryDark",
      ...btnProps
    }: Props,
    ref
  ) => {
    if (variant === "icon") {
      return (
        <MuiIconButton
          {...(btnProps as any)}
          classes={{
            root: `${csx.iconButton} ${csx[theme]} ${active ? csx.active : ""}`,
          }}
          ref={ref}
        >
          {children}
        </MuiIconButton>
      );
    }

    return (
      <MuiButton
        {...(btnProps as any)}
        classes={{
          root: `${csx.button} ${csx[theme]} ${active ? csx.active : ""}`,
        }}
        ref={ref}
      >
        {children}
      </MuiButton>
    );
  }
);
