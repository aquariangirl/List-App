import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  function handleNewTaskSubmit(event) {
    event.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask.trim()]);
      setNewTask('');
    }
  }

  return (
    <div>
      <section style={{ backgroundColor: 'white', width: '500px', height: '500px', border: '1px solid black' }}>
        <form onSubmit={handleNewTaskSubmit}>
          <input
            type="text"
            className='NewTask'
            id="NewTask"
            placeholder="Enter New Task"
            value={newTask}
            onChange={handleChange}
          />
          <button type="submit">Add task</button>
        </form>
      </section>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;