import './App.css';
import ServerForm from './ServerForm';
import ServerList from './ServerList';
import VmForm from './VmForm';
import { useState, useEffect } from 'react';
import ClearServersButton from './ClearServersButton';
import VmDetails from './vmDetails';
import { vmDetails } from './algorithms/vm-details';
import TaskForm from './TaskForm';
import SystemOptimisation from './systemOptimisation';
function App() {
  const [servers, setServers] = useState(JSON.parse(localStorage.getItem('servers')) || []);
  const handleAddServer = (server) => {
    const updatedServers = [...servers, server];
    setServers(updatedServers);
    localStorage.setItem('servers', JSON.stringify(updatedServers));
  };
 

  return (
    <div>
      <ServerForm onAddServer={handleAddServer} />
      <VmForm servers={servers} />
      <TaskForm servers={servers}/>
      <SystemOptimisation/>
      <ServerList />
      
      <ClearServersButton />
    </div>
  );
}



export default App;
