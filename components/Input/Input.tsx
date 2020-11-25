import { FC, InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register?: any;
  id: string;
}

export const Input: FC<InputProps> = ({ register, label, id, ...props }) => {
  return (
    <label className={styles.label} htmlFor={id}>
      {label}
      <input
        className={`${styles.input} mb-3`}
        id={id}
        ref={register}
        {...props}
      />
    </label>
  );
};
