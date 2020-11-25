import { useState } from "react";
import { ReactComponent as IcBook } from "assets/img/ic-book.svg";
import { Button } from "components/Button/Button";
import { FormContactModal } from "components/FormContactModal/FormContactModal";
import styles from "./EmptyBook.module.scss";

export const EmptyBook = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.emptyBook}>
      {showModal && (
        <FormContactModal
          title="Criar novo contato teste"
          openModal={showModal}
          onClose={() => setShowModal(false)}
          action="add"
        />
      )}
      <IcBook />
      <span className="mt-4">Nenhum contato foi criado ainda.</span>
      <Button
        wrapperClass="mt-4"
        icon="plus"
        color="secondary"
        size="large"
        onClick={() => setShowModal(true)}
      >
        Criar um Contato
      </Button>
    </div>
  );
};
