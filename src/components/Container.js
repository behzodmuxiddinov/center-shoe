import { cn } from "../Contants";
import React from "react";

const Container = ({
  className,
  children,
}) => {
  return (
    <div className={cn("mx-auto max-w-[1256px] w-full px-5 sm:px-2", className)}>
      {children}
    </div>
  );
};

export default Container
