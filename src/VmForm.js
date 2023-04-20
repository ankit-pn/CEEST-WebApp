import { Button, Notification,Input } from '@mantine/core';
import { useState, useEffect } from 'react';
import { addVm } from './graph-ql-mutation/addVm';

function VmForm({ servers }) {
  const [vmName, setVmName] = useState('');
  const [vmDetails, setVmDetails] = useState('');
  const [vmMips, setVmMips] = useState('');
  const [notification, setNotification] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    const vm = { vmName, vmDetails, vmMips };
    console.log("here ", localStorage.getItem("servers"));
    
    const res = await addVm(vm, JSON.parse(localStorage.getItem("servers")));
    console.log(res);
    setNotification('Virtual Machine Added');
    setVmName('');
    setVmDetails('');
    setVmMips('');

  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <>
    <h3 aling="center"> Add new VM to most Optimal Server</h3>
      <form onSubmit={handleSubmit} style={{ margin: '0px 0px 24px 0px' }}>
        <label>
          Virtual Machine Name:
          <input style={{ margin: '12px 8px' }} type="text" value={vmName} onChange={(e) => setVmName(e.target.value)} />
        </label>
        <label>
          Virtual Machine Details:
          <input style={{ margin: '12px 4px' }} type="text" value={vmDetails} onChange={(e) => setVmDetails(e.target.value)} />
        </label>
        <label>
          Virtual Machine MIPS:
          <input style={{ margin: '12px 12px' }} type="text" value={vmMips} onChange={(e) => setVmMips(e.target.value)} />
        </label>
        <Button mx='auto' compact sx={{ display: 'block', margin: 'auto' }} type="submit">Add Virtual Machine</Button>
      </form>

      {notification && (
        <Notification
          title="Server added Successfully"
          onClose={() => setNotification('')}
          autoClose
          autoCloseTimeout={10000}
          sx={{
            position : 'fixed',
            top : '40px',
            right : '40px'
          }}
        >
          {notification}
        </Notification>
      )}
    </>
  );
}

export default VmForm;