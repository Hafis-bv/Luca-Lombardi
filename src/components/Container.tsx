import clsx from "clsx";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export function Container({ children, id, className }: ContainerProps) {
  return (
    <div id={id || ""} className={clsx("max-w-375 mx-auto px-3", className)}>
      {children}
    </div>
  );
}
