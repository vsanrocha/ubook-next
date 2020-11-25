import { useContext, useEffect, useState } from "react";
import { BrandingImg } from "components/BrandingImg/BrandingImg";
import { SearchInput } from "components/SearchInput/SearchInput";
import { Button } from "components/Button/Button";
import { store } from "contexts/Contacts";
import { FormContactModal } from "components/FormContactModal/FormContactModal";

export const HeaderContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [hasContacts, setHasContacts] = useState(false);
  const { state } = useContext(store);

  useEffect(() => {
    setHasContacts(state.contacts.length > 0);
  }, [state.contacts]);

  return (
    <div className="d-flex flex-row">
      {showModal && (
        <FormContactModal
          key="teste"
          title="Criar novo contato"
          openModal={showModal}
          onClose={() => setShowModal(false)}
          action="add"
        />
      )}
      <BrandingImg className={`${hasContacts ? "col-md-2" : "col-md-4"}`} />
      {hasContacts && (
        <Button
          wrapperClass="col-md-2 d-flex justify-content-end"
          icon="plus"
          color="secondary"
          onClick={() => setShowModal(true)}
        >
          Criar Contato
        </Button>
      )}
      <SearchInput wrapperClass="col-md-8" placeholder="Buscar..." />
    </div>
  );
};
