import React from 'react';

interface Props {
  children?: React.ReactNode;
  isDragging?: boolean;
}

const CustomEventWrapper = ({ isDragging, children }: Props) => {
  return isDragging ? null : <div>{children}</div>;
};

export default CustomEventWrapper;
