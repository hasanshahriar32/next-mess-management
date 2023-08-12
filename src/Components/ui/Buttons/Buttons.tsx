import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const OpenDrawer = ({ children, className }: Props): JSX.Element => {
  return (
    <div>
      <label
        htmlFor="my-drawer-2"
        className={`btn btn-primary drawer-button lg:hidden ${className}`}
      >
        {children}
      </label>
    </div>
  );
};
