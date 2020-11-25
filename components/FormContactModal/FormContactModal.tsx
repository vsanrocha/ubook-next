import { Modal } from "components/Modal/Modal";
import { Button } from "components/Button/Button";
import { Input } from "components/Input/Input";
import { FC, useState, useEffect, useContext, FormEvent } from "react";
import styles from "./FormContactModal.module.scss";
import { store } from "contexts/Contacts";

type contactData = {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
};

type FormContactModalPorps = {
  title: string;
  openModal: boolean;
  contactData?: contactData;
  action: "add" | "edit";
  onClose: () => void;
};

export const FormContactModal: FC<FormContactModalPorps> = ({
  title,
  openModal,
  contactData,
  action,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [form, setForm] = useState<contactData>({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });
  const { state, dispatch } = useContext(store);

  useEffect(() => {
    if (contactData) {
      setForm(contactData);
    }
  }, []);

  useEffect(() => {
    setShowModal(openModal);
  }, [openModal]);

  useEffect(() => {
    const { name, email, phone } = form;
    setIsDirty(!!name || !!email || !!phone);
  }, [form]);

  const addContact = () => {
    const contactId = state.contacts.length === 0 ? 1 : getContactLastId() + 1;
    let contact = { ...form };
    contact["id"] = contactId;

    dispatch({ type: action, payload: { contact } });
    dispatch({ type: "highlight", payload: contactId });

    setTimeout(() => {
      dispatch({ type: "highlight", payload: undefined });
    }, 10000);
  };

  const editContact = () => {
    dispatch({
      type: action,
      payload: { contact: form },
    });
  };

  const getContactLastId = () => {
    return state.contacts.reduce(
      (max, b) => Math.max(max, b.id),
      state.contacts[0].id
    );
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
    action === "add" ? addContact() : editContact();
  };

  const handlePhoneChange = (value) => {
    value = value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d)(\d{4})$/, "$1-$2");

    setForm({ ...form, phone: value });
  };

  return (
    <Modal
      showModal={showModal}
      title={title}
      onClose={onClose}
      footer={
        <div className="d-flex justify-content-end">
          <Button color="primaryText" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" form="contact-form" disabled={!isDirty}>
            Salvar
          </Button>
        </div>
      }
    >
      <form id="contact-form" onSubmit={(e) => onSubmit(e)}>
        <Input
          label="Nome"
          id="name"
          name="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="E-mail"
          id="email"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className={styles.phoneInput}>
          <Input
            label="Telefone"
            id="phone"
            name="phone"
            maxLength={15}
            value={form.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};
