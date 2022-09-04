interface ErrorMessageProps {
  error: unknown;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Something went wrong</div>;
};
