import { FC, useState, useContext, useEffect } from "react";
import { Icon } from "components/Icon/Icon";
import { FormContactModal } from "components/FormContactModal/FormContactModal";
import { Modal } from "components/Modal/Modal";
import { Button } from "components/Button/Button";
import { store } from "contexts/Contacts";
import styles from "./Table.module.scss";

type TableProps = {
  headers: string[];
  items: any;
  wrapperClass: string;
};

export const Table: FC<TableProps> = ({ headers, items, wrapperClass }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactData, setContactData] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });

  const { state, dispatch } = useContext(store);

  const badgeColor = (letter: string) => {
    const colors = {
      a: "#fa8d68",
      b: "#90d26c",
      c: "#68a0fa",
      d: "#fab668",
      e: "#8368fa",
      f: "#fa68b5",
      g: "#5fe2c4",
      h: "#f55a5a",
      i: "#120078",
      j: "#9d0191",
      k: "#fd3a69",
      l: "#3fc5f0",
      m: "#05dfd7",
      n: "#b31e6f",
      o: "#6decb9",
      p: "#51eaea",
      q: "#92817a",
      r: "#ff9d76",
      s: "#fecd1a",
      t: "#8db596",
      u: "#f55a5a",
      v: "#3b064d",
      w: "#ffd369",
      x: "#43c0ac",
      y: "#fa0559",
      z: "#a93199",
    };
    return colors[letter.toLowerCase()];
  };

  const handleDelete = () => {
    dispatch({ type: "delete", payload: { id: contactData.id } });
    setShowDeleteModal(false);
  }; 

  return (
    <div className={wrapperClass}>
      {showEditModal && (
        <FormContactModal
          title="Editar contato"
          openModal={showEditModal}
          contactData={contactData}
          action="edit"
          onClose={() => setShowEditModal(false)}
        />
      )}
      <Modal
        showModal={showDeleteModal}
        title="Excluir contato"
        onClose={() => setShowDeleteModal(false)}
        footer={
          <div className="d-flex justify-content-end">
            <Button color="primaryText">Cancelar</Button>
            <Button onClick={handleDelete}>Excluir</Button>
          </div>
        }
      >
        <p className="mb-5">Deseja realmente excluir o contato?</p>
      </Modal>
      <table className={styles.table}>
        <colgroup>
          <col style={{ width: "1%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th className={styles.th} align="left" key={index}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              className={`${styles.tr} ${
                state.highlightContact === item.id && styles.highlight
              }`}
              key={index}
            >
              <td className={styles.td}>
                <div
                  className={styles.badge}
                  style={{ background: badgeColor(item.name.charAt(0)) }}
                >
                  <span>{item.name.charAt(0).toUpperCase()}</span>
                </div>
              </td>
              <td className={styles.td}>{item.name}</td>
              <td className={styles.td}>{item.email}</td>
              <td className={styles.td}>{item.phone}</td>
              <td className={styles.td} align="right">
                <span
                  className={styles.icon}
                  onClick={() => {
                    setShowEditModal(true);
                    setContactData(item);
                  }}
                >
                  <Icon name="edit" />
                </span>
                <span
                  className={`${styles.icon} ml-4 mr-3`}
                  onClick={() => {
                    setShowDeleteModal(true);
                    setContactData(item);
                  }}
                >
                  <Icon name="delete" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
