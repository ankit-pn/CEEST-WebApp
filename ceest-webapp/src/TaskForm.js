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
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
      </label>
      <label>
        Task Length:
        <input type="text" value={taskLength} onChange={(e) => setTaskLength(e.target.value)} />
      </label>
      <label>
        Communication Cost:
        <input type="text" value={communicationCost} onChange={(e) => setCommunicationCost(e.target.value)} />
      </label>
      <label>
        Task Deadline:
        <input type="text" value={taskDeadline} onChange={(e) => setTaskDeadline(e.target.value)} />
      </label>
      <button type="submit">Add Your Task</button>
    </form>
  );
}

export default TaskForm;