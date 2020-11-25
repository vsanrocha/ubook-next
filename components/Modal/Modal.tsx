import { FC, HTMLAttributes, useState, useEffect } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  showModal: boolean;
  size?: "small" | "large";
  title: string;
  footer: any;
  onClose: (value: boolean) => void;
};

export const Modal: FC<ModalProps> = ({
  children,
  showModal,
  size = "small",
  title,
  footer,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);
  return isOpen ? (
    <div>
      <div className={styles.modal}>
        <div className={`${styles.modalContent} ${styles[size]}`}>
          <div className={styles.title}>{title}</div>
          <hr className={styles.divider} />
          <div className={styles.body}>{children}</div>
          <hr className={styles.divider} />
          <div className={styles.footer}>{footer}</div>
        </div>
      </div>
      <div
        className={styles.overlay}
        onClick={() => {
          onClose(false);
          setIsOpen(false);
        }}
      />
    </div>
  ) : null;
};
