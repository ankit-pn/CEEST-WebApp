import React, { useState } from "react";
import { systemOptimisation } from "./algorithms/system-optimisation";
function SystemOptimisation() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  function handleClick() {
    // Call your function here
    const output = { msg: "some text" };

    // Update state to show pop-up box
    setShowModal(true);
    setModalContent(JSON.stringify(output));
  }

  function handleCloseModal() {
    // Hide the pop-up box
    setShowModal(false);
    setModalContent(null);
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalContent}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SystemOptimisation;
