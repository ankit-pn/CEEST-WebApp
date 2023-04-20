import { Button } from '@mantine/core';
import { useState } from 'react';
import { addTask } from './graph-ql-mutation/addTask';

function TaskForm({ servers }) {
  const [taskName, setTaskName] = useState('');
  const [taskLength, setTaskLength] = useState('');
  const [communicationCost, setCommunicationCost] = useState('');
  const [taskDeadline,setTaskDeadline] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const task = { taskName, taskLength, taskDeadline,communicationCost };
    try {
      console.log("here " , localStorage.getItem("servers"));
      const res  = await addTask(task, JSON.parse(localStorage.getItem("servers")));
      console.log(res);
      console.log("here " , localStorage.getItem("servers"));
      setTaskName('');
      setTaskLength('');
      setCommunicationCost('');
      setTaskDeadline('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <h3> Schedule new Task to most Optimal VM </h3>
    <form onSubmit={handleSubmit}>
      <label style={{display : 'block'}}>
        Task Name:
        <input style={{margin : '12px 8px'}} type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </label>
      <label>
        Task Length:
        <input style={{margin : '12px 8px'}} type="text" value={taskLength} onChange={(e) => setTaskLength(e.target.value)} />
      </label>
      <label >
        <span >
        Communication Cost:
        </span>
        <input style={{margin : '12px 8px'}} type="text" value={communicationCost} onChange={(e) => setCommunicationCost(e.target.value)} />
      </label>
      <label>
        Task Deadline:
        <input style={{margin : '12px 8px'}} type="text" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} />
      </label>
      <Button compact mx='auto' sx={{display : 'block'}} type="submit">Add Your Task</Button>
    </form>
    </>
  );
}

export default TaskForm;