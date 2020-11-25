import { FC, ButtonHTMLAttributes } from "react";
import { Icon } from "components/Icon/Icon";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  iconColor?: string;
  wrapperClass?: string;
  size?: 'small' | 'large';
  color?: string;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  icon,
  wrapperClass,
  iconColor = "currentColor",
  size = "small",
  color = "primary",
  disabled,
  ...props
}) => {
  return (
    <div className={wrapperClass}>
      <button
        className={`${styles.button} ${styles[size]} ${styles[color]} ${styles[disabled && 'disabled']}`}
        disabled={disabled}
        {...props}
      >
        {icon && (
          <span className={styles.icon}>
            <Icon name="plus" fill={iconColor} />
          </span>
        )}
        {children}
      </button>
    </div>
  );
};
