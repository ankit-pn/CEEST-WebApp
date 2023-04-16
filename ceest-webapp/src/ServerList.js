import { useState } from 'react';
import { serverDetails } from './graph-ql-query/serverDetails';


function ServerList() {
    const [servers, setServers] = useState(JSON.parse(localStorage.getItem('servers') || '[]'));
    const [serverDetail, setServerDetail] = useState(null);
    const handleRefresh = () => {
        setServers(JSON.parse(localStorage.getItem('servers') || '[]'));
        setServerDetail();
    }
    const getServerDetails = async (server) => {
        let data = await serverDetails(server);
        console.log(data);
        console.log(JSON.stringify(data));
        setServerDetail(data);
        // console.log(serverDetail.data.server_details.vms);
    }
    return (
        <div>
            <button onClick={handleRefresh}>Refresh List</button>
            <ul>
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
            </ul>


        </div>
    );
}

export default ServerList;