/**
 * GDS component: https://design-system.service.gov.uk/components/button/
 */

interface ButtonProps {
  children?: React.ReactNode;
  type?: "submit" | "button" | "reset";
}

export const Button = ({ children, type = "button" }: ButtonProps) => (
  <button type={type} className="govuk-button">
    {children}
  </button>
);