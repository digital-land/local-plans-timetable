/**
 * GDS component: https://design-system.service.gov.uk/components/button/
 */

interface ButtonProps {
  children?: React.ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: () => void;
}

export const Button = ({ children, type = "button", onClick }: ButtonProps) => (
  <button type={type} className="govuk-button" onClick={onClick}>
    {children}
  </button>
);
