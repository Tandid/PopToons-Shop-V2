import Link from "next/link";
import React, { ReactNode } from "react";

interface DropdownProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = (props): React.ReactElement => {
  let { href, children, ...rest } = props;
  href = href || "#"; //# serves as the default value and helps with type checking
  return (
    <Link {...rest} href={href}>
      {children}
    </Link>
  );
};

export default Dropdown;
