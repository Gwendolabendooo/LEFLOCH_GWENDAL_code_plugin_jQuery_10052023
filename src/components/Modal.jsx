import React, { useState } from 'react';

const Modal = ({ title, description, onClose, modalBackground, containerBackground }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const modalStyles = {
    backgroundColor: modalBackground || 'rgba(0, 0, 0, 0.5)',
  };

  const containerStyles = {
    backgroundColor: containerBackground || '#fff',
  };

  const buttonStyles = {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: 10
  };

  return (
    <>
      {isOpen && (
        <div className="modal-component" style={{position: 'fixed', left: 0, top:0, width: '100%', height: '100%', ...modalStyles, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-content" style={{...containerStyles, padding: '2rem', borderRadius: '.5rem'}}>
            <h2 style={{textAlign: 'center'}}>{title}</h2>
            <p>{description}</p>
            <button style={buttonStyles} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;