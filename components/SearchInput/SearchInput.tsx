import React, { FC, InputHTMLAttributes } from "react";
import { Icon } from "components/Icon/Icon";
import styles from "./SearchInput.module.scss";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClass: string;
}

export const SearchInput: FC<SearchInputProps> = ({ wrapperClass, ...props }) => {
  return (
    <div className={wrapperClass}>
      <input className={`col ${styles.searchInput}`} {...props} />
      <Icon name="search" className={styles.icon}/>
    </div>
  );
};
