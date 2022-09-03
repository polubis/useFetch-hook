import React from "react";
import { usePortal } from "../../utils";

import csx from "./Backdrop.module.scss";

interface Props {
  className?: string;
  outside?: boolean;
  onClick?(): void;
}

export const Backdrop = ({
  className = "",
  outside = true,
  onClick = () => {},
}: Props) => {
  const render = usePortal();

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onClick();
  };

  const element = (
    <div className={`${className} ${csx.backdrop}`} onClick={handleClick} />
  );

  return outside ? render(element) : element;
};
