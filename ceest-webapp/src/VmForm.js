import { useState } from 'react';
import { addVm } from './graph-ql-mutation/addVm';

function VmForm({ servers }) {
  const [vmName, setVmName] = useState('');
  const [vmDetails, setVmDetails] = useState('');
  const [vmMips, setVmMips] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const vm = { vmName, vmDetails, vmMips };
    try {
      console.log("here " , localStorage.getItem("servers"));
      const res  = await addVm(vm, JSON.parse(localStorage.getItem("servers")));
      console.log(res);
      console.log("here " , localStorage.getItem("servers"));
      setVmName('');
      setVmDetails('');
      setVmMips('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Virtual Machine Name:
        <input type="text" value={vmName} onChange={(e) => setVmName(e.target.value)} />
      </label>
      <label>
        Virtual Machine Details:
        <input type="text" value={vmDetails} onChange={(e) => setVmDetails(e.target.value)} />
      </label>
      <label>
        Virtual Machine MIPS:
        <input type="text" value={vmMips} onChange={(e) => setVmMips(e.target.value)} />
      </label>
      <button type="submit">Add Virtual Machine</button>
    </form>
  );
}

export default VmForm;