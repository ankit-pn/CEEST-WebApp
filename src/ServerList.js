import { Button, Center, Modal, Table, Text,Title } from '@mantine/core';
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






    // console.log(serverDetail.data.server_details.vms);
  }

  console.log(servers)
  const rows = servers?.map((element) => (
    <tr key={element}>
      <td>{element}</td>
      <td><Button onClick={() => getServerDetails(element)}>Show Details</Button></td>
      {/* <td>{element.name}</td>
          <td>{element.symbol}</td>
          <td>{element.mass}</td> */}
    </tr>
  ));

  console.log(vms, 'vmmmm')
  const customTitle = (
    // <div style={{ textAlign: 'center' }}>
      <h2 align="center">Server Details</h2>
    // </div>
  );
  return (

    <div>
      <Center><Text weight={800} size='xl'>Servers</Text></Center>
      <Button m='md' size='sm' onClick={handleRefresh}>Refresh List</Button>
      {/* <ul>
                {servers.map((server, index) => (
                    <li key={index}>{server}
                        <button onClick={() => getServerDetails(server)}>Server Details</button></li>
                ))}
                {serverDetail && (
                    <div>
                        <h2>Server Details</h2>
                        <p><strong>Server ID:</strong> {serverDetail.data.server_details.server_id}</p>
                        <p><strong>Server Name:</strong> {serverDetail.data.server_details.server_name}</p>
                        <p><strong>Total MIPS:</strong> {serverDetail.data.server_details.total_mips}</p>
                        <p><strong>Unit Power Cost:</strong> {serverDetail.data.server_details.unit_power_cost}</p>
                        <h3>VM That this server host</h3>
                        <ul>{serverDetail.data.vms.map(
                            (vm, index) => (

                                <div key={index}>
                                    <h3>VM Name: {vm.vmName}</h3>
                                    <p>VM ID: {vm.vm_id}</p>
                                    <p>VM MIPS: {vm.vmMips}</p>
                                    <ul>
                                        {vm.task.map((task, index) => (
                                            <li key={index}>
                                                <p>Task Name: {task.taskName}</p>
                                                <p>Task ID: {task.task_id}</p>
                                                <p>Task Length: {task.taskLength}</p>
                                                <p>Communication Cost: {task.communicationCost}</p>
                                                <p>Task Deadline: {task.taskDeadline}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )
                        }</ul>
                    </div>)}
            </ul> */}

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
      <ol> {task?.map((ele) => (<div key={ele.taskName}>Task : { ele.taskName}
        
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