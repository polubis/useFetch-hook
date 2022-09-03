import React, { ReactElement, useCallback, memo } from "react";

import { Button } from "../button";

import csx from "./Tabs.module.scss";

interface Props {
  active: string;
  children: ReactElement | ReactElement[];
  className?: string;
  onClick(label: string): void;
}

export const Tabs = memo(
  ({ active, children, className = "", onClick }: Props): JSX.Element => {
    const enhancedChildren = React.Children.map(
      children,
      (child: ReactElement) => ({
        Component: child,
        label: child ? child.props.children : "",
      })
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        onClick(e.currentTarget.name);
      },
      [onClick]
    );

    return (
      <nav className={`${csx.tabs} ${className}`}>
        {enhancedChildren
          .filter(({ Component }) => !!Component)
          .map(({ Component, label }, idx) => (
            <Button
              key={idx}
              name={label}
              active={
                active ? active.toLowerCase() === label.toLowerCase() : false
              }
              className={csx.tab}
              theme="secondary"
              onClick={handleClick}
            >
              {Component}
            </Button>
          ))}
      </nav>
    );
  }
);
