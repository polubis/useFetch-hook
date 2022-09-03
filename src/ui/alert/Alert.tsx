import { memo, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import { Button } from "../button";

import csx from "./Alert.module.scss";

export type AlertType = "error" | "success";

export interface AlertProps {
  id: number;
  className?: string;
  delay?: number;
  message: string;
  type?: AlertType;
  onClose(): void;
}

export const Alert = memo(
  ({
    className = "",
    delay = 5000,
    id,
    message,
    type = "error",
    onClose,
  }: AlertProps) => {
    const [animationClass, setAnimationClass] = useState(csx.animateIn);

    useEffect(() => {
      if (!delay) {
        return;
      }

      let nestedTimeout: NodeJS.Timeout;

      const parentTimeout = setTimeout(() => {
        setAnimationClass(csx.animateOut);
        nestedTimeout = setTimeout(onClose, 300);
      }, delay);

      return () => {
        if (parentTimeout) {
          clearTimeout(parentTimeout);
        }

        if (nestedTimeout) {
          clearTimeout(nestedTimeout);
        }
      };
    }, []);

    return (
      <div
        className={`${csx.alert} ${className} ${animationClass} ${csx[type]}`}
      >
        <span className={csx.id}>{id}</span>

        <div className={csx.divider} />

        <span className={csx.message}>{message}</span>

        <Button
          className={csx.closeBtn}
          variant="icon"
          theme="primaryTransparent"
          onClick={onClose}
        >
          <CloseIcon />
        </Button>
      </div>
    );
  },
  () => true
);
