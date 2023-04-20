import './App.css';
import ServerForm from './ServerForm';
import ServerList from './ServerList';
import VmForm from './VmForm';
import { useState, useEffect } from 'react';
import ClearServersButton from './ClearServersButton';
import VmDetails from './vmDetails';
import { vmDetails } from './algorithms/vm-details';
import TaskForm from './TaskForm';
import { Center } from '@mantine/core';
// import SystemOptimisation from './systemOptimisation';
function App() {
  const [servers, setServers] = useState(JSON.parse(localStorage.getItem('servers')) || []);
  const handleAddServer = (server) => {
    const updatedServers = [...servers, server];
    setServers(updatedServers);
    localStorage.setItem('servers', JSON.stringify(updatedServers));
  };
 

  return (
    <>
    <div style={{ textAlign: 'center' }}>
      <h3>CEEST - Cost Based Energy Efficient Scheduling And Cloud Computing</h3>
    </div>
    <div>
      <Center m='md' style={{
        display : 'flex',
        flexDirection : 'row',
        
      }}>
        <ServerForm onAddServer={handleAddServer} />
        <div style={{width : '20px'}}></div>
        <ClearServersButton />
      </Center>
      <div style={{
        display : 'flex',
        width : '100vw'
      }}>

        <div style={{
          width : '70%',
          // backgroundColor : 'red',
          display : 'inline-block'
        }}>
          <ServerList />
        </div>
        <div style={{
            backgroundColor : '#ddd',
            width : '4px',
            marginBottom : '8px'
          }}></div>
        <div style={{
          width : '30%',
          // backgroundColor : 'green',
          display : 'inline-block',
          padding : '12px'
        }}>
          <VmForm servers={servers} />
          <div style={{
            backgroundColor : 'black',
            height : '4px',
            marginBottom : '8px'
          }}></div>
          <TaskForm servers={servers}/>
        </div>

      </div>
      <div></div>
      
      {/* <SystemOptimisation/> */}
     
      
      
    </div>
    </>
  );
}



export default App;
