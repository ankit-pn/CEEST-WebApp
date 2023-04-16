import React, { useState } from "react";
import { systemOptimisation } from "./algorithms/system-optimisation";
function SystemOptimisation() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    async function handleClick() {
        // Call your function here
        const output = await systemOptimisation(localStorage.getItem("servers"));

        // Update state to show pop-up box
        setShowModal(true);
        setModalContent(JSON.stringify(output));
    }

    async function handleCloseModal() {
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
