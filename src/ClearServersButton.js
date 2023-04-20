import { Button } from '@mantine/core';
import React from 'react';

function ClearServersButton() {
  const handleClick = () => {
    localStorage.removeItem('servers'); // Remove the 'servers' key from the local storage
  }

  return (
    <div style={{ paddingTop : '24px'}}>
      <Button compact m='md' onClick={handleClick}>Clear Server List</Button>
    </div>
  );
}

export default ClearServersButton;
