import { Button, Center, Modal, Table, Text} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { serverDetails } from './graph-ql-query/serverDetails';


function ServerList() {
  const [servers, setServers] = useState(JSON.parse(localStorage.getItem('servers') || '[]'));
  const [serverDetail, setServerDetail] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [showTask , setShowTask] = useState(false);
  const [task , setTask] = useState(null);

  const [vms, setVms] = useState(null)

  const handleRefresh = () => {
    setServers(JSON.parse(localStorage.getItem('servers') || '[]'));
    setServerDetail();
  }
  const getServerDetails = async (server) => {
    let data = await serverDetails(server);
    console.log(data);
    console.log(JSON.stringify(data), 'server list');


    setServerDetail(data, 'data');
    console.log(data.data.vms, 'jbs')



    const temp = await data?.data?.vms?.map((ele) => {
      return (
        <tr key={ele.vmName}>
          <td>{ele.vmName}</td>
          <td>{ele.vm_id}</td>
          <td>{ele.vmMips}</td>
          <td><Button onClick={()=>{setTask(ele.task);setShowTask(!showTask)}}>Show Tasks</Button></td>
        </tr>)
    })

    setVms(temp)

    open()
  }

  console.log(servers)
  const rows = servers?.map((element) => (
    <tr key={element}>
      <td>{element}</td>
      <td><Button onClick={() => getServerDetails(element)}>Show Details</Button></td>
    </tr>
  ));

  console.log(vms, 'vmmmm')
  const customTitle = (
      <h2 align="center">Server Details</h2>
  );
  return (

    <div>
      <Center><Text weight={800} size='xl'>Servers</Text></Center>
      <Button m='md' size='sm' onClick={handleRefresh}>Refresh List</Button>
      <Table p='sm' m='md'>
        <thead>
          <tr>
            <th>Server Name</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Modal opened={opened} onClose={close} title={customTitle} centered>
      
        <p><strong>Server ID:</strong> {serverDetail?.data.server_details?.server_id}</p>
        <p><strong>Server Name:</strong> {serverDetail?.data.server_details?.server_name}</p>
        <p><strong>Total MIPS:</strong> {serverDetail?.data.server_details?.total_mips}</p>
        <p><strong>Unit Power Cost:</strong> {serverDetail?.data.server_details?.unit_power_cost}</p>
        <h3>VM That this server host</h3>
        <Text>List of VM's under this server</Text>


        <Table>
          <thead>
            <tr>
              <th>VM Name</th>
              <th>VM ID</th>
              <th>VM MIPS</th>
              <th>Tasks</th>
            </tr>
          </thead>
          <tbody>{vms}</tbody>
        </Table>
      </Modal>

      <Modal opened={showTask} onClose={()=>setShowTask(false)} withCloseButton={true}>
      <ol> {task?.map((ele) => (<div key={ele.taskName} ><Text weight={700}> Task : { ele.taskName}</Text>
        
        <ul>
          <li>
            Comm cost : {ele.communicationCost} 
          </li>
          <li>
            task length : {ele.taskLength}
          </li>
          <li>
            task deadline : {ele.taskDeadline}
          </li>
          </ul>
          </div>
        ))
        }</ol>
      </Modal>


    </div>
  );
}

export default ServerList;