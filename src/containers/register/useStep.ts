import { useState } from "react";

export const STEPS = [
  {
    label: "Account setup",
    description: "Choose username, email and use safe password for log in",
  },
  {
    label: "Work & Company",
    description: "Describe yourself for other users",
  },
  {
    label: "Almost done!",
    description: "Read our policy and confirm account creation",
  },
];

export const useStep = () => {
  const [idx, setIdx] = useState(0);

  const data = STEPS[idx],
    isFirst = idx === 0,
    isSecond = idx === 1,
    isLast = idx === STEPS.length - 1;

  const increment = (): void => {
    setIdx((prevIdx) => prevIdx + 1);
  };

  const decrement = (): void => {
    setIdx((prevIdx) => prevIdx - 1);
  };

  const reset = (): void => {
    setIdx(0);
  };

  return { idx, data, isFirst, isSecond, isLast, increment, decrement, reset };
};
