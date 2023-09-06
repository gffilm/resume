import { Dialog, DialogContent, IconButton, Modal } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";

export const AppModal = ({ isOpen, onClose, children }) => {
  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return isOpen ? (
    <Dialog onClick={onClose} open={isOpen}>
      {children}
    </Dialog>
  ) : null;
};

export const ModalService = () => {
  const [modals, setModals] = useState([]);

  const openModal = (modal) => {
    setModals((prevModals) => [...prevModals, modal]);
  };

  const closeModal = () => {
    setModals((prevModals) => prevModals.slice(0, -1));
  };

  return (
    <>
      {modals.map((modal, index) => (
        <AppModal key={index} isOpen={true} onClose={closeModal}>
          {modal}
        </AppModal>
      ))}
    </>
  );
};
