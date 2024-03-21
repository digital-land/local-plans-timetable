/**
 * GDS component: https://design-system.service.gov.uk/components/button/
 */

import cn from "classnames";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
  className?: string
}

export const Button = ({ children, type = "button", onClick, className }: ButtonProps) => (
  <button type={type} className={cn("govuk-button", className)} onClick={onClick}>
    {children}
  </button>
);
