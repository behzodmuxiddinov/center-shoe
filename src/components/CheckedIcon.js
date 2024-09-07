import * as React from "react";

// By: heroicons
// See: https://v0.app/icon/heroicons/check-20-solid
// Example: <IconHeroiconsCheck20Solid width="24px" height="24px" style={{color: "#000000"}} />

export const CheckIcon = ({
  height = "90px",
  width = "90px",
  fill = "currentColor",
  focusable = "false",
  ...props
}) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M16.705 4.153a.75.75 0 0 1 .142 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893l7.48-9.817a.75.75 0 0 1 1.05-.143"
      clipRule="evenodd"
    />
  </svg>
);