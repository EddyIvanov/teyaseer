import React from 'react';

type TProps = {
  selected?: boolean;
};

export const CircleIcon = ({ selected }: TProps) => {
  if (selected) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="12" cy="12" r="11.5" fill="#001731" stroke="#001731" />
        <circle cx="12" cy="12" r="6" fill="white" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="white" />
      <circle cx="12" cy="12" r="11.5" stroke="#001731" strokeOpacity="0.4" />
    </svg>
  );
};
