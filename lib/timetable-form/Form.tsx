import styles from "./styles.module.css";

export const Form = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { className, ...otherProps } = props;
  return (
    <div className={`${className} ${styles.form}`} {...otherProps}>
      <h1>Form Title </h1>
    </div>
  );
};
