import { ReactNode } from "react";
import css from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  children?: ReactNode;
}

export const Avatar = ({ className = "", children }: AvatarProps) => (
  <figure className={`${className} ${css.avatar}`}>
    {children ? children : <div className={css.placeholder} />}
  </figure>
);
