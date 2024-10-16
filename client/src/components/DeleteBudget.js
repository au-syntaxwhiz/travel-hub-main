import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteBudget } from "../api/budget";
import Modal from "react-modal";

const DeleteBudget = ({budgetId }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log("Plan ID from delete plan ", budgetId);

  const deleteThisBudget = async (budgetId) => {
    try {
      closeModal();
      window.location.reload();
      await deleteBudget(budgetId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (budgetId) => {
      await deleteThisBudget(budgetId);
  };

  return (
    <div>
      <FontAwesomeIcon
      icon={faTrashCan}
      type="button"
      className="btn"
      onClick={openModal} />
      
      <div 
      className="container w-50"
      style={{width: "20%"}}
      >
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit plan"
          style={customStyles}
        >
          <div className="col-m-12 text-center">
            <div className="col-m-12 m-4">
              <h1>Are you sure you want to delete this budget?</h1>
            </div>
            <div className="col-m-6 m-3">
              <button className="btn btn-danger" onClick={() => handleDelete(budgetId)}>
                Delete this Budget
              </button>
            </div>
            <div className="col-m-6 m-3">
              <button className="btn btn-primary" onClick={closeModal}>
                close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DeleteBudget;
