import { ReactElement } from "react";
import css from "./AvatarsGrid.module.scss";

interface AvatarsGridProps {
  children?: ReactElement<{ src: string }>[];
  loading?: boolean;
  placeholders?: number;
}

export const AvatarsGrid = ({
  children,
  loading,
  placeholders = 15,
}: AvatarsGridProps) => {
  return (
    <div className={css.container}>
      {loading &&
        Array.from({ length: placeholders }).map((_, i) => (
          <div className={css.placeholder} key={i} />
        ))}
      {(children ?? []).map((child) => (
        <figure className={css.item} key={child.props.src}>
          {child}
        </figure>
      ))}
    </div>
  );
};
