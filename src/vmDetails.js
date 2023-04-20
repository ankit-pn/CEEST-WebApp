import React from 'react';

const VmDetails = ({ vmData }) => {
  return (
    <div>
      {vmData.map((vm) => (
        <div key={vm.vm_id}>
          <h3>Virtual Machine Details:</h3>
          <p><strong>Virtual Machine Name:</strong> {vm.vmName}</p>
          <p><strong>Virtual Machine MIPS:</strong> {vm.vmMips}</p>
          <h3>Tasks:</h3>
          {vm.task.length > 0 ? (
            <ul>
              {vm.task.map((task) => (
                <li key={task.task_id}>
                  <p><strong>Task Name:</strong> {task.taskName}</p>
                  <p><strong>Task Deadline:</strong> {task.taskDeadline}</p>
                  <p><strong>Task Length:</strong> {task.taskLength}</p>
                  <p><strong>Communication Cost:</strong> {task.communicationCost}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks found for this Virtual Machine.</p>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default VmDetails;
