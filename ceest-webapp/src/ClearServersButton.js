import React from 'react';

function ClearServersButton() {
  const handleClick = () => {
    localStorage.removeItem('servers'); // Remove the 'servers' key from the local storage
  }

  return (
    <button onClick={handleClick}>Clear Server List</button>
  );
}

export default ClearServersButton;
